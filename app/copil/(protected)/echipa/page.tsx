import { getChildSession } from "@/lib/auth";
import Link from "next/link";

const MY_TEAM = { id: "t1", name: "Apostolii" };
const OPPONENT_TEAM = { id: "t2", name: "Îngerii" };
const MEMBERS = [
  { id: "c1", displayName: "Andrei M.", talantsBalance: 145, activities: 12, isMe: true },
  { id: "c2", displayName: "Maria P.", talantsBalance: 132, activities: 11, isMe: false },
  { id: "c7", displayName: "Mihai C.", talantsBalance: 110, activities: 9, isMe: false },
];
const TEAMS = [
  { id: "t1", name: "Apostolii", totalTalants: 487, totalActivities: 32 },
  { id: "t2", name: "Îngerii", totalTalants: 354, totalActivities: 24 },
];

export default async function EchipaPage() {
  const session = await getChildSession();
  if (!session) return null;

  return (
    <div className="min-h-screen bg-crem">
      <header className="bg-rosu text-white px-4 py-5">
        <h1 className="text-2xl font-bold">Echipa {MY_TEAM.name}</h1>
        <p className="text-sm opacity-80 font-sans mt-1">3 membri · Blazon nivel 2</p>
      </header>
      <div className="px-4 py-5 space-y-5">
        <div className="bg-gradient-to-br from-albastru to-albastru-deschis text-white rounded-2xl p-5 shadow-lg">
          <h2 className="text-xl font-bold mb-1">🏰 Turnul Credinței</h2>
          <p className="text-sm opacity-80 font-sans mb-4">Concurați cu altă echipă! Răspundeți corect și construiți turnul.</p>
          <Link href="/copil/joc-echipa/turn"
            className="block w-full text-center py-3 bg-white text-albastru font-bold rounded-xl font-sans hover:bg-crem active:scale-95 transition-all">
            Joacă acum →
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-crem-inchis">
          <h3 className="font-bold text-maro mb-3">👥 Membrii echipei</h3>
          <div className="space-y-3">
            {MEMBERS.map((m, idx) => (
              <div key={m.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${m.isMe ? "bg-auriu bg-opacity-10 border border-auriu border-opacity-30" : ""}`}>
                <span className="text-2xl">{idx === 0 ? "🏆" : "👦"}</span>
                <div className="flex-1">
                  <p className="font-semibold text-maro text-sm">{m.displayName}{m.isMe && <span className="ml-1 text-xs text-auriu">(eu)</span>}</p>
                  <p className="text-xs text-maro opacity-60 font-sans">{m.activities} activități</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-auriu"><span>🪙</span><span>{m.talantsBalance}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-crem-inchis">
          <h3 className="font-bold text-maro mb-3">🏆 Clasament echipe</h3>
          <div className="space-y-3">
            {TEAMS.map((team, idx) => (
              <div key={team.id} className={`flex items-center gap-3 p-3 rounded-xl ${team.id === MY_TEAM.id ? "bg-auriu bg-opacity-10 border-2 border-auriu" : "bg-crem"}`}>
                <span className="text-2xl">{idx === 0 ? "🥇" : "🥈"}</span>
                <div className="flex-1">
                  <p className="font-bold text-maro text-sm">{team.name}{team.id === MY_TEAM.id && <span className="ml-1 text-xs text-auriu">← noi</span>}</p>
                  <p className="text-xs text-maro opacity-60 font-sans">{team.totalActivities} activități</p>
                </div>
                <p className="font-bold text-auriu text-sm">🪙 {team.totalTalants}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
