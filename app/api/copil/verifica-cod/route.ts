import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { groupCode?: string };
  const { groupCode } = body;

  if (!groupCode) {
    return NextResponse.json({ error: "Cod lipsă." }, { status: 400 });
  }

  // Orice cod de minim 4 caractere funcționează în demo
  if (groupCode.trim().length < 4) {
    return NextResponse.json({ error: "Codul trebuie să aibă minim 4 caractere." }, { status: 404 });
  }

  return NextResponse.json({
    groupId: "demo-group-1",
    groupName: "Grupul Demo",
    ageRange: "5-6",
    parishName: "Parohia Demo",
  });
}
