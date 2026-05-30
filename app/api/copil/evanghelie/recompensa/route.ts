import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";
import { TALANTS_REWARDS } from "@/types";

export async function POST(request: NextRequest) {
  const session = await getChildSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { gospelId } = body;

  // Verificăm să nu dăm recompensa de două ori pentru aceeași evanghelie
  // Folosim activityEvent cu activityId special pentru evanghelie
  const fakeActivityId = `gospel_${gospelId}`;
  const existing = await prisma.activityEvent.findFirst({
    where: { childId: session.childId, activityId: fakeActivityId },
  });

  if (existing) {
    return NextResponse.json({ alreadyClaimed: true });
  }

  await prisma.$transaction([
    prisma.activityEvent.create({
      data: {
        childId: session.childId,
        activityId: fakeActivityId,
        score: 100,
        talantsEarned: TALANTS_REWARDS.GOSPEL_ACTIVITY,
        timeSpentSecs: 300,
        answersLog: [],
      },
    }),
    prisma.child.update({
      where: { id: session.childId },
      data: { talantsBalance: { increment: TALANTS_REWARDS.GOSPEL_ACTIVITY } },
    }),
  ]);

  return NextResponse.json({ ok: true, talantsEarned: TALANTS_REWARDS.GOSPEL_ACTIVITY });
}
