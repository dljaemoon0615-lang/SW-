/**
 * 라쿠텐·Google에서 번역 대상 문자열을 수집합니다 (tsx 필요).
 * generate-preloaded-ko.mjs 가 자동 호출합니다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const REGIONS = ["TOKYO", "OSAKA_KYOTO", "FUKUOKA", "SAPPORO"] as const;

async function loadModule<T>(rel: string): Promise<T> {
  const abs = path.join(ROOT, rel);
  return import(pathToFileURL(abs).href) as Promise<T>;
}

async function collectRakuten(): Promise<string[]> {
  const { searchRakutenStays } = await loadModule<{
    searchRakutenStays: (req: {
      region: string;
      checkIn: string;
      checkOut: string;
      guests: number;
    }) => Promise<unknown[] | null>;
  }>("src/server/rakuten/travel-client.ts");

  // 번역 전 원문 수집 — 라쿠텐 API 직접 호출은 generate 스크립트에서 처리
  // 여기서는 번역된 결과의 원문 필드가 없으므로 Google만 수집
  void searchRakutenStays;
  return [];
}

async function collectGoogle(): Promise<string[]> {
  const { searchGoogleAttractions } = await loadModule<{
    searchGoogleAttractions: (region: string) => Promise<
      Array<{
        name?: string;
        description?: string;
        address?: string;
        hours?: string;
        tips?: string;
        highlights?: string[];
        bestVisitTags?: string[];
        reviews?: Array<{ text?: string }>;
      }> | null
    >;
  }>("src/server/google-places/attractions.ts");

  const out = new Set<string>();
  for (const region of REGIONS) {
    const items = await searchGoogleAttractions(region);
    for (const item of items ?? []) {
      for (const s of [
        item.name,
        item.description,
        item.address,
        item.hours,
        item.tips,
        ...(item.highlights ?? []),
        ...(item.bestVisitTags ?? []),
        ...(item.reviews?.map((r) => r.text) ?? []),
      ]) {
        if (s?.trim()) out.add(s.trim());
      }
    }
  }
  return [...out];
}

async function main() {
  const outPath = path.join(ROOT, ".preloaded-collect.json");
  const rakuten = await collectRakuten();
  const google = await collectGoogle();
  const all = [...new Set([...rakuten, ...google])];
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`[collect] ${all.length} strings → .preloaded-collect.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
