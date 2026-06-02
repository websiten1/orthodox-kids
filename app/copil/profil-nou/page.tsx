"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AVATAR_COLORS = [
  { value: "sky",   bg: "#54C2F0", edge: "#2FA3D8" },
  { value: "coral", bg: "#FF7A5C", edge: "#E85636" },
  { value: "mint",  bg: "#3FD1A8", edge: "#22AE88" },
  { value: "sun",   bg: "#FFC23D", edge: "#EFA014" },
  { value: "grape", bg: "#A77BF0", edge: "#8455D8" },
];

const AVATAR_EMOJIS = ["🧒", "👦", "👧", "👶", "🙍‍♂️", "🙍‍♀️"];

export default function ProfilNouPage() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [initial, setInitial] = useState("");
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = sessionStorage.getItem("groupCode");
    if (!code) { router.push("/copil"); return; }
    setGroupCode(code);
    setGroupName(sessionStorage.getItem("groupName") ?? "");
  }, [router]);

  const color = AVATAR_COLORS[colorIdx];
  const displayName = firstName.trim()
    ? `${firstName.trim()}${initial.trim() ? " " + initial.trim().toUpperCase() + "." : ""}`
    : "Numele tău";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName.trim()) { setError("Introdu prenumele tău."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/copil/inregistrare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupCode,
          firstName: firstName.trim(),
          initial: initial.trim().toUpperCase(),
          avatarConfig: { avatarIdx, colorIdx, color: color.value },
        }),
      });
      let data: { error?: string; accessToken?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }
      if (!res.ok) { setError(data.error ?? `Eroare (${res.status}).`); return; }
      sessionStorage.setItem("newChildToken", data.accessToken ?? "");
      router.push("/copil/profil-nou/token");
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 py-8"
      style={{ background: "linear-gradient(160deg, #E7F6FD 0%, #FFF9EE 100%)" }}
    >
      <div className="w-full max-w-xs">

        {/* Avatar preview */}
        <div className="text-center mb-6">
          <div
            className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-5xl mb-3 transition-all"
            style={{
              background: `linear-gradient(145deg, ${color.bg}, ${color.edge})`,
              boxShadow: `0 6px 0 ${color.edge}, 0 14px 20px -8px ${color.bg}88`,
            }}
          >
            {AVATAR_EMOJIS[avatarIdx]}
          </div>
          <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 22, fontWeight: 700, color: "#403A4A" }}>
            {displayName}
          </p>
          {groupName && (
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, color: "#8A8296", fontWeight: 600 }}>
              {groupName}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 8px 24px -10px rgba(120,80,160,.18)" }}>

            {/* Name input */}
            <div className="mb-4">
              <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, fontWeight: 700, color: "#8A8296", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Prenumele tău
              </p>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                maxLength={30}
                autoFocus
                className="w-full text-center focus:outline-none"
                style={{
                  fontFamily: "'Fredoka', system-ui",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#403A4A",
                  border: "2.5px solid #EFEBF5",
                  borderRadius: 14,
                  padding: "12px 16px",
                  background: "#F4F1FA",
                  width: "100%",
                }}
                placeholder="ex: Andrei"
              />
            </div>

            {/* Initial */}
            <div className="mb-5">
              <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, fontWeight: 700, color: "#8A8296", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Prima literă a numelui de familie
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value.slice(0, 1))}
                  maxLength={1}
                  className="text-center focus:outline-none uppercase"
                  style={{
                    fontFamily: "'Fredoka', system-ui",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#403A4A",
                    border: "2.5px solid #EFEBF5",
                    borderRadius: 14,
                    padding: "12px",
                    background: "#F4F1FA",
                    width: 64,
                    flexShrink: 0,
                  }}
                  placeholder="M"
                />
                <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 12, color: "#BBB4C6", fontWeight: 600, alignSelf: "center" }}>
                  Opțional — pentru a te deosebi de colegii cu același prenume
                </p>
              </div>
            </div>

            {/* Avatar selector */}
            <div className="mb-4">
              <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, fontWeight: 700, color: "#8A8296", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Alege avatarul
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
                {AVATAR_EMOJIS.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatarIdx(i)}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 12,
                      background: avatarIdx === i ? color.bg : "#F4F1FA",
                      border: avatarIdx === i ? `2px solid ${color.edge}` : "2px solid transparent",
                      fontSize: 22,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .15s",
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div>
              <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, fontWeight: 700, color: "#8A8296", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Culoarea preferată
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {AVATAR_COLORS.map((c, i) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColorIdx(i)}
                    style={{
                      width: 36, height: 36,
                      borderRadius: "50%",
                      background: c.bg,
                      border: colorIdx === i ? `3px solid #403A4A` : "3px solid transparent",
                      boxShadow: colorIdx === i ? `0 0 0 2px white, 0 0 0 4px ${c.bg}` : "none",
                      cursor: "pointer",
                      transition: "all .15s",
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {error && (
            <p style={{ fontFamily: "'Nunito', system-ui", color: "#E85636", fontWeight: 700, textAlign: "center", fontSize: 14 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !firstName.trim()}
            className="btn-candy w-full text-lg"
            style={{
              background: color.bg,
              boxShadow: `0 5px 0 ${color.edge}, 0 14px 20px -10px ${color.bg}88, inset 0 2px 0 rgba(255,255,255,.35)`,
              opacity: (loading || !firstName.trim()) ? 0.6 : 1,
            }}
          >
            {loading ? "Se creează profilul..." : "Gata! Intru în joc →"}
          </button>
        </form>
      </div>
    </main>
  );
}
