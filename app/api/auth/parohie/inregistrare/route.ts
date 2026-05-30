import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, type ParishSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, city, email, password } = body;

  if (!name || !city || !email || !password) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  const existing = await prisma.parish.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Există deja un cont cu acest email." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const parish = await prisma.parish.create({
    data: { name, city, email, passwordHash },
  });

  const session: ParishSession = {
    type: "parish",
    parishId: parish.id,
    email: parish.email,
    name: parish.name,
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

  return NextResponse.json({ parish: { id: parish.id, name: parish.name } });
}
