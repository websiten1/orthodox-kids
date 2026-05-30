"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AGE_RANGES = [
  { value: "1-2", label: "Clasele I-II (6-8 ani)" },
  { value: "3-4", label: "Clasele III-IV (9-10 ani)" },
  { value: "5-6", label: "Clasele V-VI (11-12 ani)" },
  { value: "7-8", label: "Clasele VII-VIII (13-14 ani)" },
];

const TEAM_NAMES_PRESETS = [
  ["Apostolii", "Îngerii"],
  ["Apostolii", "Mucenicii"],
  ["Proorocii", "Îngerii"],
  ["Apostolii", "Îngerii", "Mucenicii"],
  ["Proorocii", "Apostolii", "Sfinții", "Drepții"],
];

export default function GrupaNoua() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("1-2");
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(["Apostolii", "Îngerii"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<{ inviteCode: string; name: string } | null>(null);

  function updateTeamCount(n: number) {
    setNumTeams(n);
    const preset = TEAM_NAMES_PRESETS.find((p) => p.length === n) ?? TEAM_NAMES_PRESETS[0].slice(0, n);
    setTeamNames([...preset]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/parohie/grupe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ageRange, teamNames }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Eroare la creare.");
      return;
    }

    setCreated({ inviteCode: data.inviteCode, name: data.name });
  }

  if (created) {
    return (
      <div className="p-4 lg:p-8 max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center space-y-5">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Grupă creată cu succes!
          </h2>
          <p className="text-gray-600 font-sans">{created.name}</p>

          <div className="bg-crem rounded-2xl p-5 border-2 border-auriu">
            <p className="text-sm text-maro font-sans mb-2">
              Codul de invitație pentru copii:
            </p>
            <p className="text-4xl font-bold tracking-widest text-albastru font-sans">
              {created.inviteCode}
            </p>
            <p className="text-xs text-maro opacity-60 font-sans mt-2">
              Copiați și distribuiți acest cod copiilor și părinților
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(created.inviteCode)}
              className="flex-1 py-3 border-2 border-albastru text-albastru rounded-xl font-sans font-semibold"
            >
              Copiază codul
            </button>
            <button
              onClick={() => router.push("/parohie/grupe")}
              className="flex-1 py-3 bg-albastru text-white rounded-xl font-sans font-semibold"
            >
              Mergi la grupe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-lg">
      <div className="mb-6">
        <a href="/parohie/grupe" className="text-sm text-gray-400 font-sans hover:text-gray-600">
          ← Înapoi la grupe
        </a>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Grupă nouă
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Numele grupei
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans"
            placeholder="Ex: Clasa I-II, Grupul Mic"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Categoria de vârstă
          </label>
          <div className="space-y-2">
            {AGE_RANGES.map((ar) => (
              <label
                key={ar.value}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                  ${ageRange === ar.value ? "border-albastru bg-blue-50" : "border-gray-200"}`}
              >
                <input
                  type="radio"
                  name="ageRange"
                  value={ar.value}
                  checked={ageRange === ar.value}
                  onChange={() => setAgeRange(ar.value)}
                  className="accent-albastru"
                />
                <span className="font-sans text-sm text-gray-700">{ar.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Număr de echipe
          </label>
          <div className="flex gap-2">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateTeamCount(n)}
                className={`flex-1 py-2.5 rounded-xl border-2 font-sans font-semibold transition-all
                  ${numTeams === n ? "border-albastru bg-blue-50 text-albastru" : "border-gray-200 text-gray-600"}`}
              >
                {n} echipe
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Numele echipelor
          </label>
          <div className="space-y-2">
            {teamNames.map((name, i) => (
              <input
                key={i}
                type="text"
                value={name}
                onChange={(e) => {
                  const updated = [...teamNames];
                  updated[i] = e.target.value;
                  setTeamNames(updated);
                }}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans text-sm"
                placeholder={`Echipa ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-sans">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans
            hover:bg-albastru-deschis transition-all disabled:opacity-60"
        >
          {loading ? "Se creează..." : "Creare grupă"}
        </button>
      </form>
    </div>
  );
}
