import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MapView from "@/components/child/MapView";

export default async function HartaPage() {
  const session = await getChildSession();
  if (!session) return null;

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    include: {
      group: {
        include: {
          themes: {
            where: { isActive: true },
            include: {
              theme: {
                include: {
                  activities: {
                    orderBy: { orderIndex: "asc" },
                  },
                },
              },
            },
          },
        },
      },
      activityEvents: {
        select: { activityId: true },
      },
    },
  });

  if (!child) return null;

  const completedActivityIds = new Set(
    child.activityEvents.map((e) => e.activityId)
  );

  const activeThemes = child.group.themes.map((gt) => ({
    ...gt.theme,
    activities: gt.theme.activities.map((a) => ({
      ...a,
      completed: completedActivityIds.has(a.id),
    })),
  }));

  // Verificăm dacă e duminică pentru evanghelie
  const today = new Date();
  const isSunday = today.getDay() === 0;

  const gospelToday = isSunday
    ? await prisma.gospelSchedule.findFirst({
        where: {
          isActive: true,
          date: {
            gte: new Date(today.setHours(0, 0, 0, 0)),
            lt: new Date(today.setHours(23, 59, 59, 999)),
          },
        },
        include: { gospel: { select: { id: true, title: true } } },
      })
    : null;

  return (
    <MapView
      child={{
        id: child.id,
        displayName: child.displayName,
        talantsBalance: child.talantsBalance,
        avatarConfig: child.avatarConfig as Record<string, unknown>,
      }}
      activeThemes={activeThemes}
      gospelToday={
        gospelToday
          ? { id: gospelToday.gospel.id, title: gospelToday.gospel.title }
          : null
      }
    />
  );
}
