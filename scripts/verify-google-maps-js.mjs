import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(import.meta.dirname, "..", ".env");

function readKey() {
  if (!existsSync(envPath)) return null;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (
      key === "GOOGLE_PLACES_API_KEY" ||
      key === "GOOGLE_MAPS_API_KEY" ||
      key === "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
    ) {
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      return val;
    }
  }
  return null;
}

const apiKey = readKey();
console.log("\n=== Google Maps JavaScript API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] API 키가 .env에 없습니다.");
  process.exit(1);
}

console.log("[OK] API 키 설정됨 (길이:", apiKey.length + ")");

const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
const res = await fetch(url);
const body = await res.text();

if (body.includes("ApiNotActivatedMapError")) {
  console.error("\n[실패] Maps JavaScript API가 활성화되지 않았습니다.");
  console.error("Google Cloud Console → API 및 서비스 → 라이브러리 → Maps JavaScript API → 사용 설정");
  process.exit(1);
}

if (body.includes("RefererNotAllowedMapError")) {
  console.error("\n[실패] API 키 HTTP 리퍼러 제한에 localhost가 없습니다.");
  console.error("키 제한에 http://localhost:3000/* 추가하세요.");
  process.exit(1);
}

if (body.includes("InvalidKeyMapError") || body.includes("The Google Maps JavaScript API could not load")) {
  console.error("\n[실패] API 키가 유효하지 않습니다.");
  console.error(body.slice(0, 300));
  process.exit(1);
}

if (!res.ok || !body.includes("google.maps")) {
  console.error("\n[실패] 예상치 못한 응답:", res.status);
  console.error(body.slice(0, 400));
  process.exit(1);
}

console.log("\n[완료] Maps JavaScript API 스크립트 로드 가능합니다.\n");
