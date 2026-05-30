import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("calea-parish-token");
  cookieStore.delete("calea-child-token");
  cookieStore.delete("calea-parent-token");
  return NextResponse.json({ ok: true });
}
