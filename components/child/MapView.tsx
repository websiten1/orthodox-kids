"use client";

import Link from "next/link";
import { T, Gem, GButton, Panel, Medallion, XPBar, Pill, SectionTitle, Sprinkles, Icon } from "./ui";

type Activity = {
  id: string; title: string; type: string;
  talantsReward: number; estimatedMins: number;
  completed: boolean; orderIndex: number;
};
type Theme = {
  id: string; title: string; mapLocation: string;
  iconEmoji: string; description?: string; activities: Activity[];
};
type Child = {
  id: string; displayName: string; talantsBalance: number;
  avatarConfig: Record<string, unknown>;
};
type Props = {
  child: Child;
  activeThemes: Theme[];
  gospelToday: { id: string; title: string } | null;
};

const EXPLORE = [
  { href: "/copil/harta",          label: "Lecții",    icon: "book-open",  c: T.sky,   cE: T.skyE,   cL: "#AEE4FA" },
  { href: "/copil/harta",          label: "Rugăciuni", icon: "flame",      c: T.coral, cE: T.coralE, cL: "#FFB29E" },
  { href: "/copil/sfinti",         label: "Sfinți",    icon: "scroll-text",c: T.lilac, cE: T.lilacE, cL: "#CDB3F8" },
  { href: "/copil/harta",          label: "Imnuri",    icon: "music",      c: T.pink,  cE: T.pinkE,  cL: "#FFAAD3" },
  { href: "/copil/joc-echipa/turn",label: "Joc",       icon: "shapes",     c: T.mint,  cE: T.mintE,  cL: "#8FE8D0" },
  { href: "/copil/calendar",       label: "Calendar",  icon: "calendar",   c: T.sun,   cE: T.sunE,   cL: "#FFDD8C" },
];

export default function MapView({ child, activeThemes, gospelToday }: Props) {
  const avatarConfig = child.avatarConfig as { avatarIdx?: number };
  const avatarEmoji = ["🧒","👦","👧","👶","🙍‍♂️","🙍‍♀️"][avatarConfig.avatarIdx ?? 0] ?? "🧒";

  const total = activeThemes.flatMap(t => t.activities).length;
  const done  = activeThemes.flatMap(t => t.activities).filter(a => a.completed).length;
  const lvl   = Math.max(1, Math.floor(done / 5) + 1);
  const xpPct = total > 0 ? done / total : 0;

  // Journey nodes from themes
  const JOURNEY = activeThemes.map((t, i) => {
    const tdone = t.activities.filter(a => a.completed).length;
    const state = tdone === t.activities.length && t.activities.length > 0 ? "done"
      : i === 0 ? "current" : "locked";
    const colors = [
      [T.coral, T.coralE], [T.pink, T.pinkE], [T.mint, T.mintE],
      [T.lilac, T.lilacE], [T.sky, T.skyE], [T.sun, T.sunE],
    ];
    const [c, cE] = colors[i % colors.length];
    return { ...t, state, c, cE, done: tdone };
  });

  const firstTheme = activeThemes[0];

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      {/* ── HUD (white) ── */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12, position: "relative" }}>
        {/* status bar */}
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <div style={{ width: 17, height: 11, border: `1.4px solid ${T.ink}`, borderRadius: 3, position: "relative", opacity: 0.9 }}>
            <div style={{ position: "absolute", inset: 1.5, width: "70%", background: T.ink, borderRadius: 1 }} />
          </div>
        </div>
        <div style={{ padding: "2px 16px 0", display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar medallion */}
          <div style={{ cursor: "pointer" }}>
            <Medallion icon={avatarEmoji} size={50} ring={4} iconColor={T.lilac} />
          </div>
          {/* Name + XP */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 20, color: T.ink }}>{child.displayName}</span>
              <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, color: "#fff", background: T.sun, borderRadius: 999, padding: "2px 9px" }}>
                LVL {lvl}
              </span>
            </div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ flex: 1, maxWidth: 150 }}><XPBar pct={xpPct} color={T.mint} height={9} /></div>
              <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 10.5, color: T.ink3 }}>{done}/{total}</span>
            </div>
          </div>
          {/* Gem counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.gold50, borderRadius: 999, padding: "6px 12px 6px 10px" }}>
            <Gem size={18} />
            <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 14, color: T.ink }}>{child.talantsBalance}</span>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 18, paddingBottom: 90 }}>

        {/* Feast / active theme banner */}
        {firstTheme && (
          <Panel style={{ overflow: "hidden" }}>
            <div style={{ position: "relative", padding: "14px 14px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Sprinkles count={10} />
              <span style={{ position: "relative", fontFamily: T.fT, fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: T.coral, borderRadius: 999, padding: "5px 12px" }}>
                Tema zilei
              </span>
              <span style={{ position: "relative" }}>
                <Pill bg={T.sun} fg="#7a5200">
                  <Gem size={13} />
                  {" "}+{firstTheme.activities.reduce((s, a) => s + a.talantsReward, 0)}
                </Pill>
              </span>
            </div>
            <div style={{ padding: "10px 16px 16px", display: "flex", gap: 14, alignItems: "center" }}>
              <Medallion icon={firstTheme.iconEmoji} size={96} glow />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 21, color: T.ink, lineHeight: 1.08 }}>
                  {firstTheme.title}
                </div>
                {firstTheme.description && (
                  <div style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 13.5, color: T.ink2, marginTop: 3, lineHeight: 1.4 }}>
                    {firstTheme.description}
                  </div>
                )}
                <div style={{ marginTop: 12 }}>
                  {firstTheme.activities[0] && (
                    <Link href={`/copil/activitate/${firstTheme.activities.find(a => !a.completed)?.id ?? firstTheme.activities[0].id}`} style={{ textDecoration: "none" }}>
                      <GButton color="coral" icon={<Icon name="arrow-right" size={16} color="#fff" stroke={2} />}>
                        Continuă
                      </GButton>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Panel>
        )}

        {/* Gospel today */}
        {gospelToday && (
          <Link href={`/copil/evanghelie/${gospelToday.id}`} style={{ textDecoration: "none" }}>
            <Panel style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 13, position: "relative", overflow: "hidden" }}>
              <Sprinkles count={8} />
              <div style={{ position: "relative" }}><Medallion icon="✦" size={52} ring={4} /></div>
              <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
                <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.mint }}>
                  Evanghelia zilei
                </div>
                <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 18, color: T.ink, marginTop: 1 }}>
                  {gospelToday.title}
                </div>
              </div>
              <span style={{ position: "relative" }}><Pill bg={T.mint} fg="#fff"><Gem size={13} /> +8</Pill></span>
            </Panel>
          </Link>
        )}

        {/* Explore grid */}
        <div>
          <SectionTitle icon={<Icon name="shapes" size={18} color={T.pink} stroke={2} />} color={T.pink}>
            Explorează
          </SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 13 }}>
            {EXPLORE.map(({ href, label, icon, c, cE, cL }) => (
              <Link key={label} href={href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: 24,
                  background: `linear-gradient(160deg, ${cL}, ${c})`,
                  boxShadow: `0 6px 0 ${cE}, 0 13px 18px -10px ${cE}`,
                  position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* top highlight */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", background: "linear-gradient(rgba(255,255,255,.32), rgba(255,255,255,0))" }} />
                  <div style={{ position: "relative", width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.94)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 6px rgba(0,0,0,.12)" }}>
                    <Icon name={icon} size={24} color={c} stroke={2} />
                  </div>
                </div>
                <span style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 12.5, color: T.ink }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Journey map */}
        {JOURNEY.length > 0 && (
          <div>
            <SectionTitle icon={<Icon name="crown" size={18} color={T.lilac} stroke={2} />} color={T.lilac}>
              Călătoria mea
            </SectionTitle>
            <div style={{ position: "relative", padding: "4px 0" }}>
              {/* Dashed vertical line */}
              <div style={{
                position: "absolute", left: 51, top: 20, bottom: 20, width: 4,
                background: `repeating-linear-gradient(${T.line}, ${T.line} 7px, transparent 7px, transparent 14px)`,
                borderRadius: 4,
              }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
                {JOURNEY.map((node) => {
                  const isDone = node.state === "done";
                  const isCur  = node.state === "current";
                  const isLocked = node.state === "locked";
                  return (
                    <div key={node.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {/* Node circle */}
                      <div style={{ position: "relative" }}>
                        {isCur
                          ? <Medallion icon={node.iconEmoji} size={72} glow />
                          : (
                            <div style={{
                              width: 72, height: 72, borderRadius: "50%",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              background: isDone ? `radial-gradient(circle at 32% 26%, #fff6, ${node.c} 58%, ${node.cE})` : `${node.c}1F`,
                              border: isDone ? "3px solid #fff" : `3px solid ${node.c}55`,
                              boxShadow: isDone ? `0 6px 14px -6px ${node.cE}` : "none",
                            }}>
                              <Icon name={isDone ? "check" : "lock"} size={isDone ? 30 : 24} color={isDone ? "#fff" : node.c} stroke={isDone ? 2.8 : 2} />
                            </div>
                          )
                        }
                      </div>

                      {/* Card */}
                      <Link
                        href={isCur ? `/copil/activitate/${node.activities.find(a => !a.completed)?.id ?? node.activities[0]?.id ?? "#"}` : "#"}
                        onClick={e => !isCur && e.preventDefault()}
                        style={{ flex: 1, minWidth: 0, opacity: isLocked ? 0.8 : 1, textDecoration: "none" }}
                      >
                        <Panel style={{
                          padding: "12px 14px",
                          display: "flex", alignItems: "center", gap: 12,
                          borderLeft: `7px solid ${node.c}`,
                          border: isCur ? `2px solid ${node.c}` : `2px solid ${T.line}`,
                          borderLeftWidth: 7, borderLeftColor: node.c,
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 17, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {node.title}
                            </div>
                            <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, color: node.c, marginTop: 2 }}>
                              {isDone ? "Complet ✓" : isCur ? `${node.done}/${node.activities.length} activități →` : "Blocat"}
                            </div>
                          </div>
                          {isCur && (
                            <Pill bg={node.c} fg="#fff">
                              <Gem size={13} />
                              {" "}+{node.activities.reduce((s, a) => s + a.talantsReward, 0)}
                            </Pill>
                          )}
                        </Panel>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Daily prayer chest */}
        <Panel style={{ padding: 14, display: "flex", alignItems: "center", gap: 13, position: "relative", overflow: "hidden" }}>
          <Sprinkles count={8} />
          <div style={{ position: "relative" }}><Medallion icon="🕯️" size={52} ring={4} iconColor={T.coral} /></div>
          <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
            <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.mint }}>Rugăciunea zilei</div>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 18, color: T.ink, marginTop: 1 }}>Spune-o și câștigă o binecuvântare</div>
          </div>
          <span style={{ position: "relative" }}><Pill bg={T.mint} fg="#fff"><Gem size={13} /> +5</Pill></span>
        </Panel>
      </div>
    </div>
  );
}
