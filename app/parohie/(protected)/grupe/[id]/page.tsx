import { getParishSession } from "@/lib/auth";
import { DEMO_GROUPS, DEMO_CHILDREN } from "@/lib/demo-data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function GrupaDetalii({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getParishSession();
  if (!session) return null;
  const group = DEMO_GROUPS.find(g => g.id === id);
  if (!group) return notFound();

  return (
    <div className="p-4 lg:p-8 max-w-4xl space-y-6 lg:pt-8 pt-4">
      <div>
        <Link href="/parohie/grupe" className="text-sm text-gray-400 font-sans hover:text-gray-600">← Înapoi la grupe</Link>
        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-gray-500 font-sans text-sm">Clasele {group.ageRange} · Cod: <span className="font-mono font-bold text-albastru text-base">{group.inviteCode}</span></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {group.teams.map(team => (
          <div key={team.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="font-bold text-gray-800 text-sm">{team.name}</p>
            <p className="text-2xl font-bold text-albastru mt-1">{team.children}</p>
            <p className="text-xs text-gray-400 font-sans">membri</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Copii ({DEMO_CHILDREN.length})</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {DEMO_CHILDREN.map(child => (
            <div key={child.id} className={`px-5 py-3.5 flex items-center gap-4 ${child.isInactive ? "bg-amber-50" : ""}`}>
              <div className="text-xl">{child.isInactive ? "💛" : "👦"}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">
                  {child.displayName}
                  {child.isInactive && <span className="ml-2 text-xs text-amber-600 font-sans">inactiv</span>}
                </p>
                <p className="text-xs text-gray-400 font-sans">
                  <span className="text-albastru font-semibold">{child.teamName}</span> · {child.totalActivities} activități
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-auriu">🪙 {child.talantsBalance}</p>
              </div>
              <Link href={`/parohie/grupe/${group.id}/copil/${child.id}`} className="text-xs text-albastru hover:underline font-sans shrink-0">Detalii</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
