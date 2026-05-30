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

  // Verifică codul de grupă — dacă e valid, merge la creare profil sau login
  async function handleGroupCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/copil/verifica-cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupCode: groupCode.toUpperCase().trim() }),
      });

      let data: { groupName?: string; ageRange?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }

      if (!res.ok) {
        setError("Codul nu este valid. Cereți codul corect de la profesor.");
        return;
      }

      sessionStorage.setItem("groupCode", groupCode.toUpperCase().trim());
      sessionStorage.setItem("groupName", data.groupName ?? "");
      sessionStorage.setItem("ageRange", data.ageRange ?? "");
      router.push("/copil/profil-nou");
    } catch {
      setError("Eroare de rețea. Verificați conexiunea la internet.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExistingLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/copil/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupCode: groupCode.toUpperCase().trim(),
          accessToken: accessToken.toUpperCase().trim(),
        }),
      });

      if (!res.ok) {
        setError("Date incorecte. Verificați codul clasei și codul personal.");
        return;
      }

      router.push("/copil/harta");
      router.refresh();
    } catch {
      setError("Eroare de rețea. Verificați conexiunea la internet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-crem">
      <div className="w-full max-w-sm">
        {/* Header ilustrat */}
        <div className="text-center mb-8 space-y-2">
          <div className="text-7xl">⛪</div>
          <h1 className="text-3xl font-bold text-albastru">Calea Luminii</h1>
          <p className="text-maro text-sm">Bun venit! Hai să începem.</p>
        </div>

        {step === "code" && (
          <form onSubmit={handleGroupCode} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-crem-inchis">
              <label className="block text-center text-lg font-bold text-albastru mb-4">
                Introdu codul clasei tale
              </label>
              <input
                type="text"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                required
                maxLength={8}
                className="w-full px-4 py-4 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none
                  text-center text-3xl font-bold tracking-widest uppercase font-sans transition-colors"
                placeholder="ABCDEF"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {error && (
                <p className="mt-3 text-center text-red-600 text-sm font-sans">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || groupCode.length < 4}
              className="w-full py-5 rounded-2xl bg-albastru text-white font-bold text-xl
                hover:bg-albastru-deschis transition-all active:scale-95
                disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Se verifică..." : "Intră →"}
            </button>

            <button
              type="button"
              onClick={() => setStep("existing")}
              className="w-full text-sm text-maro opacity-60 hover:opacity-100 font-sans py-2"
            >
              Ai deja cont? Conectează-te
            </button>
          </form>
        )}

        {step === "existing" && (
          <form onSubmit={handleExistingLogin} className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-crem-inchis space-y-4">
              <h2 className="text-center text-lg font-bold text-albastru">
                Conectare
              </h2>

              <div>
                <label className="block text-sm font-semibold text-maro mb-2 font-sans">
                  Codul clasei
                </label>
                <input
                  type="text"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none
                    text-center text-xl font-bold tracking-widest uppercase font-sans"
                  placeholder="ABCDEF"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-maro mb-2 font-sans">
                  Codul tău personal
                </label>
                <input
                  type="text"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none
                    text-center text-xl font-bold tracking-widest uppercase font-sans"
                  placeholder="Codul tău"
                />
              </div>

              {error && (
                <p className="text-center text-red-600 text-sm font-sans">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-albastru text-white font-bold text-xl
                hover:bg-albastru-deschis transition-all active:scale-95 shadow-lg"
            >
              {loading ? "Se conectează..." : "Intră"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("code"); setError(""); }}
              className="w-full text-sm text-maro opacity-60 hover:opacity-100 font-sans py-2"
            >
              ← Înapoi
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
