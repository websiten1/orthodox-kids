import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getChildSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { shopItemId } = body;

  const item = await prisma.shopItem.findUnique({ where: { id: shopItemId } });
  if (!item) {
    return NextResponse.json({ error: "Produs negăsit." }, { status: 404 });
  }

  if (item.isEarnable) {
    return NextResponse.json(
      { error: "Acest produs nu se poate cumpăra, se câștigă." },
      { status: 400 }
    );
  }

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    select: { talantsBalance: true },
  });

  if (!child || child.talantsBalance < item.talantsCost) {
    return NextResponse.json(
      { error: "Talanți insuficienți." },
      { status: 400 }
    );
  }

  // Nu cumpăra de două ori
  const existing = await prisma.childInventory.findUnique({
    where: { childId_shopItemId: { childId: session.childId, shopItemId } },
  });
  if (existing) {
    return NextResponse.json({ alreadyOwned: true });
  }

  await prisma.$transaction([
    prisma.childInventory.create({
      data: { childId: session.childId, shopItemId },
    }),
    prisma.child.update({
      where: { id: session.childId },
      data: { talantsBalance: { decrement: item.talantsCost } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
