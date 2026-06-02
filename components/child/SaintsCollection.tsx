"use client";

import { useState } from "react";
import { T, Gem, GButton, Panel, Medallion, Pill, SectionTitle, Icon } from "./ui";

type Saint = { id: string; name: string; feastDay: string; virtue: string; storyShort: string; iconUrl: string; region: string; difficulty: string; owned: boolean; };

export default function SaintsCollection({ saints, totalOwned }: { saints: Saint[]; totalOwned: number }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selected, setSelected] = useState<Saint | null>(null);
  const [filter, setFilter] = useState<"all" | "roman" | "universal">("all");

  const visible = filter === "all" ? saints : saints.filter(s => s.region === filter);

  function openSaint(s: Saint) { if (s.owned) { setSelected(s); setView("detail"); } }

  if (view === "detail" && selected) {
    return <SaintDetail saint={selected} onBack={() => setView("list")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      {/* TopBanner */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <div style={{ width: 17, height: 11, border: `1.4px solid ${T.ink}`, borderRadius: 3, position: "relative", opacity: 0.9 }}>
            <div style={{ position: "absolute", inset: 1.5, width: "70%", background: T.ink, borderRadius: 1 }} />
          </div>
        </div>
        <div style={{ padding: "2px 14px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Eroii Credinței</div>
        </div>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 13 }}>
        {/* Progress pill */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pill bg={T.gold50} fg={T.goldE}><Gem size={14} /> {totalOwned} din {saints.length} descoperiți</Pill>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {(["all", "roman", "universal"] as const).map(r => (
            <button key={r} onClick={() => setFilter(r)} style={{
              fontFamily: T.fT, fontWeight: 800, fontSize: 13,
              padding: "7px 16px", borderRadius: 999, border: "none", cursor: "pointer",
              background: filter === r ? T.lilac : T.line,
              color: filter === r ? "#fff" : T.ink2,
              boxShadow: filter === r ? `0 3px 0 ${T.lilacE}` : "none",
              transition: "all .15s",
            }}>
              {r === "all" ? "Toți" : r === "roman" ? "Români" : "Universali"}
            </button>
          ))}
        </div>

        {/* List */}
        {visible.map(s => (
          <Panel key={s.id} onClick={() => openSaint(s)} style={{ padding: 12, display: "flex", alignItems: "center", gap: 14, opacity: s.owned ? 1 : 0.5, cursor: s.owned ? "pointer" : "default" }}>
            <Medallion icon={s.iconUrl.length <= 2 ? s.iconUrl : "✦"} size={66} ring={5} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 21, color: T.ink, lineHeight: 1.05 }}>{s.name}</div>
              <div style={{ fontFamily: T.fD, fontStyle: "italic", fontSize: 15, color: T.ink2 }}>{s.virtue}</div>
              <div style={{ marginTop: 5, display: "inline-flex" }}>
                <Pill bg={T.gold50} fg={T.goldE} style={{ fontSize: 12 }}>
                  <Icon name="calendar" size={12} color={T.goldE} stroke={2} /> {s.feastDay}
                </Pill>
              </div>
            </div>
            {s.owned && <Icon name="chevron-right" size={20} color={T.ink3} stroke={2} />}
          </Panel>
        ))}
      </div>
    </div>
  );
}

function SaintDetail({ saint, onBack }: { saint: Saint; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <div style={{ width: 17, height: 11, border: `1.4px solid ${T.ink}`, borderRadius: 3, position: "relative", opacity: 0.9 }}>
            <div style={{ position: "absolute", inset: 1.5, width: "70%", background: T.ink, borderRadius: 1 }} />
          </div>
        </div>
        <div style={{ padding: "2px 14px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <div onClick={onBack} style={{ width: 40, height: 40, borderRadius: 14, background: T.line, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="arrow-left" size={20} color={T.ink} stroke={2} />
          </div>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Erou</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <Panel style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Medallion icon={saint.iconUrl.length <= 2 ? saint.iconUrl : "✦"} size={150} glow />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 28, color: T.ink, lineHeight: 1.05 }}>{saint.name}</div>
            <div style={{ fontFamily: T.fD, fontStyle: "italic", fontSize: 18, color: T.ink2, marginTop: 1 }}>{saint.virtue}</div>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <Pill bg={T.gold50} fg={T.goldE}>
              <Icon name="calendar" size={13} color={T.goldE} stroke={2} /> {saint.feastDay}
            </Pill>
            <Pill bg={T.teal50} fg={T.mintE}>
              <Icon name="crown" size={13} color={T.mintE} stroke={2} /> {saint.region === "roman" ? "Sfânt Român" : "Universal"}
            </Pill>
          </div>
          <p style={{ fontFamily: T.fT, fontSize: 16, lineHeight: 1.6, color: T.ink, textAlign: "center", margin: "4px 2px 0" }}>
            {saint.storyShort}
          </p>
          <GButton color="gold" icon={<Icon name="volume-2" size={16} color="#fff" stroke={2} />}>
            Ascultă troparul
          </GButton>
        </Panel>
      </div>
    </div>
  );
}
