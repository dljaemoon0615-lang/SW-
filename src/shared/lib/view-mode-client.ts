import { VIEW_MODE_COOKIE, type ViewMode } from "./view-mode";

const MAX_AGE_SEC = 60 * 60 * 24 * 30;

/** 클라이언트에서 보기 방식 쿠키·html 속성 동기화 */
export function persistViewMode(mode: ViewMode) {
  document.cookie = `${VIEW_MODE_COOKIE}=${mode};path=/;max-age=${MAX_AGE_SEC};samesite=lax`;
  document.documentElement.setAttribute("data-view-mode", mode);
}
