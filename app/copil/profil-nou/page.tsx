"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AVATAR_TYPES = ["👦", "👧", "🧒", "👶", "🙍‍♂️", "🙍‍♀️"];
const AVATAR_COLORS = [
  { name: "Albastru", value: "albastru", bg: "#1B3A6B" },
  { name: "Roșu", value: "rosu", bg: "#8B1A1A" },
  { name: "Auriu", value: "auriu", bg: "#C9A84C" },
  { name: "Verde", value: "verde", bg: "#2D5A1B" },
  { name: "Mov", value: "mov", bg: "#4A0E8F" },
];

export default function ProfilNouPage() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [initial, setInitial] = useState("");
  const [avatarType, setAvatarType] = useState(0);
  const [avatarColor, setAvatarColor] = useState("albastru");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = sessionStorage.getItem("groupCode");
    const name = sessionStorage.getItem("groupName");
    if (!code) {
      router.push("/copil");
      return;
    }
    setGroupCode(code);
    setGroupName(name ?? "");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) {
      setError("Introdu prenumele tău.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/copil/inregistrare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupCode,
        firstName: firstName.trim(),
        initial: initial.trim().toUpperCase(),
        avatarConfig: { avatarType, clothingColor: avatarColor },
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Eroare. Încercați din nou.");
      return;
    }

    // Afișăm tokenul personal copilului
    sessionStorage.setItem("newChildToken", data.accessToken);
    router.push("/copil/profil-nou/token");
  }

  const displayName = firstName.trim()
    ? `${firstName.trim()}${initial.trim() ? " " + initial.trim().toUpperCase() + "." : ""}`
    : "Numele tău";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-crem">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl">{AVATAR_TYPES[avatarType]}</div>
          <h2 className="text-2xl font-bold text-albastru mt-2">{displayName}</h2>
          <p className="text-maro text-sm mt-1">
            {groupName ? `Clasa: ${groupName}` : "Creează-ți profilul"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md border border-crem-inchis space-y-5">
          <div>
            <label className="block text-sm font-bold text-maro mb-2 font-sans">
              Prenumele tău
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              maxLength={30}
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans text-lg text-center"
              placeholder="Ex: Andrei"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-maro mb-2 font-sans">
              Prima literă a numelui de familie
            </label>
            <input
              type="text"
              value={initial}
              onChange={(e) => setInitial(e.target.value.slice(0, 1))}
              maxLength={1}
              className="w-full px-4 py-3 rounded-xl border-2 border-crem-inchis focus:border-auriu focus:outline-none font-sans text-lg text-center uppercase"
              placeholder="M."
            />
            <p className="text-xs text-maro opacity-60 mt-1 font-sans text-center">
              Opțional — pentru a te deosebi de colegii cu același prenume
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-maro mb-3 font-sans">
              Alege avatarul tău
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_TYPES.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatarType(i)}
                  className={`h-12 w-full rounded-xl text-2xl flex items-center justify-center transition-all
                    ${avatarType === i
                      ? "bg-auriu shadow-md scale-110 ring-2 ring-auriu"
                      : "bg-crem hover:bg-crem-inchis"
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-maro mb-3 font-sans">
              Culoarea ta preferată
            </label>
            <div className="flex gap-3 justify-center">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setAvatarColor(color.value)}
                  title={color.name}
                  className={`h-10 w-10 rounded-full transition-all
                    ${avatarColor === color.value ? "scale-125 ring-2 ring-offset-2 ring-maro" : ""}`}
                  style={{ backgroundColor: color.bg }}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-sans text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !firstName.trim()}
            className="w-full py-4 rounded-xl bg-rosu text-white font-bold text-lg font-sans
              hover:bg-rosu-deschis transition-all active:scale-95 shadow-md
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Se creează profilul..." : "Gata! Intru în joc →"}
          </button>
        </form>
      </div>
    </main>
  );
}
