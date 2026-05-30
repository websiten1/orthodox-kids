import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ParohieDashboard() {
  const session = await getParishSession();
  if (!session) return null;

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const parish = await prisma.parish.findUnique({
    where: { id: session.parishId },
    include: {
      groups: {
        include: {
          children: {
            include: {
              activityEvents: {
                where: { completedAt: { gte: weekAgo } },
                select: { id: true, completedAt: true },
              },
            },
          },
          teams: {
            include: {
              children: { select: { talantsBalance: true } },
            },
            orderBy: { blazonLevel: "desc" },
          },
        },
      },
    },
  });

  if (!parish) return null;

  const totalChildren = parish.groups.reduce(
    (sum, g) => sum + g.children.length,
    0
  );

  const activeThisWeek = parish.groups
    .flatMap((g) => g.children)
    .filter((c) => c.activityEvents.length > 0).length;

  const recentActivity = await prisma.activityEvent.findMany({
    where: {
      child: { group: { parishId: session.parishId } },
      completedAt: { gte: weekAgo },
    },
    include: {
      child: { select: { displayName: true } },
      activity: { select: { title: true } },
    },
    orderBy: { completedAt: "desc" },
    take: 10,
  });

  // Top echipă
  const topTeam = parish.groups
    .flatMap((g) => g.teams)
    .sort(
      (a, b) =>
        b.children.reduce((s, c) => s + c.talantsBalance, 0) -
        a.children.reduce((s, c) => s + c.talantsBalance, 0)
    )[0];

  // Copii inactivi (fără activitate în 2 săptămâni)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const inactiveChildren = parish.groups
    .flatMap((g) =>
      g.children.filter((c) => {
        const lastActivity = c.activityEvents[c.activityEvents.length - 1];
        return (
          !lastActivity ||
          new Date(lastActivity.completedAt) < twoWeeksAgo
        );
      })
    )
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-8 max-w-5xl space-y-6 lg:pt-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bună ziua!</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">
          {parish.name} · {parish.city}
        </p>
      </div>

      {/* KPI-uri */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Copii înscriși" value={totalChildren} icon="👦" />
        <StatCard
          label="Activi săptămâna aceasta"
          value={activeThisWeek}
          icon="✅"
          sub={`din ${totalChildren}`}
        />
        <StatCard
          label="Grupe active"
          value={parish.groups.length}
          icon="📚"
        />
        <StatCard
          label="Activități săptămâna aceasta"
          value={recentActivity.length}
          icon="🎯"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Activitate recentă */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📍</span> Activitate recentă
          </h2>
          {recentActivity.length === 0 ? (
            <p className="text-gray-400 text-sm font-sans">
              Nicio activitate în ultimele 7 zile.
            </p>
          ) : (
            <div className="space-y-2.5">
              {recentActivity.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <span className="text-base">✦</span>
                  <div>
                    <span className="font-semibold text-gray-700 font-sans">
                      {event.child.displayName}
                    </span>
                    <span className="text-gray-400 font-sans">
                      {" "}
                      a completat{" "}
                    </span>
                    <span className="text-gray-600 font-sans">
                      {event.activity.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Copii inactivi */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💛</span> Copii care au nevoie de atenție
          </h2>
          {inactiveChildren.length === 0 ? (
            <p className="text-gray-400 text-sm font-sans">
              Toți copiii au fost activi recent. Excelent!
            </p>
          ) : (
            <div className="space-y-2">
              {inactiveChildren.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center gap-3 p-2.5 bg-amber-50 rounded-xl"
                >
                  <span className="text-lg">👦</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-700 font-sans">
                      {child.displayName}
                    </p>
                    <p className="text-xs text-gray-400 font-sans">
                      Inactiv de 2+ săptămâni
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grupe */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Grupele mele</h2>
          <Link
            href="/parohie/grupe/nou"
            className="text-sm font-sans font-semibold text-albastru hover:underline"
          >
            + Grupă nouă
          </Link>
        </div>

        {parish.groups.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-500 font-sans mb-4">
              Nu aveți nicio grupă. Creați prima grupă!
            </p>
            <Link
              href="/parohie/grupe/nou"
              className="inline-block px-5 py-2.5 bg-albastru text-white rounded-xl font-sans font-semibold"
            >
              Creare grupă
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {parish.groups.map((group) => {
              const active = group.children.filter(
                (c) => c.activityEvents.length > 0
              ).length;
              const topGroupTeam = group.teams.sort(
                (a, b) =>
                  b.children.reduce((s, c) => s + c.talantsBalance, 0) -
                  a.children.reduce((s, c) => s + c.talantsBalance, 0)
              )[0];

              return (
                <Link
                  key={group.id}
                  href={`/parohie/grupe/${group.id}`}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{group.name}</p>
                    <p className="text-sm text-gray-400 font-sans">
                      Clasele {group.ageRange} · Cod:{" "}
                      <span className="font-mono font-bold text-albastru">
                        {group.inviteCode}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-700 font-sans">
                      {group.children.length} copii
                    </p>
                    <p className="text-xs text-gray-400 font-sans">
                      {active} activi
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Top echipă */}
      {topTeam && (
        <div className="bg-gradient-to-br from-auriu to-auriu-deschis text-white rounded-2xl p-5 shadow-md">
          <h2 className="font-bold mb-1">🏆 Echipa de top a săptămânii</h2>
          <p className="text-2xl font-bold">{topTeam.name}</p>
          <p className="text-sm opacity-80 font-sans">
            {topTeam.children.reduce((s, c) => s + c.talantsBalance, 0)} talanți totali
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  sub,
}: {
  label: string;
  value: number;
  icon: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 font-sans mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 font-sans">{sub}</div>}
    </div>
  );
}
