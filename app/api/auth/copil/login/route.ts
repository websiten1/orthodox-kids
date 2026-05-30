import { NextRequest, NextResponse } from "next/server";
import { signToken, type ChildSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    groupCode?: string; accessToken?: string;
  };

  if (!body.groupCode || !body.accessToken) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  const session: ChildSession = {
    type: "child",
    childId: "demo-child",
    groupId: "demo-group-1",
    displayName: "Andrei M.",
    talantsBalance: 145,
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

  return NextResponse.json({ child: { id: "demo-child", displayName: "Andrei M." } });
}
