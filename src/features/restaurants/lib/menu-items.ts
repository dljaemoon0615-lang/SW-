export type RestaurantFoodFlags = {
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
};

const SIGNATURE_BY_TYPE: Record<string, string[]> = {
  ramen_restaurant: ["돈코츠 라멘", "쇼유 라멘", "차슈멘", "교자"],
  chinese_noodle_restaurant: ["짜장면", "짬뽕", "탕수육", "볶음밥"],
  noodle_shop: ["우동", "소바", "냉면", "덮밥"],
  sushi_restaurant: ["니기리", "사시미", "오마카세", "회덮밥"],
  japanese_restaurant: ["가이세키", "덮밥", "우동", "돈부리"],
  chinese_restaurant: ["짜장면", "볶음밥", "딤섬", "마파두부"],
  italian_restaurant: ["파스타", "피자", "리조또", "티라미수"],
  french_restaurant: ["코스 요리", "스테이크", "와인 페어링"],
  korean_restaurant: ["불고기", "비빔밥", "김치찌개", "갈비"],
  indian_restaurant: ["커리", "난", "탄두리 치킨", "빠니 푸리"],
  thai_restaurant: ["팟타이", "똠얌꿍", "그린 커리", "망고 스티키 라이스"],
  mexican_restaurant: ["타코", "부리또", "과카몰레", "엔칠라다"],
  american_restaurant: ["버거", "스테이크", "BBQ 립", "치킨 윙"],
  steak_house: ["릴레이 스테이크", "티본", "와규", "감자 사이드"],
  seafood_restaurant: ["회", "게 요리", "해물 덮밥", "스시"],
  barbecue_restaurant: ["야키니쿠", "갈비", "호르몬", "비빔밥"],
  izakaya: ["야키토리", "사케", "사시미", "오뎅"],
  cafe: ["핸드드립 커피", "라떼", "케이크", "샌드위치"],
  coffee_shop: ["에스프레소", "카페라떼", "스콘", "브런치"],
  bakery: ["멜론빵", "크루아상", "식빵", "파운드케이크"],
  bar: ["하이볼", "사케", "칵테일", "안주"],
  dessert_restaurant: ["파르페", "케이크", "아이스크림", "와플"],
  meal_takeaway: ["테이크아웃", "도시락", "벤토", "간편 식사"],
  fast_food_restaurant: ["버거", "프라이", "치킨", "음료"],
  sandwich_shop: ["샌드위치", "파니니", "샐러드", "수프"],
  brunch_restaurant: ["에그 베네딕트", "팬케이크", "브런치 플레이트"],
};

const CUISINE_FALLBACK: Record<string, string[]> = {
  라멘: ["돈코츠 라멘", "쇼유 라멘", "차슈멘"],
  스시: ["니기리", "사시미", "오마카세"],
  일식: ["덮밥", "우동", "가이세키"],
  중식: ["짜장면", "볶음밥", "딤섬"],
  이탈리안: ["파스타", "피자", "리조또"],
  카페: ["커피", "라떼", "디저트"],
  베이커리: ["빵", "페이스트리", "케이크"],
  바: ["칵테일", "하이볼", "안주"],
  테이크아웃: ["도시락", "테이크아웃 메뉴"],
  맛집: ["현지 인기 메뉴", "일본식 정식", "사이드 메뉴"],
};

const SUMMARY_KEYWORDS = [
  "돈코츠 라멘",
  "돈코쓰 라멘",
  "쇼유 라멘",
  "미소 라멘",
  "츠케멘",
  "오마카세",
  "니기리",
  "사시미",
  "야키니쿠",
  "야키토리",
  "우동",
  "소바",
  "덮밥",
  "돈부리",
  "가이세키",
  "파스타",
  "피자",
  "스테이크",
  "버거",
  "커리",
  "딤섬",
  "짜장면",
  "타코",
  "브런치",
  "케이크",
  "파르페",
  "티라미수",
];

const FLAG_MENU: { flag: keyof RestaurantFoodFlags; label: string }[] = [
  { flag: "servesBreakfast", label: "아침 메뉴" },
  { flag: "servesLunch", label: "점심 메뉴" },
  { flag: "servesDinner", label: "저녁 메뉴" },
  { flag: "servesCoffee", label: "커피" },
  { flag: "servesDessert", label: "디저트" },
  { flag: "servesBeer", label: "맥주" },
  { flag: "servesWine", label: "와인" },
  { flag: "servesVegetarianFood", label: "채식 메뉴" },
];

function normalizeMenuLabel(label: string): string {
  return label.replace(/돈코쓰/g, "돈코츠");
}

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

function extractFromSummary(summary?: string): string[] {
  if (!summary?.trim()) return [];
  const text = summary.trim();
  return unique(
    SUMMARY_KEYWORDS.filter((kw) => text.includes(kw)).map(normalizeMenuLabel),
  );
}

function signatureFromTypes(types: string[] | undefined, cuisine: string): string[] {
  const ordered = [...(types ?? [])];
  for (const type of ordered) {
    const items = SIGNATURE_BY_TYPE[type];
    if (items?.length) return [...items];
  }
  return CUISINE_FALLBACK[cuisine] ?? CUISINE_FALLBACK["맛집"]!;
}

function extrasFromFlags(flags?: RestaurantFoodFlags): string[] {
  if (!flags) return [];
  return FLAG_MENU.filter((f) => flags[f.flag]).map((f) => f.label);
}

export function buildMenuItems(options: {
  types?: string[];
  primaryType?: string;
  cuisine: string;
  editorialSummary?: string;
  flags?: RestaurantFoodFlags;
  maxItems?: number;
}): string[] {
  const typeList = unique([
    ...(options.primaryType ? [options.primaryType] : []),
    ...(options.types ?? []),
  ]);

  const fromSummary = extractFromSummary(options.editorialSummary);
  const fromTypes = signatureFromTypes(typeList, options.cuisine);
  const fromFlags = extrasFromFlags(options.flags);

  const merged = unique([...fromSummary, ...fromTypes, ...fromFlags]);
  const max = options.maxItems ?? 6;
  return merged.slice(0, max);
}
