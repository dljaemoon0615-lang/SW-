import type {
  AccommodationResult,
  AccommodationSearchRequest,
  AttractionResult,
  ChatRequest,
  ChatResponse,
  ItineraryGenerateRequest,
  ItineraryGenerateResponse,
  RestaurantResult,
  RestaurantSearchRequest,
} from "./types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { MOCK_ATTRACTIONS } from "@/features/attractions/server/mock-data";
import { enrichAttraction } from "@/features/attractions/server/details";
import { searchRakutenStays } from "@/server/rakuten/travel-client";

const AI_BASE = process.env.AI_SERVICE_BASE_URL ?? "";
const AI_KEY = process.env.AI_SERVICE_API_KEY ?? "";

async function callAi<T>(path: string, body: unknown): Promise<T | null> {
  if (!AI_BASE) return null;

  try {
    const res = await fetch(`${AI_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AI_KEY ? { Authorization: `Bearer ${AI_KEY}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function mockItinerary(req: ItineraryGenerateRequest): ItineraryGenerateResponse {
  const regionLabel: Record<JapanRegionId, string> = {
    OSAKA_KYOTO: "오사카·교토",
    FUKUOKA: "후쿠오카",
    TOKYO: "도쿄",
    SAPPORO: "삿포로",
  };

  return {
    title: `${regionLabel[req.region]} ${req.travelers}인 여행`,
    days: [
      {
        dayIndex: 1,
        date: req.startDate,
        items: [
          { placeName: "공항 → 시내 이동", startTime: "10:00", transport: "전철" },
          { placeName: "지역 대표 관광지", startTime: "14:00", endTime: "18:00" },
        ],
      },
    ],
    attractions: mockAttractions(req.region),
  };
}

function mockAttractions(region: JapanRegionId): AttractionResult[] {
  return MOCK_ATTRACTIONS[region] ?? [];
}

function mockRestaurants(region: JapanRegionId): RestaurantResult[] {
  return [
    {
      id: "r1",
      name: region === "TOKYO" ? "츠키지 스시" : "현지 인기 라멘",
      cuisine: "일식",
      rating: 4.6,
      distanceKm: 0.8,
      avgPriceKrw: 25000,
      hours: "11:00-21:00",
      reservationRequired: true,
    },
    {
      id: "r2",
      name: "이자카야 거리 맛집",
      cuisine: "이자카야",
      rating: 4.3,
      distanceKm: 1.2,
      avgPriceKrw: 18000,
      hours: "17:00-24:00",
      reservationRequired: false,
    },
  ];
}

function mockChat(req: ChatRequest): ChatResponse {
  const history = (req.tripContext?.history as { role: string }[] | undefined) ?? [];
  const turn = history.filter((h) => h.role === "user").length;
  const prefix = turn > 1 ? "이전 대화를 참고해 " : "";
  return {
    sessionId: req.sessionId ?? "mock-session",
    reply: `${prefix}「${req.message}」에 대한 답변입니다. (임시 AI) 실제 모델 연동 후 맞춤 추천이 제공됩니다.`,
    suggestedQuestions: [
      "이 지역 2박3일 코스 추천해줘",
      "예산 100만원으로 숙소와 식비 나눠줘",
      "비 오는 날 실내 관광지 알려줘",
    ],
  };
}

export const aiAdapter = {
  async generateItinerary(req: ItineraryGenerateRequest) {
    return (
      (await callAi<ItineraryGenerateResponse>("/itinerary/generate", req)) ??
      mockItinerary(req)
    );
  },

  async searchAccommodations(req: AccommodationSearchRequest): Promise<AccommodationResult[]> {
    const fromAi = await callAi<AccommodationResult[]>("/accommodations/search", req);
    if (fromAi && fromAi.length > 0) return fromAi;

    const fromRakuten = await searchRakutenStays(req);
    if (fromRakuten && fromRakuten.length > 0) return fromRakuten;

    return [];
  },

  async chat(req: ChatRequest) {
    return (await callAi<ChatResponse>("/chat", req)) ?? mockChat(req);
  },

  async searchRestaurants(req: RestaurantSearchRequest) {
    return (
      (await callAi<RestaurantResult[]>("/restaurants/search", req)) ??
      mockRestaurants(req.region)
    );
  },

  async getAttractions(region: JapanRegionId) {
    const fromAi = await callAi<AttractionResult[]>("/attractions", { region });
    const items = fromAi ?? mockAttractions(region);
    return items.map((a) => enrichAttraction(a));
  },
};
