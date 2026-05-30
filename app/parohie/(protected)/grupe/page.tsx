import { getParishSession } from "@/lib/auth";
import { DEMO_GROUPS } from "@/lib/demo-data";
import Link from "next/link";

export default async function GrupePage() {
  const session = await getParishSession();
  if (!session) return null;
  return (
    <div className="p-4 lg:p-8 max-w-3xl space-y-5 lg:pt-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grupe</h1>
        <Link href="/parohie/grupe/nou" className="px-4 py-2 bg-albastru text-white rounded-xl font-sans font-semibold text-sm hover:bg-albastru-deschis transition-all">
          + Grupă nouă
        </Link>
      </div>
      <div className="space-y-3">
        {DEMO_GROUPS.map((group) => (
          <Link key={group.id} href={`/parohie/grupe/${group.id}`}
            className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800 text-lg">{group.name}</h2>
                <p className="text-sm text-gray-400 font-sans mt-0.5">
                  Clasele {group.ageRange} · Cod: <span className="font-mono font-bold text-albastru text-base">{group.inviteCode}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-700">{group.children} copii</p>
                <p className="text-xs text-gray-400 font-sans">{group.teams.length} echipe</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {group.teams.map((team) => (
                <span key={team.id} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-sans">{team.name}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
