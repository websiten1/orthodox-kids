"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParohieInregistrarePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", city: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(k: string) { return (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) { setError("Parolele nu coincid."); return; }
    if (form.password.length < 8) { setError("Parola trebuie să aibă cel puțin 8 caractere."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/parohie/inregistrare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, city: form.city, email: form.email, password: form.password }),
      });
      let data: { error?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }
      if (!res.ok) { setError(data.error ?? `Eroare (${res.status}).`); return; }
      router.push("/parohie/dashboard"); router.refresh();
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  const fields = [
    { key: "name",            label: "Numele parohiei", type: "text",     ph: "Parohia Sf. Ioan Botezătorul" },
    { key: "city",            label: "Orașul",          type: "text",     ph: "Cluj-Napoca" },
    { key: "email",           label: "Email",           type: "email",    ph: "parohia@exemplu.ro" },
    { key: "password",        label: "Parolă",          type: "password", ph: "Minimum 8 caractere" },
    { key: "confirmPassword", label: "Confirmați parola", type: "password", ph: "Repetați parola" },
  ];

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FBF6EC", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18, background: "#A43234",
            margin: "0 auto 14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 0 #8A2A2C, 0 12px 20px -6px rgba(164,50,52,.4)",
          }}>
            <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
              <path d="M21 6L21 36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M10 17L32 17" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "#403A4A", margin: "0 0 4px" }}>
            Înregistrare Parohie
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8A8296", fontWeight: 600, margin: 0 }}>
            Gratuit · Fără card
          </p>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: "28px 24px", boxShadow: "0 8px 32px -12px rgba(164,50,52,.15)", border: "1px solid #ECE3D2" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {fields.map(({ key, label, type, ph }) => (
              <div key={key}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A8296", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 7px" }}>
                  {label}
                </p>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={set(key)}
                  required
                  placeholder={ph}
                  minLength={key === "password" ? 8 : undefined}
                  style={{
                    width: "100%", padding: "12px 15px",
                    borderRadius: 12, border: "1.5px solid #ECE3D2",
                    fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 600,
                    color: "#403A4A", background: "#FDFAF5", outline: "none",
                    boxSizing: "border-box", transition: "border-color .15s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#A43234"}
                  onBlur={e => e.target.style.borderColor = "#ECE3D2"}
                />
              </div>
            ))}

            {error && (
              <div style={{ background: "#FDF2F2", border: "1.5px solid #F5C6C6", borderRadius: 12, padding: "10px 14px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#A43234" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-candy btn-red"
              style={{ marginTop: 4, opacity: loading ? 0.65 : 1, fontSize: 16 }}
            >
              {loading ? "Se creează contul..." : "Creează cont parohie"}
            </button>

            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#BBB4C6", fontWeight: 600, textAlign: "center", margin: 0 }}>
              Prin înregistrare acceptați termenii de utilizare și politica GDPR.
            </p>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 600 }}>
          Aveți deja cont?{" "}
          <a href="/parohie/login" style={{ color: "#A43234", fontWeight: 800, textDecoration: "none" }}>
            Conectați-vă
          </a>
        </p>
      </div>
    </main>
  );
}
