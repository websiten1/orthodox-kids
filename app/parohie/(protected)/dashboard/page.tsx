import { getParishSession } from "@/lib/auth";
import { DEMO_GROUPS, DEMO_CHILDREN } from "@/lib/demo-data";
import Link from "next/link";

const RECENT = [
  { name: "Andrei M.", activity: "Ce este Biserica? — Lecție", time: "acum 5 min" },
  { name: "Maria P.", activity: "Sfânta Cruce — Joc", time: "acum 12 min" },
  { name: "Ionuț D.", activity: "Ce este Biserica? — Potrivire", time: "acum 1h" },
  { name: "Elena V.", activity: "Ce este Biserica? — Lecție", time: "acum 2h" },
  { name: "Mihai C.", activity: "Rugăciunea — Lecție", time: "ieri" },
];

function StatCard({ icon, label, value, sub, color }: { icon: string; label: string; value: number | string; sub?: string; color: string }) {
  return (
    <div style={{ background: "white", borderRadius: 20, padding: "18px 16px", border: "1px solid #ECE3D2", boxShadow: "0 2px 12px -4px rgba(164,50,52,.1)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
      </div>
      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 30, fontWeight: 700, color: "#403A4A", margin: "0 0 2px", lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#8A8296", fontWeight: 700, margin: 0 }}>{label}</p>
      {sub && <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#BBB4C6", fontWeight: 600, margin: "2px 0 0" }}>{sub}</p>}
    </div>
  );
}

export default async function ParohieDashboard() {
  const session = await getParishSession();
  if (!session) return null;
  const inactive = DEMO_CHILDREN.filter(c => c.isInactive);
  const active = DEMO_CHILDREN.filter(c => !c.isInactive).length;

  return (
    <div style={{ padding: "24px 20px 40px", maxWidth: 900 }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B58A3C", margin: "0 0 4px" }}>
          CALEA LUMINII
        </p>
        <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 32, fontWeight: 700, color: "#403A4A", margin: "0 0 4px", lineHeight: 1.1 }}>
          Bună ziua!
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8A8296", fontWeight: 600, margin: 0 }}>{session.name}</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard icon="👦" label="Copii înscriși"          value={DEMO_CHILDREN.length}   color="#A43234" />
        <StatCard icon="✅" label="Activi săptămâna aceasta" value={active} sub={`din ${DEMO_CHILDREN.length}`} color="#2E5A47" />
        <StatCard icon="📚" label="Grupe active"            value={DEMO_GROUPS.length}     color="#B58A3C" />
        <StatCard icon="🎯" label="Activități săptămâna aceasta" value={5}                color="#54C2F0" />
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {/* Recent activity */}
        <div style={{ background: "white", borderRadius: 20, border: "1px solid #ECE3D2", overflow: "hidden", boxShadow: "0 2px 12px -4px rgba(164,50,52,.08)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE3D2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 17, fontWeight: 700, color: "#403A4A", margin: 0 }}>Activitate recentă</p>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3FD1A8", boxShadow: "0 0 0 3px rgba(63,209,168,.2)" }} />
          </div>
          {RECENT.map((ev, i) => (
            <div key={i} style={{ padding: "12px 20px", borderBottom: i < RECENT.length - 1 ? "1px solid #F6EEDD" : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B58A3C", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#403A4A" }}>{ev.name}</span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600, color: "#8A8296" }}> a completat </span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#2E5A47" }}>{ev.activity}</span>
              </div>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#BBB4C6", fontWeight: 600, flexShrink: 0 }}>{ev.time}</span>
            </div>
          ))}
        </div>

        {/* Groups */}
        <div style={{ background: "white", borderRadius: 20, border: "1px solid #ECE3D2", overflow: "hidden", boxShadow: "0 2px 12px -4px rgba(164,50,52,.08)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE3D2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 17, fontWeight: 700, color: "#403A4A", margin: 0 }}>Grupele mele</p>
            <Link href="/parohie/grupe/nou" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#A43234", textDecoration: "none" }}>
              + Grupă nouă
            </Link>
          </div>
          {DEMO_GROUPS.map(g => (
            <Link key={g.id} href={`/parohie/grupe/${g.id}`} style={{ textDecoration: "none" }}>
              <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #F6EEDD", transition: "background .15s" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, background: "#A4323418", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A43234" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: "0 0 3px" }}>{g.name}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#8A8296", fontWeight: 600, margin: 0 }}>
                    Clasele {g.ageRange} · Cod: <span style={{ fontFamily: "monospace", fontWeight: 800, color: "#A43234" }}>{g.inviteCode}</span>
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: "0 0 2px" }}>{g.children}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: 0 }}>copii</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BBB4C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Attention needed */}
        {inactive.length > 0 && (
          <div style={{ background: "#FFFBF0", borderRadius: 20, border: "1px solid #ECE3D2", overflow: "hidden", boxShadow: "0 2px 12px -4px rgba(164,50,52,.06)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #F6EEDD" }}>
              <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 17, fontWeight: 700, color: "#403A4A", margin: 0 }}>
                Copii care au nevoie de atenție
              </p>
            </div>
            {inactive.map((child, i) => (
              <div key={child.id} style={{ padding: "12px 20px", borderBottom: i < inactive.length - 1 ? "1px solid #F6EEDD" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: "#FFF4D6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>💛</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#403A4A", margin: "0 0 1px" }}>{child.displayName}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: 0 }}>Inactiv de 2+ săptămâni</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Top team banner */}
        <div style={{
          background: "linear-gradient(135deg, #A43234 0%, #8A2A2C 100%)",
          borderRadius: 20, padding: "20px 22px",
          display: "flex", alignItems: "center", gap: 16,
          boxShadow: "0 6px 0 #6B1A1C, 0 14px 24px -8px rgba(164,50,52,.4)",
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🏆</div>
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", margin: "0 0 3px" }}>Echipa de top a săptămânii</p>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700, color: "white", margin: "0 0 2px" }}>Apostolii</p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "rgba(255,255,255,.65)", fontWeight: 600, margin: 0 }}>487 talanți totali</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC23D">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
