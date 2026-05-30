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
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/parohie/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Date incorecte. Verificați email și parola.");
      setLoading(false);
      return;
    }

    router.push("/parohie/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-crem">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-4xl">✦</a>
          <h1 className="text-3xl font-bold text-albastru mt-3">
            Parohie / Profesor
          </h1>
          <p className="text-maro mt-1 text-sm">
            Conectați-vă pentru a gestiona grupa
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-md border border-crem-inchis space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Adresă email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none text-foreground font-sans transition-colors"
              placeholder="parohia@exemplu.ro"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Parolă
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none text-foreground font-sans transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-sans">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-albastru text-white font-semibold text-lg font-sans
              hover:bg-albastru-deschis transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Se conectează..." : "Conectare"}
          </button>
        </form>

        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-maro font-sans">
            Parohie nouă?{" "}
            <a
              href="/parohie/inregistrare"
              className="text-albastru font-semibold hover:underline"
            >
              Înregistrați-vă gratuit
            </a>
          </p>
          <a href="/" className="text-sm text-maro opacity-60 hover:opacity-100 font-sans">
            ← Înapoi la pagina principală
          </a>
        </div>
      </div>
    </main>
  );
}
