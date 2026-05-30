import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CopilDetalii({
  params,
}: {
  params: Promise<{ id: string; childId: string }>;
}) {
  const { id, childId } = await params;
  const session = await getParishSession();
  if (!session) return null;

  const child = await prisma.child.findFirst({
    where: {
      id: childId,
      group: { id, parishId: session.parishId },
    },
    include: {
      team: { select: { name: true } },
      activityEvents: {
        include: {
          activity: { select: { title: true, type: true, talantsReward: true } },
        },
        orderBy: { completedAt: "desc" },
      },
      saintCards: { include: { saintCard: { select: { name: true } } } },
      iconProgress: true,
    },
  });

  if (!child) return notFound();

  // Analiză greșeli repetate
  const wrongAnswers: Record<string, number> = {};
  for (const event of child.activityEvents) {
    const log = event.answersLog as { q: string; correct: boolean }[];
    if (Array.isArray(log)) {
      for (const entry of log) {
        if (!entry.correct) {
          wrongAnswers[entry.q] = (wrongAnswers[entry.q] ?? 0) + 1;
        }
      }
    }
  }

  const topMistakes = Object.entries(wrongAnswers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const avgTimePerSession =
    child.activityEvents.length > 0
      ? Math.round(
          child.activityEvents.reduce((s, e) => s + e.timeSpentSecs, 0) /
            child.activityEvents.length /
            60
        )
      : 0;

  return (
    <div className="p-4 lg:p-8 max-w-2xl space-y-5">
      <div>
        <Link href={`/parohie/grupe/${id}`} className="text-sm text-gray-400 font-sans hover:text-gray-600">
          ← Înapoi la grupă
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          {child.displayName}
        </h1>
        <p className="text-gray-500 font-sans text-sm">
          Echipa: {child.team?.name ?? "Fără echipă"} · Talanți:{" "}
          {child.talantsBalance}
        </p>
      </div>

      {/* Statistici */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Activități" value={child.activityEvents.length} />
        <StatCard label="Sfinți colectați" value={child.saintCards.length} />
        <StatCard label="Min/sesiune" value={avgTimePerSession} />
      </div>

      {/* Greșeli repetate */}
      {topMistakes.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3 font-sans">
            💡 Sugestie pentru discuția fizică
          </h3>
          <p className="text-sm text-amber-700 font-sans mb-3">
            {child.displayName} a greșit repetat la:
          </p>
          <div className="space-y-2">
            {topMistakes.map(([question, count]) => (
              <div
                key={question}
                className="flex items-start gap-2 bg-white rounded-xl p-2.5"
              >
                <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
                <div>
                  <p className="text-sm text-gray-700 font-sans">{question}</p>
                  <p className="text-xs text-gray-400 font-sans">
                    {count}× greșit
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Icoana personală */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">🖼️ Icoana personală</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-20 rounded-xl border-2 border-auriu bg-crem flex items-center justify-center">
            <span className="text-2xl opacity-30">✦</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm font-sans mb-1">
              <span className="text-gray-600">Progres icoană</span>
              <span className="font-bold text-auriu">
                {child.iconProgress
                  ? Math.round(
                      (child.iconProgress.completedLayers /
                        child.iconProgress.totalLayers) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-auriu rounded-full"
                style={{
                  width: `${
                    child.iconProgress
                      ? (child.iconProgress.completedLayers /
                          child.iconProgress.totalLayers) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Istoricul activităților */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Activități completate</h3>
        </div>
        {child.activityEvents.length === 0 ? (
          <p className="text-center py-8 text-gray-400 font-sans text-sm">
            Nicio activitate completată încă.
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {child.activityEvents.map((event) => (
              <div key={event.id} className="px-5 py-3 flex items-center gap-3">
                <span className="text-sm">✅</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 font-sans">
                    {event.activity.title}
                  </p>
                  <p className="text-xs text-gray-400 font-sans">
                    {new Date(event.completedAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "long",
                    })}
                    {" · "}
                    Scor: {event.score}%
                  </p>
                </div>
                <span className="text-sm font-bold text-auriu font-sans">
                  +{event.talantsEarned}🪙
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 font-sans mt-1">{label}</div>
    </div>
  );
}
