import { getChildSession } from "@/lib/auth";
import { DEMO_CHILD } from "@/lib/demo-data";
import Link from "next/link";

export default async function ProfilPage() {
  const session = await getChildSession();
  if (!session) return null;
  const { iconProgress, talantsBalance, totalActivities, totalSaints } = DEMO_CHILD;
  const iconPct = Math.round((iconProgress.completedLayers / iconProgress.totalLayers) * 100);
  const lvl = Math.max(1, Math.floor(totalActivities / 5) + 1);

  const STATS = [
    { label: "Talanți", value: talantsBalance, color: "#FFC23D" },
    { label: "Activități", value: totalActivities, color: "#3FD1A8" },
    { label: "Sfinți", value: totalSaints, color: "#A77BF0" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #54C2F0, #2FA3D8)", padding: "52px 16px 24px", textAlign: "center" }}>
        <div style={{
          width: 88, height: 88, borderRadius: 28, margin: "0 auto 12px",
          background: "linear-gradient(145deg, #54C2F0, #1A8CBF)",
          border: "4px solid rgba(255,255,255,.5)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44,
        }}>🧒</div>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 26, fontWeight: 700, color: "white", margin: "0 0 4px" }}>
          {session.displayName}
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 13, fontWeight: 700, background: "#FFC23D", color: "#403A4A", borderRadius: 999, padding: "3px 10px" }}>
            LVL {lvl}
          </span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.8)", fontWeight: 600 }}>
            Echipa Apostolii
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 20, padding: "16px 12px", textAlign: "center", border: "1.5px solid #EFEBF5", boxShadow: "0 4px 14px -8px rgba(120,80,160,.15)" }}>
              <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Icon progress */}
        <div style={{ background: "white", borderRadius: 24, padding: 18, border: "1.5px solid #EFEBF5", boxShadow: "0 4px 14px -8px rgba(120,80,160,.15)" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: "0 0 14px" }}>
            Icoana mea personală
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 64, height: 80, borderRadius: 12, flexShrink: 0,
              background: "linear-gradient(145deg, #FBF6EC, #F6EEDD)",
              border: "2px solid #B58A3C",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B58A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 700 }}>În construcție</span>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 700, color: "#B58A3C" }}>{iconPct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "#F4F1FA", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #B58A3C, #D4AC60)", borderRadius: 999, width: `${iconPct}%`, transition: "width .3s" }} />
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#BBB4C6", fontWeight: 600, marginTop: 4 }}>
                {iconProgress.completedLayers} din {iconProgress.totalLayers} straturi
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { href: "/copil/magazin", label: "Magazin", bg: "#FF7A5C", edge: "#E85636", icon: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" },
            { href: "/copil/sfinti", label: "Sfinții mei", bg: "#A77BF0", edge: "#8455D8", icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" },
          ].map(({ href, label, bg, edge, icon }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                background: `linear-gradient(145deg, ${bg}, ${edge})`,
                borderRadius: 20, padding: "18px 16px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                boxShadow: `0 5px 0 ${edge}, 0 12px 20px -8px ${bg}88`,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon}/>
                </svg>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 700, color: "white" }}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/copil/camera" style={{ textDecoration: "none" }}>
          <div style={{
            background: "linear-gradient(145deg, #C4956A, #A07040)",
            borderRadius: 20, padding: "18px 16px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 5px 0 #A07040, 0 12px 20px -8px rgba(196,149,106,.5)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            </svg>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "white" }}>Camera mea</span>
          </div>
        </Link>

        <form action="/api/auth/logout" method="POST">
          <button type="submit" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#BBB4C6", fontWeight: 600, padding: "8px 0" }}>
            Ieșire din cont
          </button>
        </form>
      </div>
    </div>
  );
}
