/**
 * DeepL 한도 소진 대비 — 앱에서 쓰는 문자열을 미리 번역해 JSON으로 저장합니다.
 *
 * 사용법:
 *   node scripts/generate-preloaded-ko.mjs          # 사전·랜드마크 + 라쿠텐·Google 수집
 *   node scripts/generate-preloaded-ko.mjs --static # 사전·랜드마크만 (API 키 불필요)
 *
 * .env.local 의 DEEPL_API_KEY 가 있으면 미번역 문자열에 DeepL 시도 (456 시 사전 치환).
 * 결과: src/server/translate/preloaded-ko.generated.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/server/translate/preloaded-ko.generated.json");
const DICT_FILE = path.join(ROOT, "src/server/translate/ja-ko-dictionary.ts");
const LANDMARKS_FILE = path.join(
  ROOT,
  "src/features/attractions/data/famous-landmarks.ts",
);

const STATIC_ONLY = process.argv.includes("--static");
const REGIONS = ["TOKYO", "OSAKA_KYOTO", "FUKUOKA", "SAPPORO"];

const HANGUL_RE = /[가-힣]/;
const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;
const LATIN_WORD_RE = /[A-Za-z]{3,}/;

function loadEnvFile(name) {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    const val = m[2].replace(/^["']|["']$/g, "").trim();
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

function needsTranslation(text) {
  const t = text.trim();
  if (!t) return false;
  if (HANGUL_RE.test(t) && !JAPANESE_RE.test(t) && !LATIN_WORD_RE.test(t)) return false;
  if (JAPANESE_RE.test(t)) return true;
  if (LATIN_WORD_RE.test(t)) return true;
  return false;
}

function parseDictionaryFromTs(content) {
  const map = {};
  const re = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(content))) {
    map[m[1].replace(/\\"/g, '"')] = m[2].replace(/\\"/g, '"');
  }
  return map;
}

function parseLandmarksFromTs(content) {
  const map = {};
  const blockRe =
    /nameKo:\s*"([^"]+)"[\s\S]*?nameJa:\s*"([^"]+)"[\s\S]*?fallbackDescription:\s*"([^"]+)"/g;
  let m;
  while ((m = blockRe.exec(content))) {
    map[m[2]] = m[1];
    map[m[1]] = m[1];
    map[m[3]] = m[3];
  }
  return map;
}

function normalizeFullWidth(text) {
  return text
    .replace(/[\uFF01-\uFF5E]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, " ")
    .replace(/[　]+/g, " ");
}

function translateJa(text, dict) {
  let out = normalizeFullWidth(text.trim()).replace(/\s+/g, " ");
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (out.includes(k)) out = out.split(k).join(dict[k]);
  }
  return out.replace(/^(ザ・|the\s+)/i, "더 ");
}

function isPredominantlyKorean(text) {
  const hangul = (text.match(HANGUL_RE) ?? []).length;
  const japanese = (text.match(JAPANESE_RE) ?? []).length;
  const latin = (text.match(/[A-Za-z]/g) ?? []).length;
  return hangul >= 12 && hangul > japanese * 2 && hangul > latin;
}

/** generated JSON에 저장할 가치가 있는 번역인지 */
function isWorthSaving(orig, ko) {
  if (!ko || ko === orig) return false;
  if (!HANGUL_RE.test(ko)) return false;
  if ((ko.match(/\?/g)?.length ?? 0) >= 5) return false;
  if (/미안해|QUERY LENGTH|MYMEMORY WARNING/i.test(ko)) return false;
  if (isPredominantlyKorean(orig) && !JAPANESE_RE.test(orig)) return false;
  return true;
}

async function callMyMemory(text) {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 480) return null;
  const langpair = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(trimmed) ? "ja|ko" : "en|ko";
  const params = new URLSearchParams({ q: trimmed, langpair });
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) params.set("de", email);
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    const out = data.responseData?.translatedText?.trim();
    if (!out || out === trimmed || /QUERY LENGTH LIMIT|MYMEMORY WARNING/i.test(out)) return null;
    return out;
  } catch {
    return null;
  }
}

async function callDeepLBatch(texts, apiKey) {
  const endpoint = apiKey.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
  const body = new URLSearchParams();
  for (const t of texts) body.append("text", t);
  body.set("target_lang", "KO");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    if (res.status === 456 || err.includes("Quota exceeded")) {
      console.warn("[generate] DeepL quota exceeded — dictionary fallback only");
      return { ok: false, quota: true };
    }
    console.warn("[generate] DeepL failed", res.status, err.slice(0, 120));
    return { ok: false, quota: false };
  }
  const data = await res.json();
  const out = data.translations?.map((t) => t.text) ?? [];
  return { ok: true, translations: out };
}

async function fetchRakutenStrings(region) {
  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!appId || !accessKey) return [];

  const spots = {
    TOKYO: [
      { lat: 35.6812, lng: 139.7671, radius: 3 },
      { lat: 35.6896, lng: 139.7006, radius: 3 },
    ],
    OSAKA_KYOTO: [
      { lat: 34.7025, lng: 135.4959, radius: 3 },
      { lat: 35.0116, lng: 135.7681, radius: 3 },
    ],
    FUKUOKA: [{ lat: 33.5902, lng: 130.4017, radius: 3 }],
    SAPPORO: [{ lat: 43.0686, lng: 141.3508, radius: 3 }],
  }[region];

  if (!spots) return [];

  const strings = new Set();
  const endpoint =
    "https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426";

  for (const spot of spots) {
    const params = new URLSearchParams({
      applicationId: appId,
      accessKey,
      format: "json",
      latitude: String(spot.lat),
      longitude: String(spot.lng),
      searchRadius: String(spot.radius),
      datumType: "1",
      hits: "30",
      responseType: "large",
    });
    try {
      const res = await fetch(`${endpoint}?${params}`);
      if (!res.ok) continue;
      const json = await res.json();
      for (const entry of json.hotels ?? []) {
        const info = entry.hotel?.find((h) => h.hotelBasicInfo)?.hotelBasicInfo;
        if (!info) continue;
        for (const s of [
          info.hotelName,
          info.address1,
          info.address2,
          info.hotelSpecial,
          info.access,
          info.nearestStation,
        ]) {
          if (s?.trim()) strings.add(s.trim());
        }
      }
    } catch {
      /* skip spot */
    }
  }
  return [...strings];
}

async function main() {
  const dictContent = fs.readFileSync(DICT_FILE, "utf8");
  const landmarkContent = fs.readFileSync(LANDMARKS_FILE, "utf8");
  const baseDict = {
    ...parseDictionaryFromTs(dictContent),
    ...parseLandmarksFromTs(landmarkContent),
  };

  let existing = {};
  if (fs.existsSync(OUT)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT, "utf8"));
      delete existing._comment;
    } catch {
      existing = {};
    }
  }

  const toTranslate = new Set();

  if (!STATIC_ONLY) {
    console.log("[generate] Collecting strings from Rakuten…");
    for (const region of REGIONS) {
      const rakuten = await fetchRakutenStrings(region);
      rakuten.forEach((s) => toTranslate.add(s));
      console.log(`  ${region}: ${rakuten.length} rakuten strings`);
    }

    const collectFile = path.join(ROOT, ".preloaded-collect.json");
    try {
      const { execSync } = await import("node:child_process");
      console.log("[generate] Collecting strings from Google Places (tsx)…");
      execSync("npx --yes tsx scripts/collect-preloaded-live.mts", {
        cwd: ROOT,
        stdio: "inherit",
        env: process.env,
      });
      if (fs.existsSync(collectFile)) {
        const collected = JSON.parse(fs.readFileSync(collectFile, "utf8"));
        for (const s of collected) toTranslate.add(s);
        console.log(`  google+live: ${collected.length} strings`);
        fs.unlinkSync(collectFile);
      }
    } catch (err) {
      console.warn("[generate] Live collect skipped:", err.message?.slice(0, 100));
    }
  }

  const pending = [...toTranslate].filter(
    (s) =>
      needsTranslation(s) &&
      !isPredominantlyKorean(s) &&
      !baseDict[s] &&
      !existing[s],
  );

  console.log(`[generate] ${pending.length} strings need translation`);

  const output = { ...existing };
  const apiKey = process.env.DEEPL_API_KEY?.trim();
  let quotaHit = false;

  const CHUNK = 40;
  let saved = 0;
  for (let i = 0; i < pending.length; i += CHUNK) {
    const chunk = pending.slice(i, i + CHUNK);
    let translated = null;

    if (apiKey && !process.env.DEEPL_SKIP && !quotaHit) {
      const result = await callDeepLBatch(chunk, apiKey);
      if (result.quota) quotaHit = true;
      if (result.ok) translated = result.translations;
    }

    for (let idx = 0; idx < chunk.length; idx++) {
      const orig = chunk[idx];
      let ko = translated?.[idx] ?? null;
      if (!ko) ko = await callMyMemory(orig);
      if (!ko) ko = translateJa(orig, baseDict);
      if (isWorthSaving(orig, ko)) {
        output[orig] = ko;
        saved++;
      }
      if ((i + idx) % 10 === 9) process.stdout.write(`\r[generate] ${i + idx + 1}/${pending.length}…`);
    }
  }
  if (pending.length) console.log(`\n[generate] saved ${saved} Korean entries`);

  // 사전·랜드마크는 generated에 중복 저장하지 않음 (런타임 merge)
  for (const k of Object.keys(baseDict)) {
    delete output[k];
  }

  const sorted = Object.fromEntries(
    Object.entries(output).sort(([a], [b]) => a.localeCompare(b, "ja")),
  );

  fs.writeFileSync(OUT, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  console.log(
    `[generate] Wrote ${Object.keys(sorted).length} entries → ${path.relative(ROOT, OUT)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
