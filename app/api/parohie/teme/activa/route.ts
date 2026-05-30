import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParishSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { themeId, groupId, isActive } = body;

  // Verificăm că grupul aparține parohiei
  const group = await prisma.group.findFirst({
    where: { id: groupId, parishId: session.parishId },
  });
  if (!group) {
    return NextResponse.json({ error: "Grupă negăsită." }, { status: 404 });
  }

  const groupTheme = await prisma.groupTheme.upsert({
    where: { id: `gt-${groupId}-${themeId}` },
    update: { isActive, startDate: isActive ? new Date() : null },
    create: {
      id: `gt-${groupId}-${themeId}`,
      groupId,
      themeId,
      isActive,
      startDate: isActive ? new Date() : null,
    },
  });

  return NextResponse.json({ groupTheme });
}
