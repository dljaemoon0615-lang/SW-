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

const apiKey = readEnvFile(envPath).DEEPL_API_KEY?.trim();
if (!apiKey) {
  console.error("DEEPL_API_KEY 없음");
  process.exit(1);
}

const isFree = apiKey.endsWith(":fx");
const base = isFree ? "https://api-free.deepl.com" : "https://api.deepl.com";

const usageRes = await fetch(`${base}/v2/usage`, {
  headers: { Authorization: `DeepL-Auth-Key ${apiKey}` },
});
const usageText = await usageRes.text();

console.log("\n=== DeepL 사용량 ===\n");
console.log("플랜:", isFree ? "무료 (월 50만자)" : "Pro");

if (!usageRes.ok) {
  console.error("사용량 조회 실패:", usageRes.status, usageText.slice(0, 300));
  process.exit(1);
}

const usage = JSON.parse(usageText);
const used = usage.character_count ?? 0;
const limit = usage.character_limit ?? 0;
const remaining = Math.max(0, limit - used);
const pct = limit > 0 ? ((used / limit) * 100).toFixed(1) : "?";

console.log("사용:", used.toLocaleString(), "자");
console.log("한도:", limit.toLocaleString(), "자");
console.log("잔여:", remaining.toLocaleString(), "자");
console.log("사용률:", pct + "%");

if (remaining <= 0) {
  console.log("\n[경고] 이번 달 할당량을 모두 사용했습니다.");
} else if (used / limit > 0.9) {
  console.log("\n[주의] 할당량 90% 이상 사용 중입니다.");
} else {
  console.log("\n[OK] 아직 사용 가능합니다.");
}
