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
  const { teamId, result } = body;

  const talantsEarned =
    result === "win"
      ? TALANTS_REWARDS.WIN_TEAM_GAME
      : result === "draw"
      ? 8
      : 5;

  await prisma.$transaction([
    prisma.teamEvent.create({
      data: {
        teamId,
        activityId: "turnul-credintei",
        result,
        talantsEarned,
      },
    }),
    prisma.child.update({
      where: { id: session.childId },
      data: { talantsBalance: { increment: talantsEarned } },
    }),
    result === "win"
      ? prisma.team.update({
          where: { id: teamId },
          data: { blazonLevel: { increment: 1 } },
        })
      : prisma.team.findUnique({ where: { id: teamId } }),
  ]);

  return NextResponse.json({ ok: true, talantsEarned });
}
