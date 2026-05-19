"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { BUDGET_CATEGORIES } from "@/shared/lib/constants";

type Allocation = { category: string; amountKrw: number };
type Rate = { krwToJpy: number; source: string };

export function BudgetPanel() {
  const [totalKrw, setTotalKrw] = useState(2000000);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [expenses, setExpenses] = useState<{ category: string; amountKrw: number; description?: string }[]>([]);
  const [rate, setRate] = useState<Rate | null>(null);
  const [spentInput, setSpentInput] = useState({ category: "FOOD", amountKrw: 0, description: "" });

  useEffect(() => {
    fetch("/api/budget/rate").then((r) => r.json()).then(setRate);
    fetch("/api/budget").then((r) => r.json()).then((d) => {
      if (d.totalKrw) setTotalKrw(d.totalKrw);
      if (d.allocations) setAllocations(d.allocations);
      if (d.expenses) setExpenses(d.expenses);
    });
  }, []);

  async function suggestAllocation() {
    const res = await fetch("/api/budget/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalKrw }),
    });
    const data = await res.json();
    setAllocations(data.allocations);
  }

  async function saveBudget() {
    await fetch("/api/budget", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalKrw, allocations, expenses }),
    });
  }

  const spent = expenses.reduce((s, e) => s + e.amountKrw, 0);
  const remaining = totalKrw - spent;

  return (
    <div className="space-y-4">
      {rate ? (
        <Card className="text-sm text-slate-600">
          환율 1원 ≈ {rate.krwToJpy.toFixed(4)}엔 ({rate.source === "api" ? "실시간" : "기본값"})
        </Card>
      ) : null}

      <Card className="space-y-2">
        <label className="text-sm font-medium">총 예산 (원)</label>
        <input
          type="number"
          value={totalKrw}
          onChange={(e) => setTotalKrw(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <Button type="button" variant="secondary" onClick={suggestAllocation}>
          항목별 자동 배분 제안
        </Button>
      </Card>

      <Card>
        <p className="mb-2 text-sm font-medium">배분 · 잔액</p>
        <p className="text-2xl font-bold text-rose-600">{remaining.toLocaleString()}원 남음</p>
        <p className="text-xs text-slate-500">지출 {spent.toLocaleString()}원 / 총 {totalKrw.toLocaleString()}원</p>
        <div className="mt-3 space-y-2">
          {allocations.map((a) => {
            const cat = BUDGET_CATEGORIES.find((c) => c.id === a.category);
            return (
              <div key={a.category} className="flex justify-between text-sm">
                <span>{cat?.label ?? a.category}</span>
                <span>
                  {a.amountKrw.toLocaleString()}원
                  {rate ? ` · ≈${Math.round(a.amountKrw * rate.krwToJpy).toLocaleString()}엔` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm font-medium">지출 입력</p>
        <select
          value={spentInput.category}
          onChange={(e) => setSpentInput((s) => ({ ...s, category: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          {BUDGET_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="금액 (원)"
          value={spentInput.amountKrw || ""}
          onChange={(e) => setSpentInput((s) => ({ ...s, amountKrw: Number(e.target.value) }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="메모"
          value={spentInput.description}
          onChange={(e) => setSpentInput((s) => ({ ...s, description: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <Button
          type="button"
          onClick={() => {
            if (!spentInput.amountKrw) return;
            setExpenses((e) => [...e, { ...spentInput }]);
            setSpentInput((s) => ({ ...s, amountKrw: 0, description: "" }));
          }}
        >
          지출 추가
        </Button>
      </Card>

      <Button type="button" className="w-full" onClick={saveBudget}>
        예산 저장
      </Button>
    </div>
  );
}
