"use client";

import { useState } from "react";
import Link from "next/link";

type Activity = {
  id: string;
  title: string;
  type: string;
  talantsReward: number;
  estimatedMins: number;
  completed: boolean;
  orderIndex: number;
};

type Theme = {
  id: string;
  title: string;
  mapLocation: string;
  iconEmoji: string;
  description?: string;
  activities: Activity[];
};

type Child = {
  id: string;
  displayName: string;
  talantsBalance: number;
  avatarConfig: Record<string, unknown>;
};

type Props = {
  child: Child;
  activeThemes: Theme[];
  gospelToday: { id: string; title: string } | null;
};

const TILE_COLORS = [
  { bg: "#54C2F0", edge: "#2FA3D8", icon: "M12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0-4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 12 2.5zm0 17a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5z" },
  { bg: "#FF7A5C", edge: "#E85636", icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" },
  { bg: "#3FD1A8", edge: "#22AE88", icon: "M9 12l2 2 4-4" },
  { bg: "#FFC23D", edge: "#EFA014", icon: "M12 15l-3 3 3-3zm0 0l3 3-3-3zm0-6V3" },
  { bg: "#A77BF0", edge: "#8455D8", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

function ActivityIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    lesson: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20",
    quiz: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093",
    matching: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    minigame: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    group_mission: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
  };
  const d = paths[type] ?? paths.lesson;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function MapView({ child, activeThemes, gospelToday }: Props) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const avatarConfig = child.avatarConfig as { avatarIdx?: number; colorIdx?: number };
  const avatarEmojis = ["🧒", "👦", "👧", "👶", "🙍‍♂️", "🙍‍♀️"];
  const avatar = avatarEmojis[avatarConfig.avatarIdx ?? 0] ?? "🧒";
  const avatarColors = ["#54C2F0", "#FF7A5C", "#3FD1A8", "#FFC23D", "#A77BF0"];
  const avatarBg = avatarColors[avatarConfig.colorIdx ?? 0] ?? "#54C2F0";

  const totalActivities = activeThemes.flatMap(t => t.activities).length;
  const completedActivities = activeThemes.flatMap(t => t.activities).filter(a => a.completed).length;
  const xpPct = totalActivities > 0 ? completedActivities / totalActivities : 0;
  const talantsDisplay = child.talantsBalance;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>

      {/* ── Sky-blue header ── */}
      <header
        style={{
          background: "linear-gradient(160deg, #54C2F0 0%, #2FA3D8 100%)",
          padding: "48px 16px 20px",
        }}
      >
        {/* Row: avatar + name + gem */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          {/* Avatar */}
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: avatarBg,
            border: "3px solid rgba(255,255,255,.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, flexShrink: 0,
          }}>
            {avatar}
          </div>

          {/* Name + level */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Fredoka', system-ui", fontSize: 20, fontWeight: 700, color: "white" }}>
                {child.displayName}
              </span>
              <span style={{
                fontFamily: "'Fredoka', system-ui", fontSize: 11, fontWeight: 700,
                background: "#FFC23D", color: "#403A4A",
                borderRadius: 999, padding: "2px 7px", letterSpacing: "0.04em",
              }}>
                LVL {Math.max(1, Math.floor(completedActivities / 5) + 1)}
              </span>
            </div>
            {/* XP bar */}
            <div style={{ marginTop: 6 }}>
              <div className="xp-bar-track" style={{ width: "100%", height: 7, maxWidth: 160 }}>
                <div className="xp-bar-fill" style={{ width: `${xpPct * 100}%` }} />
              </div>
              <span style={{ fontFamily: "'Nunito', system-ui", fontSize: 10, color: "rgba(255,255,255,.75)", fontWeight: 700, marginTop: 2, display: "block" }}>
                {completedActivities}/{totalActivities} XP
              </span>
            </div>
          </div>

          {/* Gem / talanți */}
          <div className="gem-counter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC23D">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {talantsDisplay}
          </div>
        </div>
      </header>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto pb-24" style={{ padding: "20px 16px 0" }}>

        {/* Gospel Today — only Sundays */}
        {gospelToday && (
          <Link href={`/copil/evanghelie/${gospelToday.id}`} style={{ textDecoration: "none" }}>
            <div
              className="mb-5 rounded-3xl overflow-hidden fade-up"
              style={{
                background: "linear-gradient(135deg, #FFC23D, #EFA014)",
                boxShadow: "0 6px 0 #C8820A, 0 14px 24px -10px rgba(239,160,20,.5)",
                padding: "16px 18px",
                display: "flex", alignItems: "center", gap: 14,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(255,255,255,.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", margin: "0 0 3px" }}>
                  Evanghelia Zilei
                </p>
                <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 18, fontWeight: 700, color: "white", margin: 0 }}>
                  {gospelToday.title}
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </Link>
        )}

        {/* ── TODAY'S FEAST card (active theme) ── */}
        {activeThemes[0] && (
          <div className="mb-5 fade-up" style={{ animationDelay: ".05s" }}>
            <div style={{
              background: "white",
              borderRadius: 24,
              border: "1.5px solid #EFEBF5",
              boxShadow: "0 10px 24px -14px rgba(120,80,160,.3)",
              overflow: "hidden",
            }}>
              {/* Red strip header */}
              <div style={{
                background: "#A43234",
                padding: "10px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontFamily: "'Nunito', system-ui", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,.85)" }}>
                  Tema săptămânii
                </span>
                <span style={{
                  fontFamily: "'Fredoka', system-ui", fontSize: 12, fontWeight: 700,
                  background: "rgba(255,255,255,.2)", borderRadius: 999, padding: "3px 10px", color: "white",
                }}>
                  +{activeThemes[0].activities.reduce((s, a) => s + a.talantsReward, 0)}
                  {" "}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFC23D" style={{ display: "inline", verticalAlign: "middle" }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </span>
              </div>

              <div style={{ padding: "16px" }}>
                {/* Gold medallion + theme info */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                  <div className="medallion" style={{ width: 72, height: 72 }}>
                    <div className="medallion-inner" style={{ width: "100%", height: "100%" }}>
                      <span style={{ fontSize: 32 }}>{activeThemes[0].iconEmoji}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 22, fontWeight: 700, color: "#403A4A", margin: "0 0 4px", lineHeight: 1.1 }}>
                      {activeThemes[0].title}
                    </p>
                    {activeThemes[0].description && (
                      <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, color: "#8A8296", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                        {activeThemes[0].description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "'Nunito', system-ui", fontSize: 12, fontWeight: 700, color: "#8A8296" }}>
                      Progres
                    </span>
                    <span style={{ fontFamily: "'Fredoka', system-ui", fontSize: 13, fontWeight: 700, color: "#A43234" }}>
                      {activeThemes[0].activities.filter(a => a.completed).length}/{activeThemes[0].activities.length}
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: "#F4F1FA", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #A43234, #C94040)",
                      borderRadius: 999,
                      width: `${activeThemes[0].activities.length > 0
                        ? (activeThemes[0].activities.filter(a => a.completed).length / activeThemes[0].activities.length) * 100
                        : 0}%`,
                      transition: "width .3s",
                    }} />
                  </div>
                </div>

                {/* Activities */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activeThemes[0].activities.slice(0, 3).map((act, idx) => {
                    const prevDone = idx === 0 || activeThemes[0].activities[idx - 1].completed;
                    const locked = !prevDone && !act.completed;
                    return (
                      <Link
                        key={act.id}
                        href={locked ? "#" : `/copil/activitate/${act.id}`}
                        onClick={(e) => locked && e.preventDefault()}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 14px", borderRadius: 14,
                          background: act.completed ? "#E4FAF3" : locked ? "#F4F1FA" : "white",
                          border: `1.5px solid ${act.completed ? "#22AE88" : locked ? "#EFEBF5" : "#EFEBF5"}`,
                          opacity: locked ? 0.5 : 1,
                        }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                            background: act.completed ? "#3FD1A8" : locked ? "#EFEBF5" : "#A43234",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: act.completed || !locked ? "white" : "#BBB4C6",
                          }}>
                            {act.completed
                              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              : locked
                              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BBB4C6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                              : <ActivityIcon type={act.type} />
                            }
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 15, fontWeight: 600, color: "#403A4A", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {act.title}
                            </p>
                            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: 0 }}>
                              {act.estimatedMins} min · +{act.talantsReward}
                              {" "}
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="#FFC23D" style={{ display: "inline", verticalAlign: "middle" }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </p>
                          </div>
                          {!locked && !act.completed && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BBB4C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── EXPLORE grid ── */}
        <div className="mb-5 fade-up" style={{ animationDelay: ".1s" }}>
          <div className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            Explorează
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { href: "/copil/harta", label: "Lecții", color: TILE_COLORS[0], icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" },
              { href: "/copil/echipa", label: "Echipă", color: TILE_COLORS[1], icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
              { href: "/copil/sfinti", label: "Sfinți", color: TILE_COLORS[4], icon: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" },
              { href: "/copil/joc-echipa/turn", label: "Joc", color: TILE_COLORS[1], icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
              { href: "/copil/magazin", label: "Magazin", color: TILE_COLORS[3], icon: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" },
              { href: "/copil/camera", label: "Camera mea", color: { bg: "#C4956A", edge: "#A07040" }, icon: "M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" },
            ].map(({ href, label, color, icon }) => (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div
                  className="tile"
                  style={{
                    background: `linear-gradient(145deg, ${color.bg}, ${color.edge})`,
                    boxShadow: `0 5px 0 ${color.edge}, 0 10px 16px -8px ${color.bg}88`,
                    minHeight: 90,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(255,255,255,.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Fredoka', system-ui", fontSize: 13, fontWeight: 600, color: "white" }}>{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── YOUR JOURNEY (more themes) ── */}
        {activeThemes.length > 1 && (
          <div className="mb-5 fade-up" style={{ animationDelay: ".15s" }}>
            <div className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-10"/>
              </svg>
              Călătoria mea
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeThemes.slice(1).map((theme, idx) => {
                const tColor = TILE_COLORS[(idx + 1) % TILE_COLORS.length];
                const done = theme.activities.filter(a => a.completed).length;
                return (
                  <div
                    key={theme.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      background: "white", borderRadius: 20,
                      border: "1.5px solid #EFEBF5",
                      padding: "14px 16px",
                      boxShadow: "0 4px 14px -8px rgba(120,80,160,.15)",
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 16, flexShrink: 0,
                      background: `linear-gradient(145deg, ${tColor.bg}, ${tColor.edge})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24,
                    }}>
                      {theme.iconEmoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 16, fontWeight: 600, color: "#403A4A", margin: "0 0 4px" }}>
                        {theme.title}
                      </p>
                      <div style={{ height: 5, borderRadius: 999, background: "#F4F1FA", overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          background: tColor.bg,
                          borderRadius: 999,
                          width: `${theme.activities.length > 0 ? (done / theme.activities.length) * 100 : 0}%`,
                        }} />
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Fredoka', system-ui", fontSize: 14, fontWeight: 700, color: tColor.bg, flexShrink: 0 }}>
                      {done}/{theme.activities.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {activeThemes.length === 0 && (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            background: "white", borderRadius: 24,
            border: "1.5px solid #EFEBF5",
          }}>
            <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 20, fontWeight: 700, color: "#403A4A", marginBottom: 8 }}>
              Nicio temă activă
            </p>
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 14, color: "#8A8296", fontWeight: 600 }}>
              Așteptați ca profesorul să activeze o temă pentru clasa voastră.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
