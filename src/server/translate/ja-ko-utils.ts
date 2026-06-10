import { JA_KO_DICTIONARY } from "./ja-ko-dictionary";

const HOTEL_PREFIX_RE = /^(ザ・|the\s+)/i;

const SORTED_KEYS = Object.keys(JA_KO_DICTIONARY).sort((a, b) => b.length - a.length);

/** 풀와이드 영숫자를 일반 ASCII로 정규화 */
export function normalizeFullWidth(text: string): string {
  return text
    .replace(/[\uFF01-\uFF5E]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, " ")
    .replace(/[　]+/g, " ");
}

/** "치요다구마루노우치1-7-12" 처럼 붙은 텍스트를 보기 좋게 분리 */
export function spaceOutAddress(text: string): string {
  return text
    .replace(/([가-힣]+(?:구|동|군|읍|면|리|쵸|마치))([가-힣])/g, "$1 $2")
    .replace(/([가-힣])(\d)/g, "$1 $2")
    .replace(/(\d)([가-힣])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

/** 한자·가나 비율로 일본어가 많이 남았는지 확인 */
export function isMostlyJapanese(text: string): boolean {
  if (!text) return false;
  const japaneseChars = text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g);
  if (!japaneseChars) return false;
  return japaneseChars.length / text.length > 0.25;
}

/** 한 줄 텍스트의 일본어 핵심 단어를 한국어로 치환 */
export function translateJa(text: string | undefined | null): string {
  if (!text) return "";
  let out = normalizeFullWidth(text.trim()).replace(/\s+/g, " ");

  for (const k of SORTED_KEYS) {
    if (out.includes(k)) {
      out = out.split(k).join(JA_KO_DICTIONARY[k]);
    }
  }

  if (isMostlyJapanese(out)) {
    out = out.replace(HOTEL_PREFIX_RE, "더 ");
  }
  return out;
}
