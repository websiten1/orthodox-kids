"use client";

import { useState } from "react";

type Saint = {
  id: string;
  name: string;
  feastDay: string;
  virtue: string;
  storyShort: string;
  iconUrl: string;
  region: string;
  difficulty: string;
  owned: boolean;
};

export default function SaintsCollection({
  saints,
  totalOwned,
}: {
  saints: Saint[];
  totalOwned: number;
}) {
  const [selected, setSelected] = useState<Saint | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [filter, setFilter] = useState<"all" | "roman" | "universal">("all");

  const visible = filter === "all" ? saints : saints.filter(s => s.region === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #A77BF0, #8455D8)", padding: "52px 16px 20px" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 8px" }}>
          Sfinții mei
        </p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,.8)", fontWeight: 600, margin: "0 0 12px" }}>
          {totalOwned} din {saints.length} sfinți descoperiți
        </p>
        {/* Progress bar */}
        <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.25)", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            background: "#FFC23D",
            borderRadius: 999,
            width: `${(totalOwned / Math.max(saints.length, 1)) * 100}%`,
            boxShadow: "0 0 8px rgba(255,194,61,.6)",
          }} />
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", background: "white", borderBottom: "1.5px solid #EFEBF5" }}>
        {(["all", "roman", "universal"] as const).map(r => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 14, fontWeight: 600, padding: "7px 16px",
              borderRadius: 999, border: "none", cursor: "pointer",
              background: filter === r ? "#A77BF0" : "#F4F1FA",
              color: filter === r ? "white" : "#8A8296",
              boxShadow: filter === r ? "0 3px 0 #8455D8" : "none",
              transition: "all .15s",
            }}
          >
            {r === "all" ? "Toți" : r === "roman" ? "Români" : "Universali"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ flex: 1, padding: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {visible.map(saint => (
          <button
            key={saint.id}
            onClick={() => saint.owned ? (setSelected(saint), setShowBack(false)) : undefined}
            disabled={!saint.owned}
            style={{
              aspectRatio: "3/4",
              borderRadius: 20,
              border: saint.owned ? "2px solid #A77BF0" : "2px solid #EFEBF5",
              background: saint.owned ? "white" : "#F4F1FA",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 8, padding: "12px 8px",
              cursor: saint.owned ? "pointer" : "default",
              opacity: saint.owned ? 1 : 0.45,
              boxShadow: saint.owned ? "0 4px 14px -8px rgba(167,123,240,.4)" : "none",
              transition: "all .15s",
            }}
          >
            {/* Gold medallion */}
            <div
              className="medallion"
              style={{ width: saint.owned ? 52 : 44, height: saint.owned ? 52 : 44 }}
            >
              <div
                className="medallion-inner"
                style={{ width: "100%", height: "100%", fontSize: saint.owned ? 24 : 18 }}
              >
                {saint.owned ? "✦" : "?"}
              </div>
            </div>
            {saint.owned && (
              <span style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: 11, fontWeight: 700,
                color: "#403A4A", textAlign: "center",
                lineHeight: 1.2,
              }}>
                {saint.name}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(64,58,74,.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, zIndex: 60,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "white", borderRadius: 28,
              maxWidth: 340, width: "100%",
              overflow: "hidden",
              boxShadow: "0 24px 48px -12px rgba(64,58,74,.4)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {!showBack ? (
              /* Front */
              <div style={{ background: "linear-gradient(160deg, #A77BF0, #8455D8)", padding: "28px 24px", textAlign: "center" }}>
                <div className="medallion" style={{ width: 88, height: 88, margin: "0 auto 16px" }}>
                  <div className="medallion-inner" style={{ width: "100%", height: "100%", fontSize: 40 }}>✦</div>
                </div>
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{selected.name}</p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.8)", fontWeight: 600, margin: "0 0 12px" }}>{selected.feastDay}</p>
                <div style={{
                  display: "inline-block", background: "rgba(255,255,255,.18)",
                  borderRadius: 999, padding: "5px 14px",
                  fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "white",
                }}>
                  Virtutea: {selected.virtue}
                </div>
                <br/>
                <button
                  onClick={() => setShowBack(true)}
                  style={{
                    marginTop: 16, background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
                    color: "rgba(255,255,255,.75)", textDecoration: "underline",
                  }}
                >
                  Citește povestea →
                </button>
              </div>
            ) : (
              /* Back */
              <div style={{ padding: "24px 22px" }}>
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 700, color: "#403A4A", margin: "0 0 4px", textAlign: "center" }}>{selected.name}</p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 700, textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  {selected.feastDay} · {selected.region === "roman" ? "Sfânt Român" : "Sfânt Universal"}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#403A4A", fontWeight: 600, lineHeight: 1.65, margin: "0 0 16px" }}>
                  {selected.storyShort}
                </p>
                <div style={{
                  background: "#FFF4D6", borderRadius: 12, padding: "10px 14px",
                  fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#EFA014",
                }}>
                  Virtutea sa: {selected.virtue}
                </div>
                <button
                  onClick={() => setShowBack(false)}
                  style={{ marginTop: 14, background: "none", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#8A8296" }}
                >
                  ← Înapoi la icoană
                </button>
              </div>
            )}

            <div style={{ padding: "12px 22px 20px", borderTop: "1.5px solid #EFEBF5" }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: "100%", padding: "13px",
                  borderRadius: 999, border: "none", cursor: "pointer",
                  background: "#F4F1FA",
                  fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#8A8296",
                }}
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
