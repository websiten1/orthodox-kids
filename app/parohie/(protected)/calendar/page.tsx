import { getParishSession } from "@/lib/auth";
import { DEMO_THEMES, DEMO_GROUPS } from "@/lib/demo-data";

export default async function CalendarPage() {
  const session = await getParishSession();
  if (!session) return null;
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i * 7);
    return { index: i + 1, label: d.toLocaleDateString("ro-RO", { day: "numeric", month: "long" }) };
  });
  return (
    <div className="p-4 lg:p-8 max-w-4xl space-y-6 lg:pt-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">Planificarea temelor pe săptămâni.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-semibold w-32">Săptămâna</th>
                {DEMO_GROUPS.map(g => <th key={g.id} className="text-left px-4 py-3 text-gray-500 font-semibold">{g.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {weeks.map((week) => (
                <tr key={week.index} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-500">
                    <div className="font-semibold text-gray-700">Săpt. {week.index}</div>
                    <div className="text-xs text-gray-400">{week.label}</div>
                  </td>
                  {DEMO_GROUPS.map(group => (
                    <td key={group.id} className="px-4 py-3">
                      {week.index <= DEMO_THEMES.length ? (
                        <div className="flex items-center gap-1.5">
                          <span>{DEMO_THEMES[week.index-1]?.iconEmoji}</span>
                          <span className="text-gray-700 font-medium text-xs">{DEMO_THEMES[week.index-1]?.title}</span>
                        </div>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
