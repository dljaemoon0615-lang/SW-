import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const budget = await prisma.budget.findFirst({
    where: { userId: session.user.id },
    include: { allocations: true },
    orderBy: { updatedAt: "desc" },
  });

  const expenses = await prisma.expenseEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { spentAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    totalKrw: budget?.totalKrw ?? 0,
    allocations: budget?.allocations.map((a) => ({
      category: a.category,
      amountKrw: a.amountKrw,
    })) ?? [],
    expenses: expenses.map((e) => ({
      category: e.category,
      amountKrw: e.amountKrw,
      description: e.description,
    })),
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { totalKrw, allocations, expenses } = await req.json();

  let budget = await prisma.budget.findFirst({ where: { userId: session.user.id } });
  if (!budget) {
    budget = await prisma.budget.create({ data: { userId: session.user.id, totalKrw } });
  } else {
    budget = await prisma.budget.update({ where: { id: budget.id }, data: { totalKrw } });
  }

  await prisma.budgetAllocation.deleteMany({ where: { budgetId: budget.id } });
  if (allocations?.length) {
    await prisma.budgetAllocation.createMany({
      data: allocations.map((a: { category: string; amountKrw: number }) => ({
        budgetId: budget!.id,
        category: a.category,
        amountKrw: a.amountKrw,
      })),
    });
  }

  if (expenses?.length) {
    await prisma.expenseEntry.deleteMany({ where: { userId: session.user.id } });
    await prisma.expenseEntry.createMany({
      data: expenses.map((e: { category: string; amountKrw: number; description?: string }) => ({
        userId: session.user!.id,
        category: e.category,
        amountKrw: e.amountKrw,
        description: e.description,
      })),
    });
  }

  return NextResponse.json({ ok: true });
}
