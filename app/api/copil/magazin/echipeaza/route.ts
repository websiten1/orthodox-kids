import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getChildSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { shopItemId, equip } = body;

  await prisma.childInventory.updateMany({
    where: { childId: session.childId, shopItemId },
    data: { isEquipped: equip },
  });

  return NextResponse.json({ ok: true, equipped: equip });
}
