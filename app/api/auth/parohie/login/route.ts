import { NextRequest, NextResponse } from "next/server";
import { signToken, type ParishSession } from "@/lib/auth";
import { DEMO_PARISH } from "@/lib/demo-data";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string };
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Completați email și parola." }, { status: 400 });
  }

  const session: ParishSession = {
    type: "parish",
    parishId: DEMO_PARISH.id,
    email: email,
    name: DEMO_PARISH.name,
  };
  const token = await signToken(session);

  const cookieStore = await cookies();
  cookieStore.set("calea-parish-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.json({ parish: { id: DEMO_PARISH.id, name: DEMO_PARISH.name } });
}
