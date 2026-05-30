import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ThemeLibrary from "@/components/parish/ThemeLibrary";

export default async function TemePage() {
  const session = await getParishSession();
  if (!session) return null;

  const [allThemes, groups] = await Promise.all([
    prisma.theme.findMany({
      where: { isPublished: true },
      include: {
        activities: { select: { id: true, type: true, estimatedMins: true, talantsReward: true } },
        groupThemes: {
          where: { group: { parishId: session.parishId } },
          select: { groupId: true, isActive: true },
        },
      },
      orderBy: { weekNumber: "asc" },
    }),
    prisma.group.findMany({
      where: { parishId: session.parishId },
      select: { id: true, name: true, ageRange: true },
    }),
  ]);

  return (
    <ThemeLibrary
      themes={allThemes.map((t) => ({
        id: t.id,
        title: t.title,
        weekNumber: t.weekNumber,
        description: t.description,
        mapLocation: t.mapLocation,
        iconEmoji: t.iconEmoji,
        ageRange: t.ageRange,
        activityCount: t.activities.length,
        totalMins: t.activities.reduce((s, a) => s + a.estimatedMins, 0),
        totalTalants: t.activities.reduce((s, a) => s + a.talantsReward, 0),
        activeInGroups: t.groupThemes
          .filter((gt) => gt.isActive)
          .map((gt) => gt.groupId),
      }))}
      groups={groups}
    />
  );
}
