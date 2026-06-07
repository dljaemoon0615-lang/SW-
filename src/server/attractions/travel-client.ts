/**
 * 일본 관광지 데이터 외부 API 어댑터.
 * - Overpass API (OpenStreetMap): 좌표 주변 관광 POI 메타데이터
 * - Wikipedia REST API: 한국어 우선 설명·대표 사진 (배치 호출로 최적화)
 *
 * 둘 다 무료·키 불필요. User-Agent 헤더만 식별용으로 보냅니다.
 *
 * 필터 정책(잡음 제거):
 *   1) `tourism=museum|theme_park|zoo|aquarium|gallery` 처럼 카테고리 자체가
 *      명확한 시설은 wiki 태그 없이도 통과.
 *   2) `tourism=attraction|viewpoint` 는 오용·잡음이 심해 OSM `wikipedia`
 *      또는 `wikidata` 태그가 있을 때만 통과.
 *   3) `historic=castle|monument|memorial|ruins|archaeological_site|tomb`
 *      처럼 일본 여행에서 핵심인 사적은 항상 포함.
 *   4) 신사·사찰(`amenity=place_of_worship`), 공원·정원(`leisure=park|garden`)
 *      은 위키 문서/위키데이터가 연결된 유명 장소만 포함.
 *   5) 거리·기념탑·공공 예술품(`tourism=artwork`)은 잡음이 압도적이라 완전 제외.
 *   6) `way` 도 포함하되 `out center` 로 대표 좌표를 받습니다.
 *
 * 성능 정책:
 *   - Wikipedia 호출은 `titles=A|B|...` 배치(청크 20)로 묶어 N+1 호출을 회피합니다.
 *   - 동일 청크 호출이라도 동시 호출 수는 자연스럽게 3~6회 수준으로 제한됩니다.
 */

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";

const USER_AGENT =
  "MY-TRIP-Planner/0.1 (educational; +https://github.com/dljaemoon0615-lang/SW-)";

const TOURISM_ALWAYS = "museum|theme_park|zoo|aquarium|gallery";
const TOURISM_NEEDS_WIKI = "attraction|viewpoint";
const HISTORIC_ALWAYS =
  "castle|monument|memorial|ruins|archaeological_site|tomb|fort|city_gate";
const LEISURE_NEEDS_WIKI = "park|garden";

export type OverpassPlace = {
  id: string;
  name: string;
  nameKo?: string;
  nameJa?: string;
  lat: number;
  lng: number;
  category: string;
  /** OSM wikipedia 태그값. 형식: "lang:title" (예: "ja:東京タワー") */
  wikipediaTag?: string;
  /** OSM wikidata 태그값. 형식: "Q12345" */
  wikidataId?: string;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

type OverpassResponse = { elements?: OverpassElement[] };

export type WikiDetail = {
  description: string;
  imageUrl?: string;
  wikiUrl?: string;
  /** 결과로 채택된 위키 문서의 제목 */
  title: string;
  /** 결과로 채택된 위키 언어 */
  lang: "ko" | "ja" | "en";
};

function pickName(tags: Record<string, string> | undefined): {
  name: string;
  nameKo?: string;
  nameJa?: string;
} | null {
  if (!tags) return null;
  const nameKo = tags["name:ko"];
  const nameJa = tags["name:ja"];
  const nameEn = tags["name:en"];
  const display = nameKo || nameJa || nameEn || tags.name;
  if (!display) return null;
  return { name: display, nameKo, nameJa };
}

/**
 * OSM 태그 묶음에서 카드 노출용 카테고리 코드를 결정합니다.
 * 예: tourism=museum → "museum", historic=castle → "historic_castle",
 *     amenity=place_of_worship + religion=shinto → "shrine"
 */
function deriveCategory(tags: Record<string, string>): string {
  if (tags.tourism) return tags.tourism;
  if (tags.historic) return `historic_${tags.historic}`;
  if (tags.amenity === "place_of_worship") {
    const r = tags.religion;
    if (r === "shinto") return "shrine";
    if (r === "buddhist") return "temple";
    return "place_of_worship";
  }
  if (tags.leisure) return tags.leisure;
  return "attraction";
}

/**
 * 좌표 주변(radiusMeters 반경)의 관광지 POI를 가져옵니다.
 * Next 캐시: 1시간. (Overpass는 호출 빈도 제한이 있어 캐시 권장)
 */
export async function fetchAttractions(
  lat: number,
  lon: number,
  radiusMeters: number = 5000,
  limit: number = 80,
): Promise<OverpassPlace[]> {
  const r = radiusMeters;
  const around = `around:${r},${lat},${lon}`;

  const query = `[out:json][timeout:90];
(
  node["tourism"~"^(${TOURISM_ALWAYS})$"]["name"](${around});
  way["tourism"~"^(${TOURISM_ALWAYS})$"]["name"](${around});

  node["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  node["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikidata"](${around});
  way["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  way["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikidata"](${around});

  node["historic"~"^(${HISTORIC_ALWAYS})$"]["name"](${around});
  way["historic"~"^(${HISTORIC_ALWAYS})$"]["name"](${around});

  node["amenity"="place_of_worship"]["name"]["wikipedia"](${around});
  node["amenity"="place_of_worship"]["name"]["wikidata"](${around});
  way["amenity"="place_of_worship"]["name"]["wikipedia"](${around});
  way["amenity"="place_of_worship"]["name"]["wikidata"](${around});

  node["leisure"~"^(${LEISURE_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  way["leisure"~"^(${LEISURE_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
);
out center ${limit};`;

  try {
    const res = await fetch(OVERPASS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
      },
      body: `data=${encodeURIComponent(query)}`,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as OverpassResponse;
    const elements = json.elements ?? [];

    const seenId = new Set<string>();
    const seenName = new Set<string>();
    const out: OverpassPlace[] = [];
    for (const el of elements) {
      const named = pickName(el.tags);
      if (!named) continue;
      const elLat = el.lat ?? el.center?.lat;
      const elLng = el.lon ?? el.center?.lon;
      if (elLat === undefined || elLng === undefined) continue;

      const id = `osm-${el.type}-${el.id}`;
      if (seenId.has(id)) continue;
      if (seenName.has(named.name)) continue;
      seenId.add(id);
      seenName.add(named.name);

      const tags = el.tags ?? {};
      out.push({
        id,
        name: named.name,
        nameKo: named.nameKo,
        nameJa: named.nameJa,
        lat: elLat,
        lng: elLng,
        category: deriveCategory(tags),
        wikipediaTag: tags.wikipedia,
        wikidataId: tags.wikidata,
      });
    }
    return out;
  } catch {
    return [];
  }
}

/* --------------------------------------------------------------------------
 * Wikipedia 배치 조회
 * ----------------------------------------------------------------------- */

type WikiBundle = {
  title: string;
  extract?: string;
  thumbnail?: string;
  pageUrl?: string;
  langTitleKo?: string;
  langTitleJa?: string;
  langTitleEn?: string;
};

type WikiQueryPage = {
  pageid?: number;
  title?: string;
  missing?: boolean;
  extract?: string;
  fullurl?: string;
  thumbnail?: { source?: string };
  original?: { source?: string };
  langlinks?: Array<{ lang: string; title: string }>;
};

type WikiQueryResponse = {
  query?: {
    pages?: WikiQueryPage[];
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
  };
};

type WikiLang = "ko" | "ja" | "en";

/**
 * Wikipedia `action=query` 배치. 한 호출에 최대 ~20개 제목을 묶어
 * 인트로 발췌·대표 이미지·langlinks 를 동시 수신합니다.
 *
 * 응답에는 `normalized`(공백/대소문자 정규화)와 `redirects`(리다이렉트 추적)가
 * 따라오므로, 요청 시 사용한 원본 제목을 키로 결과를 매핑합니다.
 */
async function callWikiQueryBatch(
  lang: WikiLang,
  titles: string[],
): Promise<Map<string, WikiBundle>> {
  const result = new Map<string, WikiBundle>();
  if (titles.length === 0) return result;

  // 위키 user limit: exlimit=20. 그 이상은 extract 가 잘림.
  const CHUNK = 20;
  for (let i = 0; i < titles.length; i += CHUNK) {
    const chunk = titles.slice(i, i + CHUNK);
    const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
    url.search = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      prop: "pageimages|extracts|langlinks|info",
      exintro: "1",
      explaintext: "1",
      exchars: "500",
      exlimit: "20",
      pithumbsize: "640",
      piprop: "thumbnail|original",
      pilimit: "50",
      lllang: lang === "ko" ? "ja" : "ko",
      lllimit: "50",
      inprop: "url",
      redirects: "1",
      titles: chunk.join("|"),
      origin: "*",
    }).toString();

    try {
      const res = await fetch(url.toString(), {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        next: { revalidate: 86400 },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as WikiQueryResponse;
      const pages = data.query?.pages ?? [];
      const normalized = data.query?.normalized ?? [];
      const redirects = data.query?.redirects ?? [];

      // 요청 제목 → 최종 페이지 제목 추적 (normalized → redirects 체인)
      const requestedToFinal = new Map<string, string>();
      for (const t of chunk) requestedToFinal.set(t, t);
      for (const n of normalized) {
        for (const [requested, current] of requestedToFinal) {
          if (current === n.from) requestedToFinal.set(requested, n.to);
        }
      }
      for (const r of redirects) {
        for (const [requested, current] of requestedToFinal) {
          if (current === r.from) requestedToFinal.set(requested, r.to);
        }
      }

      const pageByTitle = new Map<string, WikiQueryPage>();
      for (const p of pages) {
        if (p.title) pageByTitle.set(p.title, p);
      }

      for (const requested of chunk) {
        const finalTitle = requestedToFinal.get(requested) ?? requested;
        const page = pageByTitle.get(finalTitle);
        if (!page || page.missing || !page.title) continue;
        const links = page.langlinks ?? [];
        result.set(requested, {
          title: page.title,
          extract: page.extract,
          thumbnail: page.original?.source ?? page.thumbnail?.source,
          pageUrl: page.fullurl,
          langTitleKo: links.find((l) => l.lang === "ko")?.title,
          langTitleJa: links.find((l) => l.lang === "ja")?.title,
          langTitleEn: links.find((l) => l.lang === "en")?.title,
        });
      }
    } catch {
      /* chunk 실패는 건너뜀 */
    }
  }
  return result;
}

/** OSM 데이터로부터 1차 위키 조회 키를 결정. */
function derivePrimaryWikiKey(p: OverpassPlace): { lang: WikiLang; title: string } | null {
  if (p.wikipediaTag) {
    const m = /^(ko|ja|en):(.+)$/.exec(p.wikipediaTag.trim());
    if (m) return { lang: m[1] as WikiLang, title: m[2].trim() };
  }
  if (p.nameJa) return { lang: "ja", title: p.nameJa };
  if (p.nameKo) return { lang: "ko", title: p.nameKo };
  // 일본 내 POI이므로 이름이 한자/가나일 가능성이 큼 → ja 위키부터 시도
  if (p.name) return { lang: "ja", title: p.name };
  return null;
}

/**
 * 여러 장소의 위키 상세를 배치로 가져옵니다.
 *
 * 흐름:
 *   1) 각 장소의 1차 위키 키(언어·제목) 결정
 *   2) 언어별로 묶어 1차 배치 조회 (병렬)
 *   3) ja/en 결과에서 한국어 langlinks 수집
 *   4) 수집된 한국어 제목을 한 번에 추가 배치 조회
 *   5) 한국어 위키가 있으면 한국어를 우선, 없으면 1차 결과 사용
 *
 * 반환: place.id → WikiDetail 매핑. 결과가 없는 장소는 키 부재.
 */
export async function fetchWikiDetailsBatch(
  places: OverpassPlace[],
): Promise<Map<string, WikiDetail>> {
  const result = new Map<string, WikiDetail>();

  const entries: Array<{ place: OverpassPlace; lang: WikiLang; title: string }> = [];
  for (const p of places) {
    const key = derivePrimaryWikiKey(p);
    if (!key) continue;
    entries.push({ place: p, lang: key.lang, title: key.title });
  }
  if (entries.length === 0) return result;

  const titlesByLang = new Map<WikiLang, Set<string>>();
  for (const e of entries) {
    const set = titlesByLang.get(e.lang) ?? new Set<string>();
    set.add(e.title);
    titlesByLang.set(e.lang, set);
  }

  const primaryResults = await Promise.all(
    Array.from(titlesByLang.entries()).map(async ([lang, titles]) => ({
      lang,
      map: await callWikiQueryBatch(lang, Array.from(titles)),
    })),
  );
  const primaryByLang = new Map<WikiLang, Map<string, WikiBundle>>();
  for (const { lang, map } of primaryResults) primaryByLang.set(lang, map);

  // ja/en 결과에서 한국어 langlinks 수집 → 한국어 위키 배치 추가 조회
  const koTitlesToFetch = new Set<string>();
  for (const lang of ["ja", "en"] as const) {
    const map = primaryByLang.get(lang);
    if (!map) continue;
    for (const bundle of map.values()) {
      if (bundle.langTitleKo) koTitlesToFetch.add(bundle.langTitleKo);
    }
  }
  const existingKo = primaryByLang.get("ko") ?? new Map<string, WikiBundle>();
  const newKoTitles = Array.from(koTitlesToFetch).filter((t) => !existingKo.has(t));
  const koLangMap =
    newKoTitles.length > 0
      ? await callWikiQueryBatch("ko", newKoTitles)
      : new Map<string, WikiBundle>();

  for (const { place, lang, title } of entries) {
    const primary = primaryByLang.get(lang)?.get(title);
    if (!primary || !primary.extract) continue;

    if (lang !== "ko" && primary.langTitleKo) {
      const koBundle = koLangMap.get(primary.langTitleKo) ?? existingKo.get(primary.langTitleKo);
      if (koBundle && koBundle.extract) {
        result.set(place.id, {
          title: koBundle.title,
          description: koBundle.extract,
          imageUrl: koBundle.thumbnail ?? primary.thumbnail,
          wikiUrl: koBundle.pageUrl,
          lang: "ko",
        });
        continue;
      }
    }

    result.set(place.id, {
      title: primary.title,
      description: primary.extract,
      imageUrl: primary.thumbnail,
      wikiUrl: primary.pageUrl,
      lang,
    });
  }

  return result;
}
