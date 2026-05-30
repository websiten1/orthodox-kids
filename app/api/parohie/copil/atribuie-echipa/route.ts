import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParishSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { childId, teamId } = body;

  // Verificăm că echipa aparține parohiei
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
      group: { parishId: session.parishId },
    },
  });

  if (!team) {
    return NextResponse.json({ error: "Echipă negăsită." }, { status: 404 });
  }

  const child = await prisma.child.update({
    where: { id: childId },
    data: { teamId },
  });

  return NextResponse.json({ child: { id: child.id, teamId: child.teamId } });
}
