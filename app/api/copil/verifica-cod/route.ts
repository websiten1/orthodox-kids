import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { groupCode } = body;

  if (!groupCode) {
    return NextResponse.json({ error: "Cod lipsă." }, { status: 400 });
  }

  const group = await prisma.group.findUnique({
    where: { inviteCode: groupCode },
    include: { parish: { select: { name: true } } },
  });

  if (!group) {
    return NextResponse.json({ error: "Cod invalid." }, { status: 404 });
  }

  return NextResponse.json({
    groupId: group.id,
    groupName: group.name,
    ageRange: group.ageRange,
    parishName: group.parish.name,
  });
}
