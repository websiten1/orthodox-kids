import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParishSession, generateInviteCode } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { name, ageRange, teamNames } = body;

  if (!name || !ageRange) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  // Generăm un cod unic
  let inviteCode = generateInviteCode();
  let attempts = 0;
  while (attempts < 10) {
    const existing = await prisma.group.findUnique({ where: { inviteCode } });
    if (!existing) break;
    inviteCode = generateInviteCode();
    attempts++;
  }

  const group = await prisma.group.create({
    data: {
      parishId: session.parishId,
      name,
      ageRange,
      inviteCode,
      teams: {
        create: (teamNames ?? ["Apostolii", "Îngerii"]).map(
          (teamName: string) => ({ name: teamName })
        ),
      },
    },
  });

  return NextResponse.json({
    id: group.id,
    name: group.name,
    inviteCode: group.inviteCode,
  });
}

export async function GET() {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const groups = await prisma.group.findMany({
    where: { parishId: session.parishId },
    include: {
      teams: { include: { children: { select: { id: true } } } },
      children: { select: { id: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ groups });
}
