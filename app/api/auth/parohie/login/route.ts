import { NextRequest, NextResponse } from "next/server";
import { loginParish } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  const result = await loginParish(email, password);
  if (!result) {
    return NextResponse.json(
      { error: "Email sau parolă incorectă." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("calea-parish-token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 zile
    path: "/",
  });

  return NextResponse.json({ parish: result.parish });
}
