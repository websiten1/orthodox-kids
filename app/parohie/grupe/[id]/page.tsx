import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import GroupManagement from "@/components/parish/GroupManagement";

export default async function GrupaDetalii({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getParishSession();
  if (!session) return null;

  const group = await prisma.group.findFirst({
    where: { id, parishId: session.parishId },
    include: {
      teams: {
        include: {
          children: {
            include: {
              activityEvents: {
                orderBy: { completedAt: "desc" },
                take: 1,
              },
            },
          },
        },
      },
      children: {
        include: {
          team: { select: { name: true } },
          activityEvents: {
            select: { id: true, completedAt: true, talantsEarned: true },
            orderBy: { completedAt: "desc" },
          },
        },
        orderBy: { talantsBalance: "desc" },
      },
      themes: {
        where: { isActive: true },
        include: { theme: { select: { title: true } } },
      },
    },
  });

  if (!group) return notFound();

  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const childrenWithStatus = group.children.map((child) => {
    const lastActivity = child.activityEvents[0];
    const isInactive =
      !lastActivity || new Date(lastActivity.completedAt) < twoWeeksAgo;
    return {
      ...child,
      totalActivities: child.activityEvents.length,
      lastActivityDate: lastActivity?.completedAt ?? null,
      isInactive,
    };
  });

  return (
    <div className="p-4 lg:p-8 max-w-4xl space-y-6">
      <div>
        <Link href="/parohie/dashboard" className="text-sm text-gray-400 font-sans hover:text-gray-600">
          ← Dashboard
        </Link>
        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-gray-500 font-sans text-sm">
              Clasele {group.ageRange} · Cod:{" "}
              <span className="font-mono font-bold text-albastru text-base">
                {group.inviteCode}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(group.inviteCode)}
            className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg font-sans text-gray-600 hover:bg-gray-50"
          >
            📋 Copiază codul
          </button>
        </div>
      </div>

      {/* Echipe */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {group.teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <p className="font-bold text-gray-800 text-sm">{team.name}</p>
            <p className="text-2xl font-bold text-albastru mt-1">
              {team.children.length}
            </p>
            <p className="text-xs text-gray-400 font-sans">membri</p>
          </div>
        ))}
      </div>

      <GroupManagement
        group={{
          id: group.id,
          name: group.name,
          teams: group.teams.map((t) => ({ id: t.id, name: t.name })),
        }}
        children={childrenWithStatus.map((c) => ({
          id: c.id,
          displayName: c.displayName,
          talantsBalance: c.talantsBalance,
          teamId: c.teamId,
          teamName: c.team?.name ?? null,
          totalActivities: c.totalActivities,
          lastActivityDate: c.lastActivityDate
            ? c.lastActivityDate.toISOString()
            : null,
          isInactive: c.isInactive,
        }))}
      />
    </div>
  );
}
