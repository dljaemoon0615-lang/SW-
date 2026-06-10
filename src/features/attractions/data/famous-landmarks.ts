import type { JapanRegionId } from "@/shared/lib/constants";
import type { OverpassPlace } from "@/server/attractions/travel-client";

/** 여행자가 기대하는 대표 명소 — Overpass 결과보다 항상 우선 노출 */
export type FamousLandmark = {
  id: string;
  region: JapanRegionId;
  nameKo: string;
  nameJa: string;
  lat: number;
  lng: number;
  category: string;
  wikipediaTag?: string;
  /** 위키 실패 시 카드용 짧은 설명 */
  fallbackDescription: string;
};

const LANDMARKS: FamousLandmark[] = [
  // —— 오사카·교토 ——
  {
    id: "curated-dotonbori",
    region: "OSAKA_KYOTO",
    nameKo: "도톤보리",
    nameJa: "道頓堀",
    lat: 34.6687,
    lng: 135.5013,
    category: "attraction",
    wikipediaTag: "ja:道頓堀",
    fallbackDescription: "글리코 간판과 먹거리 거리로 유명한 오사카 대표 번화가입니다.",
  },
  {
    id: "curated-usj",
    region: "OSAKA_KYOTO",
    nameKo: "유니버설 스튜디오 재팬",
    nameJa: "ユニバーサル・スタジオ・ジャパン",
    lat: 34.6654,
    lng: 135.4323,
    category: "theme_park",
    wikipediaTag: "ja:ユニバーサル・スタジオ・ジャパン",
    fallbackDescription: "해리포터·닌텐도 등 테마 존으로 유명한 대형 테마파크입니다.",
  },
  {
    id: "curated-osaka-castle",
    region: "OSAKA_KYOTO",
    nameKo: "오사카성",
    nameJa: "大阪城",
    lat: 34.6873,
    lng: 135.5262,
    category: "historic_castle",
    wikipediaTag: "ja:大阪城",
    fallbackDescription: "오사카의 상징적인 성곽과 공원으로, 전망대·박물관을 함께 둘러볼 수 있습니다.",
  },
  {
    id: "curated-shinsekai",
    region: "OSAKA_KYOTO",
    nameKo: "신세카이·츠utenkaku",
    nameJa: "通天閣",
    lat: 34.6525,
    lng: 135.5063,
    category: "viewpoint",
    wikipediaTag: "ja:通天閣",
    fallbackDescription: "레트로 거리와 타워 전망이 인기 있는 오사카 남부 명소입니다.",
  },
  {
    id: "curated-umeda-sky",
    region: "OSAKA_KYOTO",
    nameKo: "우메다 스카이 빌딩",
    nameJa: "梅田スカイビル",
    lat: 34.7055,
    lng: 135.4900,
    category: "viewpoint",
    wikipediaTag: "ja:梅田スカイビル",
    fallbackDescription: "공중 정원 전망대로 오사카 시내 야경을 보기 좋습니다.",
  },
  {
    id: "curated-kiyomizu",
    region: "OSAKA_KYOTO",
    nameKo: "기요미즈데라",
    nameJa: "清水寺",
    lat: 34.9949,
    lng: 135.7850,
    category: "temple",
    wikipediaTag: "ja:清水寺",
    fallbackDescription: "교토를 대표하는 목조 사찰로, 오래된 거리와 함께 방문합니다.",
  },
  {
    id: "curated-fushimi-inari",
    region: "OSAKA_KYOTO",
    nameKo: "후시미 이나리 신사",
    nameJa: "伏見稲荷大社",
    lat: 34.9671,
    lng: 135.7727,
    category: "shrine",
    wikipediaTag: "ja:伏見稲荷大社",
    fallbackDescription: "수천 기의 붉은 도리이가 이어지는 일본에서 가장 유명한 신사 중 하나입니다.",
  },
  {
    id: "curated-kinkakuji",
    region: "OSAKA_KYOTO",
    nameKo: "금각사",
    nameJa: "金閣寺",
    lat: 35.0394,
    lng: 135.7292,
    category: "temple",
    wikipediaTag: "ja:金閣寺",
    fallbackDescription: "금박으로 덮인 삼층 탑이 호수에 비치는 교토의 대표 사찰입니다.",
  },
  {
    id: "curated-arashiyama",
    region: "OSAKA_KYOTO",
    nameKo: "아라시야마",
    nameJa: "嵐山",
    lat: 35.0094,
    lng: 135.6772,
    category: "attraction",
    wikipediaTag: "ja:嵐山",
    fallbackDescription: "대나무 숲·도게츠교·토리이 터널로 유명한 교토 서쪽 관광지입니다.",
  },
  // —— 도쿄 ——
  {
    id: "curated-tokyo-skytree",
    region: "TOKYO",
    nameKo: "도쿄 스카이트리",
    nameJa: "東京スカイツリー",
    lat: 35.7101,
    lng: 139.8107,
    category: "viewpoint",
    wikipediaTag: "ja:東京スカイツリー",
    fallbackDescription: "도쿄의 랜드마크 타워로 전망대와 쇼핑·아쿠아리움을 즐길 수 있습니다.",
  },
  {
    id: "curated-tokyo-tower",
    region: "TOKYO",
    nameKo: "도쿄 타워",
    nameJa: "東京タワー",
    lat: 35.6586,
    lng: 139.7454,
    category: "viewpoint",
    wikipediaTag: "ja:東京タワー",
    fallbackDescription: "도쿄 시내를 한눈에 보는 클래식 전망 타워입니다.",
  },
  {
    id: "curated-sensoji",
    region: "TOKYO",
    nameKo: "센소지·아사쿠사",
    nameJa: "浅草寺",
    lat: 35.7148,
    lng: 139.7967,
    category: "temple",
    wikipediaTag: "ja:浅草寺",
    fallbackDescription: "나카미세 거리와 함께 도쿄에서 가장 유명한 전통 사찰입니다.",
  },
  {
    id: "curated-shibuya",
    region: "TOKYO",
    nameKo: "시부야 스크램블 교차로",
    nameJa: "渋谷スクランブル交差点",
    lat: 35.6595,
    lng: 139.7005,
    category: "attraction",
    wikipediaTag: "ja:渋谷スクランブル交差点",
    fallbackDescription: "세계적으로 유명한 교차로와 하치코 동상이 있는 도쿄의 상징입니다.",
  },
  {
    id: "curated-meiji",
    region: "TOKYO",
    nameKo: "메이지 신궁",
    nameJa: "明治神宮",
    lat: 35.6764,
    lng: 139.6993,
    category: "shrine",
    wikipediaTag: "ja:明治神宮",
    fallbackDescription: "도심 속 숲길과 거대한 도리이가 있는 도쿄 대표 신사입니다.",
  },
  {
    id: "curated-disneyland",
    region: "TOKYO",
    nameKo: "도쿄 디즈니랜드",
    nameJa: "東京ディズニーランド",
    lat: 35.6329,
    lng: 139.8804,
    category: "theme_park",
    wikipediaTag: "ja:東京ディズニーランド",
    fallbackDescription: "일본 최초의 디즈니 테마파크로 가족·커플 여행에 인기입니다.",
  },
  {
    id: "curated-teamlab",
    region: "TOKYO",
    nameKo: "teamLab Planets",
    nameJa: "チームラボ プラネッツ TOKYO DMM",
    lat: 35.6492,
    lng: 139.7896,
    category: "museum",
    wikipediaTag: "ja:チームラボ",
    fallbackDescription: "몰입형 디지털 아트 전시로 SNS에서 인기 있는 도쿄 명소입니다.",
  },
  // —— 후쿠오카 ——
  {
    id: "curated-canal-city",
    region: "FUKUOKA",
    nameKo: "캐널 시티 하카타",
    nameJa: "キャナルシティ博多",
    lat: 33.5892,
    lng: 130.4110,
    category: "attraction",
    wikipediaTag: "ja:キャナルシティ博多",
    fallbackDescription: "운하와 쇼핑·공연을 함께 즐기는 후쿠오카 대표 복합몰입니다.",
  },
  {
    id: "curated-dazaifu",
    region: "FUKUOKA",
    nameKo: "다자이후 텐만구",
    nameJa: "太宰府天満宮",
    lat: 33.5212,
    lng: 130.5349,
    category: "shrine",
    wikipediaTag: "ja:太宰府天満宮",
    fallbackDescription: "학업·시험 기원으로 유명한 규슈 최대급 신사입니다.",
  },
  {
    id: "curated-ohori",
    region: "FUKUOKA",
    nameKo: "오호리 공원",
    nameJa: "大濠公園",
    lat: 33.5860,
    lng: 130.3758,
    category: "park",
    wikipediaTag: "ja:大濠公園",
    fallbackDescription: "호수를 둘러싼 산책로와 후쿠오카 성 인근 휴식 명소입니다.",
  },
  {
    id: "curated-nakasu",
    region: "FUKUOKA",
    nameKo: "나카스·야타이",
    nameJa: "中洲",
    lat: 33.5934,
    lng: 130.4067,
    category: "attraction",
    wikipediaTag: "ja:中洲 (福岡市)",
    fallbackDescription: "포장마차(야타이) 거리로 유명한 후쿠오카의 먹거리 중심지입니다.",
  },
  // —— 삿포로 ——
  {
    id: "curated-sapporo-clock",
    region: "SAPPORO",
    nameKo: "삿포로 시계탑",
    nameJa: "札幌市時計台",
    lat: 43.0629,
    lng: 141.3544,
    category: "historic_monument",
    wikipediaTag: "ja:札幌市時計台",
    fallbackDescription: "삿포로 시내의 상징적인 목조 시계탑입니다.",
  },
  {
    id: "curated-odori",
    region: "SAPPORO",
    nameKo: "오도리 공원",
    nameJa: "大通公園",
    lat: 43.0603,
    lng: 141.3508,
    category: "park",
    wikipediaTag: "ja:大通公園",
    fallbackDescription: "눈 축제·맥주 축제가 열리는 삿포로 중심 공원입니다.",
  },
  {
    id: "curated-sapporo-beer",
    region: "SAPPORO",
    nameKo: "삿포로 맥주 박물관",
    nameJa: "サッポロビール博物館",
    lat: 43.0714,
    lng: 141.3689,
    category: "museum",
    wikipediaTag: "ja:サッポロビール博物館",
    fallbackDescription: "맥주 시음과 홋카이도 역사를 함께 즐길 수 있는 인기 스팟입니다.",
  },
  {
    id: "curated-susukino",
    region: "SAPPORO",
    nameKo: "스스키노",
    nameJa: "すすきの",
    lat: 43.0554,
    lng: 141.3530,
    category: "attraction",
    wikipediaTag: "ja:すすきの",
    fallbackDescription: "삿포로의 번화가로 식당·야경이 유명합니다.",
  },
];

export function getFamousLandmarksForRegion(region: JapanRegionId): FamousLandmark[] {
  return LANDMARKS.filter((l) => l.region === region);
}

export function landmarkToOverpassPlace(l: FamousLandmark): OverpassPlace {
  return {
    id: l.id,
    name: l.nameJa,
    nameKo: l.nameKo,
    nameJa: l.nameJa,
    lat: l.lat,
    lng: l.lng,
    category: l.category,
    wikipediaTag: l.wikipediaTag,
  };
}

const FALLBACK_BY_ID = new Map(LANDMARKS.map((l) => [l.id, l.fallbackDescription]));

export function getLandmarkFallbackDescription(id: string): string | undefined {
  return FALLBACK_BY_ID.get(id);
}

/** DeepL 없이 쓸 정적 번역 맵 (일본어명·설명 → 한국어) */
export function getLandmarkKoMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LANDMARKS) {
    map[l.nameJa] = l.nameKo;
    map[l.nameKo] = l.nameKo;
    map[l.fallbackDescription] = l.fallbackDescription;
    if (l.wikipediaTag) {
      const title = l.wikipediaTag.replace(/^ja:/, "");
      map[title] = l.nameKo;
    }
  }
  return map;
}
