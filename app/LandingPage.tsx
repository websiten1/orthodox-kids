"use client";

import React, { useState } from "react";

// ── Design tokens (exact from landing.jsx) ────────────────────────────────
const T = {
  coral: "#FF7A5C", coralE: "#E85636",
  pink:  "#FF6FB0", pinkE:  "#E84E96",
  mint:  "#3FD1A8", mintE:  "#22AE88",
  sky:   "#54C2F0", skyE:   "#2FA3D8",
  sun:   "#FFC23D", sunE:   "#EFA014",
  lilac: "#A77BF0", lilacE: "#8455D8",
  ink:   "#403A4A", ink2:   "#8A8296", ink3: "#BBB4C6",
  line:  "#EFEBF5", white:  "#fff",
  fD: "'Fredoka', system-ui, sans-serif",
  fT: "'Nunito', system-ui, sans-serif",
};

// ── Icon SVG paths (from landing.jsx) ────────────────────────────────────
const P: Record<string, string> = {
  "book-open":   '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "flame":       '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  "scroll-text": '<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
  "shapes":      '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "play":        '<polygon points="6 3 20 12 6 21 6 3"/>',
  "check":       '<path d="M20 6 9 17l-5-5"/>',
  "shield":      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  "star":        '<path d="M11.5 3.5 14 9l5.5.5-4 4 1 5.5-5-3-5 3 1-5.5-4-4L9 9z"/>',
  "menu":        '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>',
  "x":           '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
};

function Icon({ name, size = 24, color = "currentColor", stroke = 1.8, style = {} }: {
  name: string; size?: number; color?: string; stroke?: number; style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: P[name] ?? "" }}
    />
  );
}

// ── Sprinkles ─────────────────────────────────────────────────────────────
const SPRK = ["#FF6FB0", "#3FD1A8", "#54C2F0", "#FFC23D", "#FF7A5C", "#A77BF0"];
const PTS  = [[12,6],[60,12],[24,22],[80,30],[16,44],[52,52],[30,64],[78,72],[18,84],[46,92],[8,30],[68,46],[36,80],[88,16]];

function Sprinkles({ count = 14 }: { count?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PTS.slice(0, count).map((p, i) => (
        <span key={i} style={{
          position: "absolute", top: p[0] + "%", left: p[1] + "%",
          width: 13, height: 5, borderRadius: 5,
          background: SPRK[i % SPRK.length],
          transform: `rotate(${(i * 47) % 180}deg)`, opacity: 0.9,
        }} />
      ))}
    </div>
  );
}

// ── Gold Medallion ────────────────────────────────────────────────────────
function Medallion({ img, pos = "center 30%", size = 120, icon, iconColor = T.lilac, ring = 6, glow }: {
  img?: string; pos?: string; size?: number; icon?: string; iconColor?: string; ring?: number; glow?: boolean;
}) {
  return (
    <div style={{
      width: size, height: size, flex: "none", borderRadius: "50%", padding: ring,
      background: `radial-gradient(circle at 32% 26%, #FFE7AE, ${T.sun} 58%, ${T.sunE})`,
      boxShadow: glow
        ? `0 0 0 5px #FFF4D6, 0 16px 30px -12px rgba(239,160,20,.6)`
        : "0 10px 22px -10px rgba(239,160,20,.5)",
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        overflow: "hidden", border: "3px solid #fff", background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {img
          ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
          : <Icon name={icon!} size={size * 0.42} color={iconColor} stroke={1.9} />
        }
      </div>
    </div>
  );
}

// ── GButton ───────────────────────────────────────────────────────────────
type BtnColor = "coral" | "mint" | "sky" | "pink" | "sun" | "lilac" | "white";
const BMAP: Record<BtnColor, [string, string, string]> = {
  coral: [T.coral, T.coralE, "#fff"],
  mint:  [T.mint,  T.mintE,  "#fff"],
  sky:   [T.sky,   T.skyE,   "#fff"],
  pink:  [T.pink,  T.pinkE,  "#fff"],
  sun:   [T.sun,   T.sunE,   "#7a5200"],
  lilac: [T.lilac, T.lilacE, "#fff"],
  white: ["#fff",  "#E3DAF0", T.coral],
};

function GButton({ children, color = "coral", icon, big, href, style = {} }: {
  children: React.ReactNode; color?: BtnColor; icon?: string;
  big?: boolean; href?: string; style?: React.CSSProperties;
}) {
  const [bg, edge, fg] = BMAP[color];
  const [pressed, setPressed] = useState(false);

  const btnStyle: React.CSSProperties = {
    fontFamily: T.fD, fontWeight: 600, fontSize: big ? 18 : 16, color: fg,
    background: bg, border: "none", borderRadius: 18,
    padding: big ? "16px 30px" : "13px 24px",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
    cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
    boxShadow: pressed ? `0 2px 0 ${edge}` : `0 5px 0 ${edge}, 0 14px 22px -12px ${edge}`,
    transform: pressed ? "translateY(3px)" : "none",
    transition: "transform .12s, box-shadow .12s",
    ...style,
  };

  const events = {
    onMouseDown: () => setPressed(true),
    onMouseUp:   () => setPressed(false),
    onMouseLeave:() => setPressed(false),
    onTouchStart:() => setPressed(true),
    onTouchEnd:  () => setPressed(false),
  };

  if (href) return (
    <a href={href} style={btnStyle} {...events}>
      {children}{icon && <Icon name={icon} size={18} color={fg} stroke={2.2} />}
    </a>
  );

  return (
    <button style={btnStyle} {...events}>
      {children}{icon && <Icon name={icon} size={18} color={fg} stroke={2.2} />}
    </button>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────
const MAX = 1160;
function Container({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: MAX, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>;
}

// ── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Povești", "Sfinți", "Joc", "Pentru parohii"];

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)", borderBottom: `2px solid ${T.line}` }}>
      <Container style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 26, color: T.coral, textDecoration: "none", letterSpacing: ".01em" }}>
          Calea Luminii
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
          {links.map(l => (
            <a key={l} href={l === "Pentru parohii" ? "/parohie/login" : "#"}
              style={{ fontFamily: T.fT, fontWeight: 700, fontSize: 15, color: T.ink2, textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <GButton color="coral" href="/copil" style={{ padding: "11px 20px", fontSize: 15 }}>
            Intră în aplicație
          </GButton>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
          className="flex md:hidden">
          <Icon name={menuOpen ? "x" : "menu"} size={24} color={T.ink} stroke={2} />
        </button>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#fff", borderTop: `1px solid ${T.line}`, padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {links.map(l => (
            <a key={l} href={l === "Pentru parohii" ? "/parohie/login" : "#"} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: T.fT, fontWeight: 700, fontSize: 17, color: T.ink, textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <GButton color="coral" href="/copil" big>Intră în aplicație</GButton>
        </div>
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Sprinkles count={14} />
      <Container style={{ position: "relative", padding: "60px 24px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }} className="md:grid-cols-hero">
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.fD, fontWeight: 600, fontSize: 14, color: T.mintE, background: "#E4FAF3", borderRadius: 999, padding: "7px 15px" }}>
              <Icon name="star" size={15} color={T.mintE} stroke={2} /> Pentru copii 4–12 ani
            </span>
            <h1 style={{ fontFamily: T.fD, fontWeight: 700, fontSize: "clamp(38px, 6vw, 62px)", lineHeight: 1.06, color: T.ink, margin: 0 }}>
              Descoperă credința,<br />cu bucurie!
            </h1>
            <p style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 18, lineHeight: 1.55, color: T.ink2, maxWidth: 430, margin: 0 }}>
              Povești ale sfinților, marile sărbători, primele rugăciuni și un joc vesel — o călătorie întreagă pentru copii.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <GButton color="coral" icon="arrow-right" big href="/copil">
                Intră în aplicație
              </GButton>
              <GButton color="sky" icon="play" big href="/parohie/login">
                Sunt parohie
              </GButton>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: T.fT, fontWeight: 700, fontSize: 14, color: T.ink2, flexWrap: "wrap" }}>
              {["Gratuit la start", "Fără reclame", "Sigur pentru copii"].map(t => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="check" size={16} color={T.mint} stroke={2.6} /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Medallion cluster */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 320, marginTop: 16 }}>
            <div style={{ position: "absolute", left: "8%", top: "6%" }}>
              <Medallion img="/assets/mosaic-empress.jpg" pos="center 32%" size={110} />
            </div>
            <div style={{ position: "absolute", right: "6%", top: "2%" }}>
              <Medallion img="/assets/mosaic-angel.jpg" pos="center 38%" size={120} />
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <Medallion img="/assets/mosaic-king.jpg" pos="center 26%" size={180} glow />
            </div>
            <div style={{ position: "absolute", right: "14%", bottom: "6%" }}>
              <span style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 13, color: "#fff", background: T.pink, borderRadius: 999, padding: "7px 14px", boxShadow: `0 4px 0 ${T.pinkE}`, whiteSpace: "nowrap" }}>
                Sfântul Ștefan
              </span>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media(min-width: 768px) {
          .md\\:grid-cols-hero { grid-template-columns: 1.05fr .95fr !important; }
          .hidden { display: none !important; }
          .md\\:flex { display: flex !important; }
        }
        @media(max-width: 767px) {
          .hidden { display: flex !important; }
          .md\\:flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Features ──────────────────────────────────────────────────────────────
function Features() {
  const FEAT: [string, string, string, string, string][] = [
    ["book-open",   "Povești",    "#54C2F0", "#2FA3D8", "Povești sfinte citite cu voce tare, împreună cu icoane reale."],
    ["scroll-text", "Sfinți",     "#A77BF0", "#8455D8", "Cunoaște sfinții ca eroi de colecționat și de ținut minte."],
    ["flame",       "Rugăciuni",  "#FF7A5C", "#E85636", "Rugăciuni de dimineață și seară, învățate câte un rând."],
    ["shapes",      "Joc",        "#3FD1A8", "#22AE88", "Un joc calm — Turnul Credinței, câștigă talanți de aur."],
  ];

  return (
    <Container style={{ padding: "16px 24px 72px" }}>
      <h2 style={{ fontFamily: T.fD, fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: T.ink, textAlign: "center", margin: "0 0 8px" }}>
        O lume întreagă de explorat
      </h2>
      <p style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 17, color: T.ink2, textAlign: "center", margin: "0 0 44px" }}>
        Luminos, blând și plin de minunăție.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
        {FEAT.map(([ic, title, c, cE, desc]) => (
          <div key={title} style={{
            background: "#fff", borderRadius: 26, border: `2px solid ${T.line}`,
            boxShadow: "0 14px 30px -18px rgba(120,80,160,.3)",
            padding: "26px 22px", display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div style={{ width: 58, height: 58, borderRadius: 20, background: c, boxShadow: `0 5px 0 ${cE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={ic} size={28} color="#fff" stroke={1.9} />
            </div>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 22, color: T.ink }}>{title}</div>
            <div style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 14.5, lineHeight: 1.5, color: T.ink2 }}>{desc}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}

// ── Journey ───────────────────────────────────────────────────────────────
function Journey() {
  const STEPS: [string, string, string][] = [
    ["1", "Alege o poveste",  "#FF7A5C"],
    ["2", "Citește & ascultă","#54C2F0"],
    ["3", "Joacă jocul",      "#3FD1A8"],
    ["4", "Câștigă un talant","#FFC23D"],
  ];

  return (
    <div style={{ background: "#FBF8FF", borderTop: `2px solid ${T.line}`, borderBottom: `2px solid ${T.line}`, position: "relative", overflow: "hidden" }}>
      <Sprinkles count={12} />
      <Container style={{ position: "relative", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: T.fD, fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: T.ink, margin: "0 0 40px" }}>
          O mică călătorie, în fiecare zi
        </h2>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {STEPS.map(([n, t, c], i) => (
            <React.Fragment key={n}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 140 }}>
                <div style={{ width: 74, height: 74, borderRadius: "50%", background: c, boxShadow: "0 6px 0 rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.fD, fontWeight: 700, fontSize: 30, color: "#fff" }}>
                  {n}
                </div>
                <div style={{ fontFamily: T.fD, fontWeight: 600, fontSize: 16, color: T.ink }}>{t}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: "none", width: 32, height: 4, borderRadius: 4, marginTop: 35, background: `repeating-linear-gradient(90deg, ${T.line}, ${T.line} 6px, transparent 6px, transparent 12px)` }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  );
}

// ── Parents section ───────────────────────────────────────────────────────
function Parents() {
  const PTS = [
    "Nicio reclamă, niciodată.",
    "Zero tracking al copiilor.",
    "Limite blânde de timp la ecran.",
    "Scris în vocea Bisericii Ortodoxe.",
  ];

  return (
    <Container style={{ padding: "72px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }} className="md:grid-parents">
        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
          <span style={{ fontFamily: T.fD, fontWeight: 600, fontSize: 14, color: T.lilacE, background: "#F3ECFE", borderRadius: 999, padding: "7px 15px" }}>
            Pentru adulți
          </span>
          <h2 style={{ fontFamily: T.fD, fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.1, color: T.ink, margin: 0 }}>
            Un loc sigur în care poți avea încredere
          </h2>
          <p style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 17, lineHeight: 1.55, color: T.ink2, maxWidth: 440, margin: 0 }}>
            Calea Luminii e făcută să poți pune telefonul în mâna copilului fără griji — luminos, blând, fără reclame și fidel tradiției.
          </p>
          <GButton color="lilac" icon="arrow-right" href="/parohie/login">
            Sunt parohie / profesor
          </GButton>
        </div>

        {/* Trust card */}
        <div style={{ background: "#fff", borderRadius: 28, border: `2px solid ${T.line}`, boxShadow: "0 18px 40px -22px rgba(120,80,160,.35)", padding: "28px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: T.mint, boxShadow: `0 4px 0 ${T.mintE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="shield" size={24} color="#fff" stroke={1.9} />
            </div>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 22, color: T.ink }}>Promisiunea noastră</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PTS.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 26, height: 26, flex: "none", borderRadius: 999, background: T.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={15} color="#fff" stroke={2.8} />
                </div>
                <span style={{ fontFamily: T.fT, fontWeight: 700, fontSize: 15.5, color: T.ink }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(min-width: 768px) {
          .md\\:grid-parents { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </Container>
  );
}

// ── CTA Band ──────────────────────────────────────────────────────────────
function CtaBand() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(120deg, #FF7A5C, #FF6FB0)" }}>
      <Sprinkles count={12} />
      <Container style={{ position: "relative", padding: "62px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: T.fD, fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", margin: 0 }}>
          Începeți aventura astăzi
        </h2>
        <p style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 18, color: "rgba(255,255,255,.92)", margin: "12px auto 26px", maxWidth: 460 }}>
          O poveste, o rugăciune, un sfânt de întâlnit — câteva minute fericite în fiecare zi.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <GButton color="white" icon="arrow-right" big href="/copil">Intră în aplicație</GButton>
          <GButton color="sun" big href="/parohie/login">Pentru parohii</GButton>
        </div>
      </Container>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const COLS: [string, string[]][] = [
    ["Descoperă", ["Povești", "Sfinți", "Sărbători", "Rugăciuni"]],
    ["Aplicație",  ["Intră în joc", "Turnul Credinței", "Ce e nou"]],
    ["Parohie",   ["Pentru parohii", "Promisiunea noastră", "Ajutor"]],
  ];

  return (
    <div style={{ background: "#fff", borderTop: `2px solid ${T.line}` }}>
      <div style={{ maxWidth: MAX, margin: "0 auto", padding: "52px 24px 36px", display: "grid", gridTemplateColumns: "1fr", gap: 36 }} className="md:grid-footer">
        <div>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 22, color: T.coral }}>Calea Luminii</div>
          <p style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 15, color: T.ink2, marginTop: 8 }}>
            povești, rugăciuni și sfinți pentru copii
          </p>
        </div>
        {COLS.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: T.ink3, marginBottom: 13 }}>
              {h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map(item => (
                <a key={item} href="#" style={{ fontFamily: T.fT, fontWeight: 600, fontSize: 15, color: T.ink2, textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: MAX, margin: "0 auto", padding: "0 24px 36px" }}>
        <div style={{ borderTop: `2px solid ${T.line}`, paddingTop: 20, fontFamily: T.fT, fontWeight: 600, fontSize: 13, color: T.ink3 }}>
          © 2026 Calea Luminii · Făcut cu dragoste pentru cei mici
        </div>
      </div>

      <style>{`
        @media(min-width: 768px) {
          .md\\:grid-footer { grid-template-columns: 1.4fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Main landing page ─────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ background: "#fff" }}>
      <Nav />
      <Hero />
      <Features />
      <Journey />
      <Parents />
      <CtaBand />
      <Footer />
    </div>
  );
}
