import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

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

const vars = readEnvFile(envPath);
const apiKey = vars.DEEPL_API_KEY?.trim();

console.log("\n=== DeepL API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] DEEPL_API_KEY 가 비어 있습니다.");
  console.error("       .env 에 발급받은 키를 넣은 뒤 다시 실행하세요.\n");
  process.exit(1);
}

console.log("[OK] DEEPL_API_KEY 설정됨 (길이:", apiKey.length + ")");
console.log(
  "[안내] 플랜:",
  apiKey.endsWith(":fx") ? "무료 API (api-free.deepl.com)" : "Pro API (api.deepl.com)",
);

const endpoint = apiKey.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

const body = new URLSearchParams();
body.append("text", "東京タワー");
body.append("text", "Tokyo Skytree observation deck");
body.set("target_lang", "KO");

try {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("\n[오류] DeepL API 호출 실패:", res.status);
    console.error(text.slice(0, 500));
    console.error("\n403/456: 키 오류 또는 할당량 초과");
    console.error("403: Pro 키를 무료 URL에 쓰거나 그 반대인 경우도 확인\n");
    process.exit(1);
  }

  const data = JSON.parse(text);
  const lines = data.translations?.map((t) => t.text) ?? [];
  console.log("\n[OK] 번역 테스트 성공 (일본어·영어 자동 감지)");
  console.log("     JA 입력: 東京タワー →", lines[0] ?? "(없음)");
  console.log("     EN 입력: Tokyo Skytree... →", lines[1] ?? "(없음)");
  console.log("\n서버 재시작 후 숙박 검색에서 한국어 표시를 확인하세요.\n");
} catch (err) {
  console.error("\n[오류] 네트워크 또는 파싱 실패:", err.message);
  process.exit(1);
}
