import { fetchExchangeRate, jpyToKrw } from "@/features/budget/server/exchange-rate";
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  buildJaKoTranslationMap,
  isMostlyJapanese,
  translateAreaWithMap,
  translateHotelNameWithMap,
  translateJa,
  translateStationWithMap,
} from "./translate";

const ENDPOINT =
  "https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426";

type RegionSpot = { lat: number; lng: number; radius: number };

/** 지역마다 여러 검색 지점을 두어 결과를 분산·확대합니다. */
const REGION_SPOTS: Record<JapanRegionId, RegionSpot[]> = {
  TOKYO: [
    { lat: 35.6812, lng: 139.7671, radius: 3 }, // 도쿄역
    { lat: 35.6896, lng: 139.7006, radius: 3 }, // 신주쿠
    { lat: 35.658, lng: 139.7016, radius: 3 }, // 시부야
    { lat: 35.7148, lng: 139.7967, radius: 3 }, // 아사쿠사·우에노
  ],
  OSAKA_KYOTO: [
    { lat: 34.7025, lng: 135.4959, radius: 3 }, // 우메다
    { lat: 34.6687, lng: 135.5023, radius: 3 }, // 난바·도톤보리
    { lat: 35.0116, lng: 135.7681, radius: 3 }, // 교토역
    { lat: 35.0036, lng: 135.7782, radius: 3 }, // 기온
  ],
  FUKUOKA: [
    { lat: 33.5902, lng: 130.4017, radius: 3 }, // 하카타
    { lat: 33.5904, lng: 130.3989, radius: 3 }, // 텐진
  ],
  SAPPORO: [
    { lat: 43.0686, lng: 141.3508, radius: 3 }, // 삿포로역·오도리
    { lat: 43.055, lng: 141.353, radius: 3 }, // 스스키노
  ],
};

type CacheEntry = { expires: number; data: AccommodationResult[] };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

type RakutenHotelBasicInfo = {
  hotelNo: number;
  hotelName: string;
  hotelInformationUrl?: string;
  hotelMinCharge?: number;
  reviewAverage?: number;
  reviewCount?: number;
  hotelImageUrl?: string;
  hotelThumbnailUrl?: string;
  roomImageUrl?: string;
  roomThumbnailUrl?: string;
  hotelSpecial?: string;
  hotelClassCode?: string;
  address1?: string;
  address2?: string;
  access?: string;
  nearestStation?: string;
  latitude?: number;
  longitude?: number;
};

type RakutenHotelEntry = { hotel: { hotelBasicInfo?: RakutenHotelBasicInfo }[] };
type RakutenSearchResponse = { hotels?: RakutenHotelEntry[]; error?: string };

function inferType(info: RakutenHotelBasicInfo): AccommodationType {
  const text = `${info.hotelName} ${info.hotelSpecial ?? ""}`;
  if (/旅館|ryokan|温泉宿/i.test(text)) return "RYOKAN";
  if (/ゲストハウス|guesthouse|ホステル|hostel|カプセル|capsule|backpack/i.test(text)) {
    return "GUESTHOUSE";
  }
  return "HOTEL";
}

const AMENITY_PATTERNS: { keyword: RegExp; amenity: AccommodationAmenity }[] = [
  { keyword: /wi[-_ ]?fi|無線lan|wifi/i, amenity: "WIFI" },
  { keyword: /朝食|breakfast|モーニング/i, amenity: "BREAKFAST" },
  { keyword: /温泉|大浴場|onsen|hot spring/i, amenity: "ONSEN" },
  { keyword: /キッチン|kitchen/i, amenity: "KITCHEN" },
  { keyword: /駐車場|parking/i, amenity: "PARKING" },
  { keyword: /空港|airport|シャトル/i, amenity: "AIRPORT_BUS" },
  { keyword: /ファミリ|family|子供/i, amenity: "FAMILY" },
  { keyword: /禁煙|non[ -]?smoking/i, amenity: "NON_SMOKING" },
];

function inferAmenities(info: RakutenHotelBasicInfo): AccommodationAmenity[] {
  const text = `${info.hotelName} ${info.hotelSpecial ?? ""} ${info.access ?? ""}`;
  const result = new Set<AccommodationAmenity>();
  for (const { keyword, amenity } of AMENITY_PATTERNS) {
    if (keyword.test(text)) result.add(amenity);
  }
  if (result.size === 0) result.add("WIFI");
  return Array.from(result);
}

function walkMinutesFromAccess(access: string | undefined): number | undefined {
  if (!access) return undefined;
  const match = access.match(/徒歩\s*約?\s*(\d{1,3})\s*分/);
  if (match) return Number(match[1]);
  const directMatch = access.match(/直結|直接|connected/i);
  if (directMatch) return 0;
  return undefined;
}

function buildAutoHighlight(
  info: RakutenHotelBasicInfo,
  type: AccommodationType,
  amenities: AccommodationAmenity[],
): string | undefined {
  if (amenities.includes("ONSEN")) return "온천 보유";
  if (type === "RYOKAN") return "전통 료칸";
  if (type === "GUESTHOUSE") return "가성비 숙소";
  if ((info.reviewCount ?? 0) > 1000) return `리뷰 ${(info.reviewCount ?? 0).toLocaleString()}건`;
  if ((info.reviewAverage ?? 0) >= 4.5) return "평점 4.5+";
  return undefined;
}

function nearestStationFromAccess(access: string | undefined): string | undefined {
  if (!access) return undefined;
  const stationMatch = access.match(/「?([^「」,。 \n]+?(?:駅|station))/i);
  return stationMatch ? stationMatch[1] : undefined;
}

function buildHeaders(): HeadersInit {
  const raw = (process.env.RAKUTEN_ALLOWED_ORIGIN ?? "https://www.rakuten.co.jp").trim();
  const origin = raw.startsWith("http") ? raw : `https://${raw}`;
  const referer = origin.endsWith("/") ? origin : `${origin}/`;
  return {
    Origin: origin.replace(/\/$/, ""),
    Referer: referer,
    "User-Agent":
      "Mozilla/5.0 (compatible; MyTripBot/1.0; +https://github.com/dljaemoon0615-lang/SW-)",
    Accept: "application/json",
  };
}

async function callRakuten(params: URLSearchParams): Promise<RakutenSearchResponse | null> {
  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
      headers: buildHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      console.warn("[rakuten] error", res.status, text.slice(0, 200));
      return null;
    }
    return (await res.json()) as RakutenSearchResponse;
  } catch (err) {
    console.warn("[rakuten] fetch failed", err);
    return null;
  }
}

async function fetchSpot(
  spot: RegionSpot,
  appId: string,
  accessKey: string,
  affiliateId: string | undefined,
): Promise<RakutenHotelBasicInfo[]> {
  const params = new URLSearchParams({
    applicationId: appId,
    accessKey,
    format: "json",
    latitude: String(spot.lat),
    longitude: String(spot.lng),
    searchRadius: String(spot.radius),
    datumType: "1",
    hits: "30",
    responseType: "large",
  });
  if (affiliateId) params.set("affiliateId", affiliateId);

  const json = await callRakuten(params);
  if (!json?.hotels?.length) return [];

  return json.hotels
    .map((entry) => entry.hotel.find((h) => h.hotelBasicInfo)?.hotelBasicInfo)
    .filter((info): info is RakutenHotelBasicInfo => !!info);
}

export async function searchRakutenStays(
  req: AccommodationSearchRequest,
): Promise<AccommodationResult[] | null> {
  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!appId || !accessKey) return null;

  const spots = REGION_SPOTS[req.region];
  if (!spots?.length) return null;

  const cacheKey = `${req.region}|${req.types?.sort().join(",") ?? ""}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > now) return cached.data;

  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID;

  const results = await Promise.all(
    spots.map((spot) => fetchSpot(spot, appId, accessKey, affiliateId)),
  );

  const merged = new Map<number, RakutenHotelBasicInfo>();
  for (const list of results) {
    for (const info of list) {
      if (!merged.has(info.hotelNo)) merged.set(info.hotelNo, info);
    }
  }

  if (merged.size === 0) return null;

  const rate = await fetchExchangeRate();

  const hotelList = Array.from(merged.values());
  const translationMap = await buildJaKoTranslationMap(
    hotelList.flatMap((info) => [
      info.hotelName,
      info.address1,
      info.address2,
      info.hotelSpecial,
      nearestStationFromAccess(info.access),
    ]),
  );

  const items: AccommodationResult[] = hotelList
    .map((info) => {
      const priceJpy = info.hotelMinCharge ?? 0;
      const priceKrw = priceJpy > 0 ? jpyToKrw(priceJpy, rate) : 0;
      const type = inferType(info);
      const amenities = inferAmenities(info);
      const photos = [info.hotelImageUrl, info.roomImageUrl, info.hotelThumbnailUrl]
        .filter((u): u is string => !!u)
        .filter((u, i, arr) => arr.indexOf(u) === i);

      const translatedSpecial = info.hotelSpecial
        ? (translationMap.get(info.hotelSpecial.trim()) ??
          translateJa(info.hotelSpecial))
        : "";
      const trimmedSpecial = translatedSpecial.slice(0, 24);
      const highlight = trimmedSpecial && !isMostlyJapanese(trimmedSpecial)
        ? trimmedSpecial
        : buildAutoHighlight(info, type, amenities);

      return {
        id: `rk-${info.hotelNo}`,
        name: translateHotelNameWithMap(info.hotelName, translationMap),
        type,
        area: translateAreaWithMap(info.address2 || info.address1, translationMap),
        nearestStation: translateStationWithMap(
          nearestStationFromAccess(info.access),
          translationMap,
        ),
        walkMinutes: walkMinutesFromAccess(info.access),
        priceKrw,
        rating: info.reviewAverage ?? 0,
        reviewCount: info.reviewCount,
        amenities,
        highlight,
        imageUrl: photos[0],
        imageUrls: photos.slice(0, 4),
        bookingUrl: info.hotelInformationUrl ?? `https://travel.rakuten.co.jp/HOTEL/${info.hotelNo}/`,
      } satisfies AccommodationResult;
    })
    .filter((s) => s.priceKrw > 0);

  cache.set(cacheKey, { expires: now + CACHE_TTL_MS, data: items });
  return items;
}
