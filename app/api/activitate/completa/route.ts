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
  const { activityId, score, timeSpentSecs, answersLog } = body;

  if (!activityId) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  // Nu permitem completarea de două ori
  const existing = await prisma.activityEvent.findFirst({
    where: { childId: session.childId, activityId },
  });
  if (existing) {
    return NextResponse.json({ alreadyCompleted: true, event: existing });
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    select: { talantsReward: true },
  });
  if (!activity) {
    return NextResponse.json({ error: "Activitate negăsită." }, { status: 404 });
  }

  // Bonus +2 talanți pentru scor perfect
  const bonusTalants =
    score >= 100 ? TALANTS_REWARDS.CORRECT_FIRST_TRY : 0;
  const talantsEarned = activity.talantsReward + bonusTalants;

  const [event] = await prisma.$transaction([
    prisma.activityEvent.create({
      data: {
        childId: session.childId,
        activityId,
        score: score ?? 100,
        talantsEarned,
        timeSpentSecs: timeSpentSecs ?? 0,
        answersLog: answersLog ?? [],
      },
    }),
    prisma.child.update({
      where: { id: session.childId },
      data: { talantsBalance: { increment: talantsEarned } },
    }),
    prisma.childIconProgress.updateMany({
      where: { childId: session.childId },
      data: { completedLayers: { increment: 1 } },
    }),
  ]);

  return NextResponse.json({ event, talantsEarned });
}
