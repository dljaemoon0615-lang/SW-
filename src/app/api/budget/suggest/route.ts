import { NextResponse } from "next/server";

const RATIOS = [
  { category: "ACCOMMODATION", ratio: 0.35 },
  { category: "TRANSPORT", ratio: 0.2 },
  { category: "FOOD", ratio: 0.25 },
  { category: "SIGHTSEEING", ratio: 0.15 },
  { category: "OTHER", ratio: 0.05 },
];

export async function POST(req: Request) {
  const { totalKrw } = await req.json();
  const total = Number(totalKrw) || 0;

  const allocations = RATIOS.map((r) => ({
    category: r.category,
    amountKrw: Math.round(total * r.ratio),
  }));

  return NextResponse.json({ allocations });
}
