export {
  translateToKo,
  translateToKoBatch,
  translateJaToKo,
  translateJaToKoBatch,
  needsTranslation,
  needsJaTranslation,
  isDeepLConfigured,
  isDeepLQuotaExceeded,
} from "./deepl-client";
export { buildKoTranslationMap, applyFromMap } from "./ko-map";
export { lookupPreloadedKo, preloadedKoEntryCount } from "./preloaded-ko";
export { translateJa, isMostlyJapanese } from "./ja-ko-utils";
export { formatOpeningHours } from "./format-opening-hours";
export { JA_KO_DICTIONARY } from "./ja-ko-dictionary";
