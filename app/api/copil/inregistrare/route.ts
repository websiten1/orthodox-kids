import { NextRequest, NextResponse } from "next/server";
import { signToken, type ChildSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    firstName?: string; initial?: string; avatarConfig?: Record<string, unknown>;
  };
  const { firstName, initial, avatarConfig } = body;

  if (!firstName) {
    return NextResponse.json({ error: "Completați prenumele." }, { status: 400 });
  }

  const displayName = initial ? `${firstName} ${initial}.` : firstName;

  const session: ChildSession = {
    type: "child",
    childId: "demo-child",
    groupId: "demo-group-1",
    displayName,
    talantsBalance: 10,
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
    child: { id: "demo-child", displayName },
    accessToken: "DEMO1234",
  });
}
