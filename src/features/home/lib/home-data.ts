/** 관광 mock-data와 동일한 Unsplash 실사 ID */
const unsplash = (photoId: string, w = 800) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=80`;

const DESTINATION_PHOTOS = {
  /** 도쿄 스카이라인 */
  tokyo: "photo-1503899036084-c55cdd92da26",
  /** 아라시야마 대나무숲 */
  kyoto: "photo-1698618988744-737573cb6a7a",
  /** 오사카성 */
  osaka: "photo-1773467223754-b9f3eb4d2c0f",
  /** 오호리 공원 */
  fukuoka: "photo-1759547808543-5c11c3d308c8",
  /** 후시미 이나리 — 히어로 배경 */
  heroKyoto: "photo-1493976040374-85c8e12f0c0e",
} as const;

/** 홈 히어로 배경 — 교토 후시미 이나리 */
export const HOME_HERO_BACKGROUND = unsplash(DESTINATION_PHOTOS.heroKyoto, 1920);

export const POPULAR_DESTINATIONS = [
  {
    id: "TOKYO",
    title: "도쿄",
    desc: "시부야 크로싱, 도쿄타워 등 현대와 전통이 공존하는 메가시티",
    image: unsplash(DESTINATION_PHOTOS.tokyo),
    href: "/attractions?region=TOKYO",
  },
  {
    id: "KYOTO",
    title: "교토",
    desc: "아라시야마 대나무숲과 아기자기한 신사들이 가득한 전통 도시",
    image: unsplash(DESTINATION_PHOTOS.kyoto),
    href: "/attractions?region=OSAKA_KYOTO",
  },
  {
    id: "OSAKA",
    title: "오사카",
    desc: "도톤보리 글리코상과 맛있는 길거리 음식이 가득한 식도락의 천국",
    image: unsplash(DESTINATION_PHOTOS.osaka),
    href: "/attractions?region=OSAKA_KYOTO",
  },
  {
    id: "FUKUOKA",
    title: "후쿠오카",
    desc: "나카스·오호리 공원·하카타 라멘 등 규슈 여행의 관문 도시",
    image: unsplash(DESTINATION_PHOTOS.fukuoka),
    href: "/attractions?region=FUKUOKA",
  },
] as const;

/** 홈 플래너 예시 지도 마커 (도쿄) */
export const HOME_PREVIEW_MAP_MARKERS = [
  { id: "shinjuku", label: "신주쿠", lat: 35.6896, lng: 139.7006 },
  { id: "shibuya", label: "시부야 스카이", lat: 35.6585, lng: 139.7013 },
  { id: "asakusa", label: "아사쿠사 센소지", lat: 35.7148, lng: 139.7967 },
] as const;

export const PLANNER_TIMELINE = [
  {
    day: "1일차 - 도쿄 도착",
    spot: "나리타 공항 ➡️ 숙소 체크인",
    memo: "공항철도 이용, 신주쿠 인근 숙소 이동",
  },
  {
    day: "2일차 - 쇼핑 & 트렌드",
    spot: "시부야 스카이 ➡️ 하라주쿠",
    memo: "오후 4시 전망대 예약 필수, 인생샷 스팟",
  },
  {
    day: "3일차 - 도쿄의 전통",
    spot: "아사쿠사 센소지 ➡️ 아키하바라",
    memo: "전통 인력거 체험 및 굿즈 투어",
  },
] as const;

export const AI_SUGGESTIONS = [
  {
    name: "후시미 이나리",
    desc: "교토 · 무료 입장 · 이른 아침 추천",
    href: "/attractions?region=OSAKA_KYOTO",
  },
  {
    name: "라멘 투어 코스",
    desc: "이치란 · 후쿠오카 스타일 · ★4.8",
    href: "/restaurants?region=FUKUOKA",
  },
  {
    name: "오호리 공원·다자이후",
    desc: "후쿠오카 · 산책·텐만구 당일치기",
    href: "/attractions?region=FUKUOKA",
  },
] as const;
