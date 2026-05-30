import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CalendarPage() {
  const session = await getParishSession();
  if (!session) return null;

  const groups = await prisma.group.findMany({
    where: { parishId: session.parishId },
    include: {
      themes: {
        include: {
          theme: {
            select: {
              title: true,
              weekNumber: true,
              iconEmoji: true,
            },
          },
        },
        where: { isActive: true },
        orderBy: { startDate: "asc" },
      },
    },
  });

  // Generăm săptămânile următoarele 12 săptămâni
  const today = new Date();
  const weeks = Array.from({ length: 12 }, (_, i) => {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + i * 7 - today.getDay() + 1);
    return {
      index: i + 1,
      label: weekStart.toLocaleDateString("ro-RO", { day: "numeric", month: "long" }),
      date: weekStart,
    };
  });

  return (
    <div className="p-4 lg:p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">
          Planificarea temelor pe săptămâni pentru fiecare grupă.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-semibold w-32">
                  Săptămâna
                </th>
                {groups.map((g) => (
                  <th key={g.id} className="text-left px-4 py-3 text-gray-500 font-semibold">
                    {g.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {weeks.map((week) => (
                <tr key={week.index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-500">
                    <div className="font-semibold text-gray-700">Săpt. {week.index}</div>
                    <div className="text-xs text-gray-400">{week.label}</div>
                  </td>
                  {groups.map((group) => {
                    const activeTheme = group.themes[0];
                    return (
                      <td key={group.id} className="px-4 py-3">
                        {week.index === 1 && activeTheme ? (
                          <div className="flex items-center gap-1.5">
                            <span>{activeTheme.theme.iconEmoji}</span>
                            <span className="text-gray-700 font-medium">
                              {activeTheme.theme.title}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
        <p className="text-sm text-amber-700 font-sans">
          <strong>💡 Sfat:</strong> Activați temele din secțiunea{" "}
          <a href="/parohie/teme" className="underline">
            Teme & Activități
          </a>{" "}
          pentru a le vedea în calendar.
        </p>
      </div>
    </div>
  );
}
