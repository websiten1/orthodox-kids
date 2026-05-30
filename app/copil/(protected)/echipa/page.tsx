import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EchipaPage() {
  const session = await getChildSession();
  if (!session) return null;

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    include: {
      team: {
        include: {
          children: {
            select: {
              id: true,
              displayName: true,
              talantsBalance: true,
              avatarConfig: true,
              activityEvents: { select: { id: true } },
            },
            orderBy: { talantsBalance: "desc" },
          },
          teamEvents: {
            orderBy: { playedAt: "desc" },
            take: 5,
          },
        },
      },
      group: {
        include: {
          teams: {
            include: {
              children: {
                select: { talantsBalance: true, activityEvents: { select: { id: true } } },
              },
            },
            orderBy: { blazonLevel: "desc" },
          },
        },
      },
    },
  });

  if (!child) return null;

  const myTeam = child.team;
  const avatarEmojis = ["👦", "👧", "🧒", "👶", "🙍‍♂️", "🙍‍♀️"];

  // Calculăm scorul total per echipă
  const teamScores = child.group.teams.map((t) => ({
    id: t.id,
    name: t.name,
    blazonLevel: t.blazonLevel,
    totalTalants: t.children.reduce((sum, c) => sum + c.talantsBalance, 0),
    totalActivities: t.children.reduce((sum, c) => sum + c.activityEvents.length, 0),
  }));

  return (
    <div className="min-h-screen bg-crem">
      <header className="bg-rosu text-white px-4 py-5">
        <h1 className="text-2xl font-bold">
          {myTeam ? `Echipa ${myTeam.name}` : "Echipa mea"}
        </h1>
        <p className="text-sm opacity-80 font-sans mt-1">
          {myTeam
            ? `${myTeam.children.length} membri · Blazon nivel ${myTeam.blazonLevel}`
            : "Nu ești în nicio echipă încă."}
        </p>
      </header>

      <div className="px-4 py-5 space-y-5">
        {/* Mini-joc echipă */}
        {myTeam && (
          <div className="bg-gradient-to-br from-albastru to-albastru-deschis text-white rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl font-bold mb-1">🏰 Turnul Credinței</h2>
            <p className="text-sm opacity-80 font-sans mb-4">
              Concurați cu altă echipă! Răspundeți corect și construiți turnul.
            </p>
            <Link
              href="/copil/joc-echipa/turn"
              className="block w-full text-center py-3 bg-white text-albastru font-bold rounded-xl font-sans
                hover:bg-crem active:scale-95 transition-all"
            >
              Joacă acum →
            </Link>
          </div>
        )}

        {/* Membrii echipei */}
        {myTeam && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-crem-inchis">
            <h3 className="font-bold text-maro mb-3">👥 Membrii echipei</h3>
            <div className="space-y-3">
              {myTeam.children.map((member, idx) => {
                const avatarConfig = member.avatarConfig as Record<string, unknown>;
                const emoji = avatarEmojis[(avatarConfig.avatarType as number) ?? 0] ?? "👦";
                const isMe = member.id === child.id;

                return (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl ${
                      isMe ? "bg-auriu bg-opacity-10 border border-auriu border-opacity-30" : ""
                    }`}
                  >
                    <span className="text-2xl">{idx === 0 ? "🏆" : emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-maro text-sm">
                        {member.displayName}
                        {isMe && <span className="ml-1 text-xs text-auriu">(eu)</span>}
                      </p>
                      <p className="text-xs text-maro opacity-60 font-sans">
                        {member.activityEvents.length} activități
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-auriu">
                      <span>🪙</span>
                      <span>{member.talantsBalance}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Clasamentul echipelor */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-crem-inchis">
          <h3 className="font-bold text-maro mb-3">🏆 Clasament echipe</h3>
          <div className="space-y-3">
            {teamScores.map((team, idx) => {
              const isMyTeam = team.id === myTeam?.id;
              const medals = ["🥇", "🥈", "🥉"];
              const medal = medals[idx] ?? `${idx + 1}.`;

              return (
                <div
                  key={team.id}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isMyTeam
                      ? "bg-auriu bg-opacity-10 border-2 border-auriu"
                      : "bg-crem"
                  }`}
                >
                  <span className="text-2xl">{medal}</span>
                  <div className="flex-1">
                    <p className="font-bold text-maro text-sm">
                      {team.name}
                      {isMyTeam && (
                        <span className="ml-1 text-xs text-auriu">← noi</span>
                      )}
                    </p>
                    <p className="text-xs text-maro opacity-60 font-sans">
                      {team.totalActivities} activități
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-auriu text-sm">
                      🪙 {team.totalTalants}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!myTeam && (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-crem-inchis">
            <div className="text-4xl mb-3">🛡️</div>
            <p className="text-maro font-sans">
              Așteptați ca preotul sau profesorul să vă atribuie la o echipă!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
