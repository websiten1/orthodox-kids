import { getChildSession } from "@/lib/auth";
import { T, Gem, Panel, Medallion, Pill, SectionTitle, Icon } from "@/components/child/ui";
import Link from "next/link";

const MY_TEAM   = { id: "t1", name: "Apostolii" };
const MEMBERS   = [
  { id: "c1", name: "Andrei M.", talants: 145, activities: 12, isMe: true,  color: T.coral },
  { id: "c2", name: "Maria P.", talants: 132, activities: 11, isMe: false, color: T.pink  },
  { id: "c7", name: "Mihai C.", talants: 110, activities: 9,  isMe: false, color: T.mint  },
];
const TEAMS = [
  { id: "t1", name: "Apostolii", talants: 387, activities: 32, color: T.coral },
  { id: "t2", name: "Ingerii",   talants: 264, activities: 24, color: T.mint  },
];

export default async function EchipaPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
        </div>
        <div style={{ padding: "2px 14px 0" }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Echipa {MY_TEAM.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 90 }}>
        <Link href="/copil/joc-echipa/turn" style={{ textDecoration: "none" }}>
          <Panel style={{ padding: "16px", display: "flex", alignItems: "center", gap: 14, border: `2px solid ${T.coral}` }}>
            <Medallion icon="🏰" size={64} ring={5} iconColor={T.coral} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.coral }}>Jocul de azi</div>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 19, color: T.ink, marginTop: 1 }}>Turnul Credintei</div>
            </div>
            <Pill bg={T.sun} fg="#7a5200"><Gem size={13} /> +15</Pill>
          </Panel>
        </Link>
        <div>
          <SectionTitle icon={<Icon name="crown" size={18} color={T.coral} stroke={2} />} color={T.coral}>Membrii echipei</SectionTitle>
          <Panel style={{ overflow: "hidden" }}>
            {MEMBERS.map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px", borderBottom: i < MEMBERS.length - 1 ? `1.5px solid ${T.line}` : "none", background: m.isMe ? T.gold50 : "#fff" }}>
                <Medallion icon="🧒" iconColor={m.color} size={44} ring={3} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 17, color: T.ink }}>{m.name}</span>
                    {m.isMe && <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, background: T.sun, color: "#7a5200", borderRadius: 999, padding: "2px 8px" }}>eu</span>}
                  </div>
                  <div style={{ fontFamily: T.fT, fontSize: 11.5, color: T.ink2 }}>{m.activities} activitati</div>
                </div>
                <Pill bg={T.gold50} fg={T.goldE}><Gem size={12} /> {m.talants}</Pill>
              </div>
            ))}
          </Panel>
        </div>
        <div>
          <SectionTitle icon={<Icon name="shapes" size={18} color={T.sky} stroke={2} />} color={T.sky}>Clasament echipe</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TEAMS.map((team, i) => (
              <Panel key={team.id} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, border: team.id === MY_TEAM.id ? `2px solid ${T.sun}` : `2px solid ${T.line}`, background: team.id === MY_TEAM.id ? T.gold50 : "#fff" }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: team.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: T.fD, fontSize: 18, fontWeight: 700, color: "#fff" }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 17, color: T.ink }}>{team.name}</div>
                  <div style={{ fontFamily: T.fT, fontSize: 11.5, color: T.ink2 }}>{team.activities} activitati</div>
                </div>
                <Pill bg={T.gold50} fg={T.goldE}><Gem size={12} /> {team.talants}</Pill>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
