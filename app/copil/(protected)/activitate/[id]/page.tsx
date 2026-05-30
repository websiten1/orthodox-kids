import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ActivityRenderer from "@/components/child/ActivityRenderer";

export default async function ActivitatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getChildSession();
  if (!session) return null;

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: {
      questions: true,
      theme: { select: { title: true, id: true } },
    },
  });

  if (!activity) return notFound();

  const alreadyCompleted = await prisma.activityEvent.findFirst({
    where: { childId: session.childId, activityId: id },
  });

  return (
    <ActivityRenderer
      activity={{
        id: activity.id,
        title: activity.title,
        type: activity.type,
        content: activity.content as Record<string, unknown>,
        talantsReward: activity.talantsReward,
        estimatedMins: activity.estimatedMins,
        questions: activity.questions,
        themeTitle: activity.theme.title,
        themeId: activity.theme.id,
      }}
      childId={session.childId}
      alreadyCompleted={!!alreadyCompleted}
    />
  );
}
