"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CopilIntrare() {
  const router = useRouter();
  const [step, setStep] = useState<"code" | "existing">("code");
  const [groupCode, setGroupCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGroupCode(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/copil/verifica-cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupCode: groupCode.toUpperCase().trim() }),
      });
      let data: { groupName?: string; ageRange?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }
      if (!res.ok) { setError("Codul nu este valid. Cere codul corect de la profesor."); return; }
      sessionStorage.setItem("groupCode", groupCode.toUpperCase().trim());
      sessionStorage.setItem("groupName", data.groupName ?? "");
      sessionStorage.setItem("ageRange", data.ageRange ?? "");
      router.push("/copil/profil-nou");
    } catch { setError("Eroare de rețea. Verificați conexiunea."); }
    finally { setLoading(false); }
  }

  async function handleExistingLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/copil/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupCode: groupCode.toUpperCase().trim(),
          accessToken: accessToken.toUpperCase().trim(),
        }),
      });
      if (!res.ok) { setError("Date incorecte. Verificați codul clasei și codul personal."); return; }
      router.push("/copil/harta"); router.refresh();
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{ background: "linear-gradient(160deg, #E7F6FD 0%, #FFF9EE 100%)" }}
    >
      <div className="w-full max-w-xs flex flex-col items-center gap-8">

        {/* Header */}
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(145deg, #54C2F0, #2FA3D8)",
              boxShadow: "0 6px 0 #1A8CBF, 0 14px 20px -8px rgba(47,163,216,.5)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
              <path d="M21 6L21 36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M10 17L32 17" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Fredoka', system-ui", fontSize: 32, fontWeight: 700, color: "#403A4A", margin: 0 }}>
            Calea Luminii
          </h1>
          <p style={{ fontFamily: "'Nunito', system-ui", color: "#8A8296", fontWeight: 600, margin: "6px 0 0" }}>
            Bun venit! Hai să începem.
          </p>
        </div>

        {step === "code" && (
          <form onSubmit={handleGroupCode} className="w-full space-y-4">
            <div
              className="rounded-3xl p-6"
              style={{ background: "white", boxShadow: "0 8px 24px -10px rgba(120,80,160,.2)" }}
            >
              <p
                className="text-center mb-4"
                style={{ fontFamily: "'Fredoka', system-ui", fontSize: 18, fontWeight: 600, color: "#403A4A" }}
              >
                Introdu codul clasei tale
              </p>
              <input
                type="text"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                required
                maxLength={8}
                className="w-full text-center uppercase focus:outline-none"
                style={{
                  fontFamily: "'Fredoka', system-ui",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: "#403A4A",
                  border: "2.5px solid #EFEBF5",
                  borderRadius: 16,
                  padding: "16px 12px",
                  background: "#F4F1FA",
                  width: "100%",
                }}
                placeholder="ABCDEF"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {error && (
                <p
                  className="text-center mt-3 text-sm"
                  style={{ fontFamily: "'Nunito', system-ui", color: "#E85636", fontWeight: 700 }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || groupCode.length < 4}
              className="btn-candy btn-sky w-full text-lg"
              style={{ opacity: (loading || groupCode.length < 4) ? 0.6 : 1 }}
            >
              {loading ? "Se verifică..." : "Intră →"}
            </button>

            <button
              type="button"
              onClick={() => setStep("existing")}
              style={{ fontFamily: "'Nunito', system-ui", color: "#8A8296", fontWeight: 600, fontSize: 14, background: "none", border: "none", cursor: "pointer", width: "100%", padding: "8px 0" }}
            >
              Ai deja cont? Conectează-te
            </button>
          </form>
        )}

        {step === "existing" && (
          <form onSubmit={handleExistingLogin} className="w-full space-y-4">
            <div
              className="rounded-3xl p-6 space-y-4"
              style={{ background: "white", boxShadow: "0 8px 24px -10px rgba(120,80,160,.2)" }}
            >
              <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 20, fontWeight: 600, color: "#403A4A", textAlign: "center", margin: 0 }}>
                Conectare
              </p>
              {[
                { label: "Codul clasei", val: groupCode, set: setGroupCode, ph: "ABCDEF" },
                { label: "Codul tău personal", val: accessToken, set: setAccessToken, ph: "XXXXXXXX" },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 13, fontWeight: 700, color: "#8A8296", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    required
                    className="w-full text-center uppercase focus:outline-none"
                    style={{
                      fontFamily: "'Fredoka', system-ui",
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "#403A4A",
                      border: "2.5px solid #EFEBF5",
                      borderRadius: 14,
                      padding: "12px",
                      background: "#F4F1FA",
                      width: "100%",
                    }}
                    placeholder={ph}
                  />
                </div>
              ))}
              {error && (
                <p className="text-center text-sm" style={{ fontFamily: "'Nunito', system-ui", color: "#E85636", fontWeight: 700 }}>
                  {error}
                </p>
              )}
            </div>
            <button type="submit" disabled={loading} className="btn-candy btn-sky w-full text-lg" style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Se conectează..." : "Intră"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("code"); setError(""); }}
              style={{ fontFamily: "'Nunito', system-ui", color: "#8A8296", fontWeight: 600, fontSize: 14, background: "none", border: "none", cursor: "pointer", width: "100%", padding: "8px 0" }}
            >
              ← Înapoi
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
