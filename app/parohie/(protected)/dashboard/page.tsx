import { getParishSession } from "@/lib/auth";
import { DEMO_GROUPS, DEMO_CHILDREN } from "@/lib/demo-data";
import Link from "next/link";

const RECENT_ACTIVITY = [
  { name: "Andrei M.", activity: "Ce este Biserica? — Lecție" },
  { name: "Maria P.", activity: "Sfânta Cruce — Joc" },
  { name: "Ionuț D.", activity: "Ce este Biserica? — Potrivire" },
  { name: "Elena V.", activity: "Ce este Biserica? — Lecție" },
  { name: "Mihai C.", activity: "Rugăciunea — Lecție" },
];

export default async function ParohieDashboard() {
  const session = await getParishSession();
  if (!session) return null;
  const inactive = DEMO_CHILDREN.filter((c) => c.isInactive);

  return (
    <div className="p-4 lg:p-8 max-w-5xl space-y-6 lg:pt-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bună ziua!</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">{session.name}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Copii înscriși" value={DEMO_CHILDREN.length} icon="👦" />
        <StatCard label="Activi săptămâna aceasta" value={DEMO_CHILDREN.filter(c=>!c.isInactive).length} icon="✅" sub={`din ${DEMO_CHILDREN.length}`} />
        <StatCard label="Grupe active" value={DEMO_GROUPS.length} icon="📚" />
        <StatCard label="Activități săptămâna aceasta" value={5} icon="🎯" />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">📍 Activitate recentă</h2>
          <div className="space-y-2.5">
            {RECENT_ACTIVITY.map((ev, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm">
                <span>✦</span>
                <div>
                  <span className="font-semibold text-gray-700 font-sans">{ev.name}</span>
                  <span className="text-gray-400 font-sans"> a completat </span>
                  <span className="text-gray-600 font-sans">{ev.activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">💛 Copii care au nevoie de atenție</h2>
          <div className="space-y-2">
            {inactive.map((child) => (
              <div key={child.id} className="flex items-center gap-3 p-2.5 bg-amber-50 rounded-xl">
                <span className="text-lg">👦</span>
                <div>
                  <p className="font-semibold text-sm text-gray-700 font-sans">{child.displayName}</p>
                  <p className="text-xs text-gray-400 font-sans">Inactiv de 2+ săptămâni</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Grupele mele</h2>
          <Link href="/parohie/grupe/nou" className="text-sm font-sans font-semibold text-albastru hover:underline">+ Grupă nouă</Link>
        </div>
        <div className="space-y-3">
          {DEMO_GROUPS.map((group) => (
            <Link key={group.id} href={`/parohie/grupe/${group.id}`}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
              <div>
                <p className="font-semibold text-gray-800">{group.name}</p>
                <p className="text-sm text-gray-400 font-sans">Clasele {group.ageRange} · Cod: <span className="font-mono font-bold text-albastru">{group.inviteCode}</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-700 font-sans">{group.children} copii</p>
                <p className="text-xs text-gray-400 font-sans">{group.teams.length} echipe</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-auriu to-auriu-deschis text-white rounded-2xl p-5 shadow-md">
        <h2 className="font-bold mb-1">🏆 Echipa de top a săptămânii</h2>
        <p className="text-2xl font-bold">Apostolii</p>
        <p className="text-sm opacity-80 font-sans">487 talanți totali</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, sub }: { label: string; value: number; icon: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 font-sans mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 font-sans">{sub}</div>}
    </div>
  );
}
