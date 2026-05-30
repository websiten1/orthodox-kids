import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GospelView from "@/components/child/GospelView";

export default async function EvangheligPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getChildSession();
  if (!session) return null;

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    select: { groupId: true, group: { select: { ageRange: true } } },
  });

  if (!child) return null;

  const gospel = await prisma.gospel.findUnique({
    where: { id },
    include: {
      activities: {
        where: { ageRange: { in: [child.group.ageRange, "all"] } },
        orderBy: { type: "asc" },
      },
    },
  });

  if (!gospel) return notFound();

  const textByAge = gospel.textByAge as Record<string, string>;
  const text = textByAge[child.group.ageRange] ?? textByAge["all"] ?? "";

  return (
    <GospelView
      gospel={{
        id: gospel.id,
        title: gospel.title,
        moralLesson: gospel.moralLesson,
        text,
        characters: gospel.characters as string[],
      }}
      activities={gospel.activities.map((a) => ({
        id: a.id,
        type: a.type,
        content: a.content as Record<string, unknown>,
      }))}
      childId={session.childId}
    />
  );
}
