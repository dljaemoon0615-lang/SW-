import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");
const BASE = "https://places.googleapis.com/v1";

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

async function placesRequest(path, { method = "GET", body, fieldMask }) {
  const apiKey = readEnvFile(envPath).GOOGLE_PLACES_API_KEY?.trim();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

const apiKey = readEnvFile(envPath).GOOGLE_PLACES_API_KEY?.trim();

console.log("\n=== Google Places API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] GOOGLE_PLACES_API_KEY 가 비어 있습니다.");
  process.exit(1);
}

console.log("[OK] GOOGLE_PLACES_API_KEY 설정됨 (길이:", apiKey.length + ")");

// 1) 맛집 nearby (도쿄역)
console.log("\n[1/3] 맛집 searchNearby (도쿄역)...");
const nearby = await placesRequest("/places:searchNearby", {
  method: "POST",
  fieldMask:
    "places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress",
  body: {
    includedTypes: ["restaurant"],
    maxResultCount: 5,
    locationRestriction: {
      circle: {
        center: { latitude: 35.6812, longitude: 139.7671 },
        radius: 3000,
      },
    },
    languageCode: "ko",
  },
});

if (!nearby.ok) {
  console.error("[실패]", nearby.status, JSON.stringify(nearby.json, null, 2));
  process.exit(1);
}

const restaurants = nearby.json?.places ?? [];
console.log("[OK] 맛집", restaurants.length, "건 수신");
for (const p of restaurants.slice(0, 3)) {
  console.log(
    "  -",
    p.displayName?.text,
    "| 평점",
    p.rating ?? "-",
    "| 리뷰",
    p.userRatingCount ?? 0,
  );
}

// 2) 관광지 text search (오사카성)
console.log("\n[2/3] 관광지 searchText (오사카성)...");
const textSearch = await placesRequest("/places:searchText", {
  method: "POST",
  fieldMask: "places.id,places.displayName,places.location,places.rating,places.userRatingCount",
  body: {
    textQuery: "오사카성",
    maxResultCount: 1,
    languageCode: "ko",
    locationBias: {
      circle: {
        center: { latitude: 34.6873, longitude: 135.5262 },
        radius: 2000,
      },
    },
  },
});

if (!textSearch.ok) {
  console.error("[실패]", textSearch.status, JSON.stringify(textSearch.json, null, 2));
  process.exit(1);
}

const attraction = textSearch.json?.places?.[0];
if (!attraction?.id) {
  console.error("[실패] 관광지 검색 결과 없음");
  process.exit(1);
}

console.log(
  "[OK]",
  attraction.displayName?.text,
  "| placeId:",
  attraction.id.slice(0, 20) + "...",
  "| 평점",
  attraction.rating ?? "-",
);

// 3) 상세 + 리뷰
console.log("\n[3/3] Place Details + 리뷰...");
const details = await placesRequest(`/places/${attraction.id}`, {
  fieldMask: "id,displayName,rating,userRatingCount,reviews",
});

if (!details.ok) {
  console.error("[실패]", details.status, JSON.stringify(details.json, null, 2));
  process.exit(1);
}

const reviews = details.json?.reviews ?? [];
console.log("[OK] 리뷰", reviews.length, "건");
for (const r of reviews.slice(0, 2)) {
  const snippet = (r.text?.text ?? "").slice(0, 60).replace(/\s+/g, " ");
  console.log(
    "  -",
    r.authorAttribution?.displayName ?? "익명",
    "|",
    r.rating,
    "점 |",
    snippet + (snippet.length >= 60 ? "…" : ""),
  );
}

console.log("\n[완료] Google Places API 정상 동작합니다.\n");
