import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, type ParishSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  let body: { name?: string; city?: string; email?: string; password?: string } = {};
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Request invalid." }, { status: 400 });
  }
  const { name, city, email, password } = body;

  if (!name || !city || !email || !password) {
    return NextResponse.json({ error: "Date incomplete." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Baza de date nu este configurată. Adăugați DATABASE_URL în variabilele de mediu Vercel." },
      { status: 500 }
    );
  }

  let existing, parish;
  try {
    existing = await prisma.parish.findUnique({ where: { email } });
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Eroare conexiune bază de date." }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json(
      { error: "Există deja un cont cu acest email." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  try {
    parish = await prisma.parish.create({
      data: { name, city, email, passwordHash },
    });
  } catch (e) {
    console.error("DB create error:", e);
    return NextResponse.json({ error: "Eroare la crearea contului. Verificați conexiunea DB." }, { status: 500 });
  }

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
