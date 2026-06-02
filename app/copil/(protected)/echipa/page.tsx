import { getChildSession } from "@/lib/auth";
import Link from "next/link";

const MY_TEAM = { id: "t1", name: "Apostolii" };
const MEMBERS = [
  { id: "c1", displayName: "Andrei M.", talantsBalance: 145, activities: 12, isMe: true, avatarBg: "#54C2F0" },
  { id: "c2", displayName: "Maria P.", talantsBalance: 132, activities: 11, isMe: false, avatarBg: "#FF6FB0" },
  { id: "c7", displayName: "Mihai C.", talantsBalance: 110, activities: 9, isMe: false, avatarBg: "#3FD1A8" },
];
const TEAMS = [
  { id: "t1", name: "Apostolii", talants: 487, activities: 32, color: "#FFC23D" },
  { id: "t2", name: "Îngerii", talants: 354, activities: 24, color: "#54C2F0" },
];

export default async function EchipaPage() {
  const session = await getChildSession();
  if (!session) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #A43234, #C94040)", padding: "52px 16px 24px" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 4px" }}>
          Echipa {MY_TEAM.name}
        </p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", fontWeight: 600, margin: 0 }}>
          3 membri · Blazon nivel 2
        </p>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Play CTA */}
        <Link href="/copil/joc-echipa/turn" style={{ textDecoration: "none" }}>
          <div style={{
            background: "linear-gradient(135deg, #1B3A6B, #2A5499)",
            borderRadius: 24, padding: "20px 18px",
            boxShadow: "0 8px 0 #122754, 0 16px 28px -8px rgba(27,58,107,.5)",
          }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700, color: "#FFC23D", margin: "0 0 6px" }}>
              Turnul Credinței
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", fontWeight: 600, margin: "0 0 14px" }}>
              Concurați cu altă echipă! Răspundeți corect și construiți turnul.
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFC23D", borderRadius: 999,
              padding: "10px 20px",
              fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A",
              boxShadow: "0 4px 0 #C8820A",
            }}>
              Joacă acum
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#403A4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </Link>

        {/* Members */}
        <div style={{ background: "white", borderRadius: 24, border: "1.5px solid #EFEBF5", overflow: "hidden", boxShadow: "0 4px 14px -8px rgba(120,80,160,.15)" }}>
          <div style={{ padding: "14px 18px 10px", borderBottom: "1.5px solid #EFEBF5" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: 0 }}>Membrii echipei</p>
          </div>
          {MEMBERS.map((m, idx) => (
            <div key={m.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 18px",
              background: m.isMe ? "#FFF9EE" : "white",
              borderBottom: idx < MEMBERS.length - 1 ? "1px solid #EFEBF5" : "none",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 13, flexShrink: 0,
                background: m.avatarBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
                boxShadow: idx === 0 ? `0 3px 0 ${m.avatarBg}88` : "none",
              }}>
                {idx === 0 ? "🏆" : "🧒"}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: "0 0 2px" }}>
                  {m.displayName}
                  {m.isMe && (
                    <span style={{
                      marginLeft: 8, fontFamily: "'Nunito', sans-serif",
                      fontSize: 11, fontWeight: 700, background: "#FFF4D6",
                      borderRadius: 999, padding: "2px 8px", color: "#EFA014",
                    }}>eu</span>
                  )}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: 0 }}>
                  {m.activities} activități completate
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC23D">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 700, color: "#403A4A" }}>{m.talantsBalance}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div>
          <div className="section-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            Clasament echipe
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TEAMS.map((team, i) => (
              <div key={team.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: team.id === MY_TEAM.id ? "#FFF9EE" : "white",
                borderRadius: 20, padding: "14px 16px",
                border: team.id === MY_TEAM.id ? "2px solid #FFC23D" : "1.5px solid #EFEBF5",
                boxShadow: "0 4px 14px -8px rgba(120,80,160,.12)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(145deg, ${team.color}, ${team.color}CC)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fredoka', sans-serif", fontSize: 18, fontWeight: 700, color: "white",
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: "0 0 2px" }}>
                    {team.name}
                    {team.id === MY_TEAM.id && (
                      <span style={{ marginLeft: 8, fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, color: "#EFA014" }}>← noi</span>
                    )}
                  </p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: 0 }}>
                    {team.activities} activități
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC23D">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A" }}>{team.talants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
