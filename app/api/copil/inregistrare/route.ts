import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, type ChildSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { groupCode, firstName, initial, avatarConfig } = body;

  if (!groupCode || !firstName) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  const group = await prisma.group.findUnique({
    where: { inviteCode: groupCode },
  });

  if (!group) {
    return NextResponse.json({ error: "Cod de grupă invalid." }, { status: 404 });
  }

  const displayName = initial
    ? `${firstName} ${initial}.`
    : firstName;

  const child = await prisma.child.create({
    data: {
      groupId: group.id,
      displayName,
      avatarConfig: avatarConfig ?? {},
      talantsBalance: 10, // bonus de bun venit
    },
  });

  // Creăm și icoana personală
  await prisma.childIconProgress.create({
    data: {
      childId: child.id,
      completedLayers: 0,
      totalLayers: 10,
    },
  });

  const session: ChildSession = {
    type: "child",
    childId: child.id,
    groupId: child.groupId,
    displayName: child.displayName,
    talantsBalance: child.talantsBalance,
  };
  const token = await signToken(session);

  const cookieStore = await cookies();
  cookieStore.set("calea-child-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.json({
    child: { id: child.id, displayName: child.displayName },
    accessToken: child.accessToken.slice(0, 8).toUpperCase(),
  });
}
