import { NextRequest, NextResponse } from "next/server";
import { loginChildWithCode } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { groupCode, accessToken } = body;

  if (!groupCode || !accessToken) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  const result = await loginChildWithCode(groupCode, accessToken);
  if (!result) {
    return NextResponse.json(
      { error: "Cod incorect. Verificați codul clasei și codul personal." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("calea-child-token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.json({ child: result.child });
}
