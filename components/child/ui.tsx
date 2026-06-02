// Primitive UI components translated 1:1 from the Ortodoxia app.jsx design kit
"use client";
import React from "react";

export const T = {
  ink: "#403A4A", ink2: "#8A8296", ink3: "#BBB4C6",
  white: "#FFFFFF", line: "#EFEBF5", cream: "#FFFFFF",
  pink: "#FF6FB0", pinkE: "#E84E96",
  mint: "#3FD1A8", mintE: "#22AE88", teal50: "#E4FAF3",
  sun: "#FFC23D", sunE: "#EFA014", gold50: "#FFF4D6", goldLine: "#FFE6A8",
  coral: "#FF7A5C", coralE: "#E85636", red50: "#FFEDE7",
  lilac: "#A77BF0", lilacE: "#8455D8", purple50: "#F3ECFE",
  sky: "#54C2F0", skyE: "#2FA3D8", sky50: "#E7F6FD",
  gold: "#FFC23D", goldE: "#EFA014",
  fB: "'Fredoka', system-ui, sans-serif",
  fD: "'Fredoka', system-ui, sans-serif",
  fT: "'Nunito', system-ui, sans-serif",
};

// ── Sprinkles ──────────────────────────────────────────────────────────────
const SPRK = ["#FF6FB0", "#3FD1A8", "#54C2F0", "#FFC23D", "#FF7A5C", "#A77BF0"];
const PTS = [[16,7],[58,15],[26,28],[72,38],[12,50],[52,58],[32,70],[76,80],[20,90],[48,4],[40,44],[66,66]];
export function Sprinkles({ count = 12 }: { count?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PTS.slice(0, count).map((p, i) => (
        <span key={i} style={{
          position: "absolute", top: p[0] + "%", left: p[1] + "%",
          width: 11, height: 4, borderRadius: 4, background: SPRK[i % SPRK.length],
          transform: `rotate(${(i * 52) % 180}deg)`, opacity: 0.9,
        }} />
      ))}
    </div>
  );
}

// ── Gem icon ──────────────────────────────────────────────────────────────
export function Gem({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flex: "none" }}>
      <defs>
        <linearGradient id="gemg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD874" />
          <stop offset="1" stopColor="#E0962A" />
        </linearGradient>
      </defs>
      <path d="M6 3h12l3.2 5.4-9.2 12.6L2.8 8.4Z" fill="url(#gemg)" stroke="#B5781E" strokeWidth="1" />
      <path d="M6 3 12 8.4 18 3M2.8 8.4h18.4M12 8.4v12.6" stroke="#fff7e0" strokeWidth="0.7" opacity="0.7" fill="none" />
    </svg>
  );
}

// ── GButton ───────────────────────────────────────────────────────────────
type BtnColor = "red" | "coral" | "teal" | "mint" | "gold" | "sky" | "pink" | "lilac";
const BMAP: Record<BtnColor, [string, string, string]> = {
  red:   [T.coral,  T.coralE, "#fff"],
  coral: [T.coral,  T.coralE, "#fff"],
  teal:  [T.mint,   T.mintE,  "#fff"],
  mint:  [T.mint,   T.mintE,  "#fff"],
  gold:  [T.sun,    T.sunE,   "#7a5200"],
  sky:   [T.sky,    T.skyE,   "#fff"],
  pink:  [T.pink,   T.pinkE,  "#fff"],
  lilac: [T.lilac,  T.lilacE, "#fff"],
};
export function GButton({
  children, color = "red", icon, onClick, full, big, style = {},
}: {
  children: React.ReactNode;
  color?: BtnColor;
  icon?: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  big?: boolean;
  style?: React.CSSProperties;
}) {
  const [bg, edge, fg] = BMAP[color];
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        fontFamily: T.fT, fontWeight: 800, fontSize: big ? 17 : 15, color: fg,
        background: bg, border: "none", borderRadius: 16,
        padding: big ? "15px 24px" : "12px 20px",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
        cursor: "pointer", whiteSpace: "nowrap",
        width: full ? "100%" : "auto",
        boxShadow: pressed ? `0 2px 0 ${edge}` : `0 5px 0 ${edge}, 0 12px 18px -10px ${edge}`,
        transform: pressed ? "translateY(3px)" : "translateY(0)",
        transition: "transform .12s, box-shadow .12s",
        ...style,
      }}
    >
      {children}{icon}
    </button>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────
export function Panel({
  children, style = {}, onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff", borderRadius: 26,
        border: `2px solid ${T.line}`,
        boxShadow: "0 12px 26px -14px rgba(120,80,40,.3)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Gold Medallion ────────────────────────────────────────────────────────
export function Medallion({
  img, pos = "center 30%", size = 120, icon, iconColor = T.mint, ring = 6, glow,
}: {
  img?: string;
  pos?: string;
  size?: number;
  icon?: string;
  iconColor?: string;
  ring?: number;
  glow?: boolean;
}) {
  return (
    <div style={{
      width: size, height: size, flex: "none", borderRadius: "50%", padding: ring,
      background: `radial-gradient(circle at 32% 26%, #FFE7AE, ${T.gold} 58%, ${T.goldE})`,
      boxShadow: glow
        ? `0 0 0 4px ${T.gold50}, 0 10px 20px -8px rgba(210,146,42,.7)`
        : "0 8px 16px -8px rgba(160,110,30,.6)",
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        overflow: "hidden", border: "2px solid #fff",
        background: T.cream, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {img
          ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
          : <span style={{ fontSize: size * 0.38 }}>{icon ?? "✦"}</span>
        }
      </div>
    </div>
  );
}

// ── XP Bar ────────────────────────────────────────────────────────────────
export function XPBar({ pct, color = T.gold, height = 12 }: { pct: number; color?: string; height?: number }) {
  return (
    <div style={{ height, borderRadius: 999, background: "rgba(0,0,0,.14)", boxShadow: "inset 0 1px 3px rgba(0,0,0,.25)", overflow: "hidden" }}>
      <div style={{ width: (pct * 100) + "%", height: "100%", background: `linear-gradient(${color}, ${color === T.gold ? T.goldE : T.mintE})`, borderRadius: 999 }} />
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────
export function Pill({
  children, bg = T.gold, fg = "#5a3d10", style = {},
}: {
  children: React.ReactNode;
  bg?: string;
  fg?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: T.fT, fontWeight: 800, fontSize: 13, color: fg,
      background: bg, borderRadius: 999, padding: "5px 11px",
      ...style,
    }}>
      {children}
    </span>
  );
}

// ── Section Title ─────────────────────────────────────────────────────────
export function SectionTitle({
  children, icon, color = T.goldE,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "4px 2px 12px" }}>
      {icon}
      <span style={{
        fontFamily: T.fT, fontWeight: 800, fontSize: 13,
        letterSpacing: ".12em", textTransform: "uppercase", color: T.ink2,
      }}>
        {children}
      </span>
      <div style={{
        flex: 1, height: 3, borderRadius: 3,
        background: `repeating-linear-gradient(90deg, ${color}, ${color} 6px, transparent 6px, transparent 12px)`,
        opacity: 0.5,
      }} />
    </div>
  );
}

// ── Icon SVG ─────────────────────────────────────────────────────────────
const PATHS: Record<string, string> = {
  "book-open":   '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "flame":       '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  "scroll-text": '<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
  "music":       '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  "shapes":      '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  "calendar":    '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "home":        '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  "user-round":  '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-left":  '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  "check":       '<path d="M20 6 9 17l-5-5"/>',
  "lock":        '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  "volume-2":    '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.8"/>',
  "play":        '<polygon points="6 3 20 12 6 21 6 3"/>',
  "crown":       '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
};
export function Icon({
  name, size = 22, color = "currentColor", stroke = 1.7, style = {},
}: {
  name: string; size?: number; color?: string; stroke?: number; style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: PATHS[name] ?? "" }}
    />
  );
}
