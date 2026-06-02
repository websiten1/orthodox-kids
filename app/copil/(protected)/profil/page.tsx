import { getChildSession } from "@/lib/auth";
import { DEMO_CHILD } from "@/lib/demo-data";
import { T, Gem, Panel, Medallion, XPBar, Pill, Icon } from "@/components/child/ui";
import LogoutButton from "./LogoutButton";

export default async function ProfilPage() {
  const session = await getChildSession();
  if (!session) return null;
  const { iconProgress, talantsBalance, totalActivities, totalSaints } = DEMO_CHILD;
  const lvl = Math.max(1, Math.floor(totalActivities / 5) + 1);
  const xpPct = (totalActivities % 5) / 5;
  const iconPct = iconProgress.completedLayers / iconProgress.totalLayers;
  const STATS: [string, string, string][] = [
    ["12", "Lecții", T.coral],
    [String(totalSaints), "Sfinți", T.mint],
    [String(talantsBalance), "Talanți", T.sun],
  ];
  const SETTINGS: [string, string, string][] = [
    ["user-round", "Icoana mea personală", T.coral],
    ["flame", "Rugăciunea zilnică", T.mint],
    ["music", "Imnurile mele", T.sun],
    ["shapes", "Sfinții întâlniți", T.sky],
  ];
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <div style={{ width: 17, height: 11, border: `1.4px solid ${T.ink}`, borderRadius: 3, position: "relative", opacity: 0.9 }}>
            <div style={{ position: "absolute", inset: 1.5, width: "70%", background: T.ink, borderRadius: 1 }} />
          </div>
        </div>
        <div style={{ padding: "2px 16px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <Medallion icon="🧒" size={50} ring={4} iconColor={T.lilac} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 20, color: T.ink }}>{session.displayName}</span>
              <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, color: "#fff", background: T.sun, borderRadius: 999, padding: "2px 9px" }}>LVL {lvl}</span>
            </div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ flex: 1, maxWidth: 150 }}><XPBar pct={xpPct} color={T.mint} height={9} /></div>
              <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 10.5, color: T.ink3 }}>{totalActivities * 10}/200</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.gold50, borderRadius: 999, padding: "6px 12px 6px 10px" }}>
            <Gem size={18} /><span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 14, color: T.ink }}>{talantsBalance}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 90 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {STATS.map(([n, l, col]) => (
            <Panel key={l} style={{ flex: 1, padding: "14px 8px", textAlign: "center", border: `2px solid ${T.line}` }}>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 28, color: col, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: T.fT, fontWeight: 700, fontSize: 12, color: T.ink2, marginTop: 4 }}>{l}</div>
            </Panel>
          ))}
        </div>
        <Panel style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Medallion icon="✦" size={64} ring={4} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.mint, marginBottom: 4 }}>Icoana mea</div>
              <XPBar pct={iconPct} color={T.sun} height={10} />
              <div style={{ fontFamily: T.fT, fontSize: 11, color: T.ink3, fontWeight: 700, marginTop: 4 }}>{iconProgress.completedLayers} din {iconProgress.totalLayers} straturi</div>
            </div>
          </div>
        </Panel>
        <Panel style={{ overflow: "hidden" }}>
          {SETTINGS.map(([ic, title, col], i) => (
            <div key={ic} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px", borderBottom: i < SETTINGS.length - 1 ? `1.5px solid ${T.line}` : "none", cursor: "pointer" }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: col, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 0 rgba(0,0,0,.12)", flexShrink: 0 }}>
                <Icon name={ic} size={19} color="#fff" stroke={1.9} />
              </span>
              <span style={{ flex: 1, fontFamily: T.fT, fontWeight: 700, fontSize: 15, color: T.ink }}>{title}</span>
              <Icon name="chevron-right" size={18} color={T.ink3} stroke={2} />
            </div>
          ))}
        </Panel>
        <LogoutButton />
      </div>
    </div>
  );
}
