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
const apiKey = vars.RESEND_API_KEY?.trim();
const emailFrom = vars.EMAIL_FROM?.trim() ?? "MY TRIP <onboarding@resend.dev>";

console.log("\n=== Resend API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] RESEND_API_KEY 가 비어 있습니다.");
  console.error("       .env 외부 API 블록에 키를 넣은 뒤 다시 실행하세요.\n");
  process.exit(1);
}

console.log("[OK] RESEND_API_KEY 설정됨 (길이:", apiKey.length + ")");
console.log("[안내] 발신 주소:", emailFrom);

try {
  const res = await fetch("https://api.resend.com/domains", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const text = await res.text();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = null;
  }

  if (parsed?.name === "restricted_api_key") {
    console.log("\n[OK] Resend API 키 인식됨 (메일 발송 전용 키)");
  } else if (res.status === 401 || res.status === 403) {
    console.error("\n[오류] API 키가 유효하지 않습니다:", res.status);
    console.error(text.slice(0, 300));
    process.exit(1);
  } else if (!res.ok) {
    console.error("\n[오류] Resend API 호출 실패:", res.status);
    console.error(text.slice(0, 300));
    process.exit(1);
  } else {
    const domainCount = parsed?.data?.length ?? 0;
    console.log("\n[OK] Resend API 키 인증 성공");
    console.log("     등록된 도메인 수:", domainCount);
  }
  console.log("\n[안내] onboarding@resend.dev 는 Resend 가입 이메일로만 테스트 발송 가능합니다.");
  console.log("       다른 주소로내려면 Resend에서 도메인 인증 후 EMAIL_FROM 을 변경하세요.");
  console.log("\n비밀번호 찾기: /forgot-password → 서버 재시작 후 테스트\n");
} catch (err) {
  console.error("\n[오류] 네트워크 실패:", err.message);
  process.exit(1);
}
