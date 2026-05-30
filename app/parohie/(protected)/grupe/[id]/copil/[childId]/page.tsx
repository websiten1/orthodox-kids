import { getParishSession } from "@/lib/auth";
import { DEMO_CHILDREN } from "@/lib/demo-data";
import { notFound } from "next/navigation";
import Link from "next/link";

const ACTIVITY_HISTORY = [
  { id: "e1", title: "Ce este Biserica? — Lecție", completedAt: "15 mai", score: 100, talantsEarned: 7 },
  { id: "e2", title: "Ce este Biserica? — Joc", completedAt: "15 mai", score: 85, talantsEarned: 9 },
  { id: "e3", title: "Sfânta Cruce — Lecție", completedAt: "22 mai", score: 100, talantsEarned: 7 },
];

export default async function CopilDetalii({ params }: { params: Promise<{ id: string; childId: string }> }) {
  const { id, childId } = await params;
  const session = await getParishSession();
  if (!session) return null;
  const child = DEMO_CHILDREN.find(c => c.id === childId);
  if (!child) return notFound();

  return (
    <div className="p-4 lg:p-8 max-w-2xl space-y-5 lg:pt-8 pt-4">
      <div>
        <Link href={`/parohie/grupe/${id}`} className="text-sm text-gray-400 font-sans hover:text-gray-600">← Înapoi la grupă</Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{child.displayName}</h1>
        <p className="text-gray-500 font-sans text-sm">Echipa: {child.teamName} · Talanți: {child.talantsBalance}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{child.totalActivities}</div>
          <div className="text-xs text-gray-500 font-sans mt-1">Activități</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-xs text-gray-500 font-sans mt-1">Sfinți</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-xs text-gray-500 font-sans mt-1">Min/sesiune</div>
        </div>
      </div>
      {child.isInactive && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-2 font-sans">💡 Sugestie pentru discuția fizică</h3>
          <p className="text-sm text-amber-700 font-sans">Discută cu {child.displayName} — nu a mai fost activ de 2 săptămâni. Poate are nevoie de încurajare.</p>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Activități completate</h3></div>
        <div className="divide-y divide-gray-50">
          {ACTIVITY_HISTORY.map(ev => (
            <div key={ev.id} className="px-5 py-3 flex items-center gap-3">
              <span className="text-sm">✅</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 font-sans">{ev.title}</p>
                <p className="text-xs text-gray-400 font-sans">{ev.completedAt} · Scor: {ev.score}%</p>
              </div>
              <span className="text-sm font-bold text-auriu font-sans">+{ev.talantsEarned}🪙</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
