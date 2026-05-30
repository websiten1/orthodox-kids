import { NextRequest, NextResponse } from "next/server";
import { signToken, type ParishSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    name?: string; city?: string; email?: string; password?: string;
  };
  const { name, city, email, password } = body;

  if (!name || !city || !email || !password) {
    return NextResponse.json({ error: "Completați toate câmpurile." }, { status: 400 });
  }

  const session: ParishSession = {
    type: "parish",
    parishId: "demo-parish",
    email: email,
    name: name,
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

  return NextResponse.json({ parish: { id: "demo-parish", name } });
}
