import { DEMO_THEMES, DEMO_QUIZ_QUESTIONS } from "@/lib/demo-data";
import ActivityRenderer from "@/components/child/ActivityRenderer";
import { notFound } from "next/navigation";
import { getChildSession } from "@/lib/auth";

export default async function ActivitatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getChildSession();
  if (!session) return null;

  const allActivities = DEMO_THEMES.flatMap(t =>
    t.activities.map(a => ({ ...a, themeTitle: t.title, themeId: t.id }))
  );
  const activity = allActivities.find(a => a.id === id);
  if (!activity) return notFound();

  return (
    <ActivityRenderer
      activity={{
        id: activity.id,
        title: activity.title,
        type: activity.type,
        content: { sections: [{ title: activity.title, text: "Conținut demo pentru această activitate. Conectați baza de date pentru a vedea conținutul real." }] },
        talantsReward: activity.talantsReward,
        estimatedMins: activity.estimatedMins,
        questions: activity.type === "quiz" ? DEMO_QUIZ_QUESTIONS.slice(0, 3) : [],
        themeTitle: activity.themeTitle,
        themeId: activity.themeId,
      }}
      childId={session.childId}
      alreadyCompleted={activity.completed}
    />
  );
}
