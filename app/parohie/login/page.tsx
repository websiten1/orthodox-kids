"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParohieLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/parohie/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data: { error?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }
      if (!res.ok) { setError(data.error ?? "Email sau parolă incorectă."); return; }
      router.push("/parohie/dashboard"); router.refresh();
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", background: "#FBF6EC" }}>
      {/* Left red panel (desktop) */}
      <div style={{
        display: "none",
        width: "42%", background: "#A43234",
        flexDirection: "column", justifyContent: "center",
        padding: "60px 48px",
      }} className="lg-flex">
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 12 }}>
          CALEA LUMINII
        </p>
        <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 42, fontWeight: 700, color: "white", lineHeight: 1.1, margin: "0 0 20px" }}>
          Platformă de cateheză pentru copii
        </h1>
        <div style={{ width: 40, height: 2, background: "#B58A3C", marginBottom: 20 }} />
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: "rgba(255,255,255,.75)", fontWeight: 600, lineHeight: 1.65 }}>
          Transformați cateheza într-o experiență interactivă pentru clasele I–VIII.
        </p>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Logo mobile */}
          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: "#A43234", margin: "0 auto 14px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 0 #8A2A2C, 0 12px 20px -6px rgba(164,50,52,.4)",
            }}>
              <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
                <path d="M21 6L21 36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M10 17L32 17" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "#403A4A", margin: "0 0 4px" }}>
              Bine ați venit
            </h1>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8A8296", fontWeight: 600, margin: 0 }}>
              Contul parohiei / profesorului
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Adresă email", type: "email", val: email, set: setEmail, ph: "parohia@exemplu.ro" },
              { label: "Parolă", type: "password", val: password, set: setPassword, ph: "••••••••" },
            ].map(({ label, type, val, set, ph }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A8296", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 7px" }}>
                  {label}
                </p>
                <input
                  type={type}
                  value={val}
                  onChange={e => set(e.target.value)}
                  required
                  placeholder={ph}
                  style={{
                    width: "100%", padding: "13px 16px",
                    borderRadius: 14, border: "1.5px solid #ECE3D2",
                    fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 600,
                    color: "#403A4A", background: "white", outline: "none",
                    transition: "border-color .15s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#A43234"}
                  onBlur={e => e.target.style.borderColor = "#ECE3D2"}
                />
              </div>
            ))}

            {error && (
              <div style={{
                background: "#FDF2F2", border: "1.5px solid #F5C6C6",
                borderRadius: 12, padding: "10px 14px",
                fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#A43234",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-candy btn-red"
              style={{ marginTop: 4, opacity: loading ? 0.65 : 1, fontSize: 17 }}
            >
              {loading ? "Se conectează..." : "Conectare"}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 600 }}>
              Parohie nouă?{" "}
              <a href="/parohie/inregistrare" style={{ color: "#A43234", fontWeight: 800, textDecoration: "none" }}>
                Înregistrați-vă gratuit
              </a>
            </p>
            <a href="/" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#BBB4C6", fontWeight: 600, textDecoration: "none", display: "block", marginTop: 10 }}>
              ← Pagina principală
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(min-width: 1024px) { .lg-flex { display: flex !important; } }
      `}</style>
    </main>
  );
}
