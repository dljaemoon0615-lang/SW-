import { NextResponse } from "next/server";

/** 브라우저 Google Maps JS — Places 키와 동일 값 사용 가능 (Maps JavaScript API 활성화 필요) */
export async function GET() {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    null;

  return NextResponse.json({ apiKey });
}
