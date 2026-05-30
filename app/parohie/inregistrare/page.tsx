"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParohieInregistrarePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }
    if (form.password.length < 8) {
      setError("Parola trebuie să aibă cel puțin 8 caractere.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/parohie/inregistrare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          email: form.email,
          password: form.password,
        }),
      });

      let data: { error?: string } = {};
      try { data = await res.json(); } catch { /* ignore parse error */ }

      if (!res.ok) {
        setError(data.error ?? `Eroare server (${res.status}). Verificați că baza de date e configurată.`);
        return;
      }

      router.push("/parohie/dashboard");
      router.refresh();
    } catch (err) {
      setError("Eroare de rețea. Verificați conexiunea și încercați din nou.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-crem">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-4xl">✦</a>
          <h1 className="text-3xl font-bold text-albastru mt-3">
            Înregistrare Parohie
          </h1>
          <p className="text-maro mt-1 text-sm">
            Creați contul parohiei dvs. gratuit
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-md border border-crem-inchis space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Numele parohiei
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans transition-colors"
              placeholder="Parohia Sf. Ioan Botezătorul"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Orașul
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans transition-colors"
              placeholder="Cluj-Napoca"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans transition-colors"
              placeholder="parohia@exemplu.ro"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Parolă
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans transition-colors"
              placeholder="Minimum 8 caractere"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-maro mb-2 font-sans">
              Confirmați parola
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans transition-colors"
              placeholder="Repetați parola"
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
            className="w-full py-4 rounded-xl bg-rosu text-white font-semibold text-lg font-sans
              hover:bg-rosu-deschis transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Se creează contul..." : "Creează cont parohie"}
          </button>

          <p className="text-xs text-center text-maro opacity-60 font-sans">
            Prin înregistrare confirmați că ați citit și acceptat termenii de utilizare și politica GDPR.
          </p>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-maro font-sans">
            Aveți deja cont?{" "}
            <a
              href="/parohie/login"
              className="text-albastru font-semibold hover:underline"
            >
              Conectați-vă
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
