import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const to = process.argv[2];

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

const vars = readEnvFile(resolve(root, ".env"));
const apiKey = vars.RESEND_API_KEY?.trim();
const from = vars.EMAIL_FROM?.trim() ?? "MY TRIP <onboarding@resend.dev>";

if (!apiKey) {
  console.error("RESEND_API_KEY 없음");
  process.exit(1);
}
if (!to) {
  console.error("사용법: node scripts/test-resend-send.mjs <받을이메일>");
  process.exit(1);
}

console.log("발신:", from);
console.log("수신:", to);

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "[MY TRIP] 발송 테스트",
    html: "<p>Resend 테스트 메일입니다.</p>",
  }),
});

const text = await res.text();
console.log("status:", res.status);
console.log(text);
