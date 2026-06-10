/** 관광지 OSM/Google category 코드 → 한국어 */
export const ATTRACTION_CATEGORY_KO: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  zoo: "동물원",
  aquarium: "수족관",
  gallery: "미술관",
  shrine: "신사",
  temple: "사찰",
  place_of_worship: "종교 시설",
  park: "공원",
  garden: "정원",
  historic_castle: "성·궁궐",
  historic_fort: "성·궁궐",
  historic_city_gate: "성문",
  historic_monument: "기념물",
  historic_memorial: "기념관",
  historic_ruins: "유적",
  historic_archaeological_site: "유적",
  historic_tomb: "고분·무덤",
};

export function categoryLabelKo(category: string | undefined): string {
  if (!category) return "명소";
  return ATTRACTION_CATEGORY_KO[category] ?? category.replace(/_/g, " ");
}
