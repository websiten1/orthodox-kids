import { getChildSession } from "@/lib/auth";
import { T, Panel, Pill, SectionTitle, Icon } from "@/components/child/ui";

const FEASTS = [
  { d: "02", m: "IUL", feast: "Sfântul Stefan cel Mare", today: true },
  { d: "20", m: "IUL", feast: "Sfantul Proroc Ilie" },
  { d: "06", m: "AUG", feast: "Schimbarea la Fata" },
  { d: "15", m: "AUG", feast: "Adormirea Maicii Domnului" },
];
const DAYS = ["D","L","M","M","J","V","S"];

export default async function CalendarPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
        </div>
        <div style={{ padding: "2px 14px 0" }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Calendar</div>
        </div>
      </div>
      <div style={{ padding: "8px 16px 90px" }}>
        <SectionTitle icon={<Icon name="calendar" size={18} color={T.goldE} stroke={2} />} color={T.goldE}>
          Iulie
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 20 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: T.fT, fontSize: 11, fontWeight: 800, color: T.ink3 }}>{d}</div>
          ))}
          {Array.from({ length: 31 }).map((_, idx) => {
            const day = idx + 1;
            const feast = [2, 20].includes(day);
            const today = day === 2;
            return (
              <div key={idx} style={{
                aspectRatio: "1", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", fontFamily: T.fT, fontSize: 13,
                fontWeight: today ? 800 : 600,
                color: today ? "#fff" : feast ? T.coral : T.ink,
                background: today ? T.coral : feast ? T.red50 : "transparent",
                boxShadow: today ? `0 3px 0 ${T.coralE}` : "none",
              }}>
                {day}
                {feast && !today && <div style={{ position: "absolute", bottom: 3, width: 5, height: 5, borderRadius: 5, background: T.sun }} />}
              </div>
            );
          })}
        </div>
        <SectionTitle icon={<Icon name="crown" size={18} color={T.lilac} stroke={2} />} color={T.lilac}>
          Sarbatori apropiate
        </SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {FEASTS.map((f, i) => (
            <Panel key={i} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 14, border: f.today ? `2px solid ${T.coral}` : `2px solid ${T.line}` }}>
              <div style={{ textAlign: "center", width: 46, flexShrink: 0 }}>
                <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 25, color: f.today ? T.coral : T.ink, lineHeight: 1 }}>{f.d}</div>
                <div style={{ fontFamily: T.fT, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: T.ink3 }}>{f.m}</div>
              </div>
              <div style={{ width: 2, height: 32, background: T.line, borderRadius: 2 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 17, color: T.ink }}>{f.feast}</div>
                {f.today && <div style={{ marginTop: 3 }}><Pill bg={T.coral} fg="#fff" style={{ fontSize: 11 }}>Azi</Pill></div>}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}
