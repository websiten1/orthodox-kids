import { getParishSession } from "@/lib/auth";
import { DEMO_THEMES, DEMO_GROUPS } from "@/lib/demo-data";
import ThemeLibrary from "@/components/parish/ThemeLibrary";

export default async function TemePage() {
  const session = await getParishSession();
  if (!session) return null;
  const themes = DEMO_THEMES.map(t => ({
    id: t.id, title: t.title, weekNumber: t.weekNumber,
    description: t.description, mapLocation: t.mapLocation,
    iconEmoji: t.iconEmoji, ageRange: "all",
    activityCount: t.activities.length,
    totalMins: t.activities.reduce((s, a) => s + a.estimatedMins, 0),
    totalTalants: t.activities.reduce((s, a) => s + a.talantsReward, 0),
    activeInGroups: [DEMO_GROUPS[0].id],
  }));
  const groups = DEMO_GROUPS.map(g => ({ id: g.id, name: g.name, ageRange: g.ageRange }));
  return <ThemeLibrary themes={themes} groups={groups} />;
}
