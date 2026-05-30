import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParishSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const body = await request.json();
  const { groupId, message } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: "Mesaj gol." }, { status: 400 });
  }

  // Verificăm că grupul aparține parohiei
  if (groupId) {
    const group = await prisma.group.findFirst({
      where: { id: groupId, parishId: session.parishId },
    });
    if (!group) {
      return NextResponse.json({ error: "Grupă negăsită." }, { status: 404 });
    }
  }

  const notification = await prisma.notification.create({
    data: {
      parishId: session.parishId,
      groupId: groupId ?? null,
      message: message.trim(),
    },
  });

  return NextResponse.json({ notification });
}

export async function GET() {
  const session = await getParishSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { parishId: session.parishId },
    orderBy: { sentAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ notifications });
}
