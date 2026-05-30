"use client";

import { useState } from "react";

type Saint = {
  id: string;
  name: string;
  feastDay: string;
  virtue: string;
  storyShort: string;
  iconUrl: string;
  region: string;
  difficulty: string;
  owned: boolean;
};

type Props = {
  saints: Saint[];
  totalOwned: number;
};

export default function SaintsCollection({ saints, totalOwned }: Props) {
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [filterRegion, setFilterRegion] = useState<"all" | "roman" | "universal">("all");

  const filteredSaints =
    filterRegion === "all"
      ? saints
      : saints.filter((s) => s.region === filterRegion);

  return (
    <div className="min-h-screen bg-crem flex flex-col">
      <header className="bg-albastru text-white px-4 py-5">
        <h1 className="text-2xl font-bold">Sfinții mei</h1>
        <p className="text-sm opacity-80 font-sans mt-0.5">
          {totalOwned} din {saints.length} sfinți descoperiți
        </p>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-white bg-opacity-20 rounded-full">
          <div
            className="h-full bg-auriu rounded-full transition-all"
            style={{ width: `${(totalOwned / Math.max(saints.length, 1)) * 100}%` }}
          />
        </div>
      </header>

      {/* Filtre */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-crem-inchis">
        {(["all", "roman", "universal"] as const).map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-3 py-1.5 rounded-xl text-sm font-semibold font-sans transition-all
              ${filterRegion === region
                ? "bg-albastru text-white"
                : "bg-crem text-maro hover:bg-crem-inchis"
              }`}
          >
            {region === "all" ? "Toți" : region === "roman" ? "Români" : "Universali"}
          </button>
        ))}
      </div>

      {/* Grid cărți */}
      <div className="flex-1 px-4 py-4 grid grid-cols-3 gap-3">
        {filteredSaints.map((saint) => (
          <button
            key={saint.id}
            onClick={() => {
              setSelectedSaint(saint);
              setShowBack(false);
            }}
            disabled={!saint.owned}
            className={`aspect-[3/4] rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all
              ${saint.owned
                ? "bg-white border-auriu shadow-md hover:shadow-lg active:scale-95"
                : "bg-crem-inchis border-gray-200 opacity-50"
              }`}
          >
            <div className="text-3xl">
              {saint.owned ? (
                saint.iconUrl.startsWith("http") ? (
                  <img
                    src={saint.iconUrl}
                    alt={saint.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  saint.iconUrl
                )
              ) : (
                <span className="opacity-30">👤</span>
              )}
            </div>
            {saint.owned && (
              <span className="text-xs font-bold text-maro text-center px-1 leading-tight font-sans">
                {saint.name}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modal detalii sfânt */}
      {selectedSaint && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedSaint(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!showBack ? (
              // Față
              <div className="bg-gradient-to-b from-albastru to-albastru-deschis text-white p-6 text-center space-y-3">
                <div className="text-6xl mx-auto">
                  {selectedSaint.iconUrl.startsWith("http") ? (
                    <img
                      src={selectedSaint.iconUrl}
                      alt={selectedSaint.name}
                      className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-auriu"
                    />
                  ) : (
                    <span>{selectedSaint.iconUrl}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedSaint.name}</h2>
                  <p className="text-sm opacity-80 font-sans">
                    {selectedSaint.feastDay}
                  </p>
                  <div className="mt-2 inline-block bg-auriu bg-opacity-30 rounded-full px-3 py-0.5 text-xs font-sans">
                    Virtutea: {selectedSaint.virtue}
                  </div>
                </div>
                <button
                  onClick={() => setShowBack(true)}
                  className="mt-2 text-sm font-sans opacity-70 hover:opacity-100 underline"
                >
                  Citește povestea →
                </button>
              </div>
            ) : (
              // Verso
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="font-bold text-albastru text-lg">
                    {selectedSaint.name}
                  </h2>
                  <p className="text-xs text-maro opacity-60 font-sans">
                    {selectedSaint.feastDay} · {selectedSaint.region === "roman" ? "Sfânt Român" : "Sfânt Universal"}
                  </p>
                </div>
                <p className="text-maro leading-relaxed text-sm">
                  {selectedSaint.storyShort}
                </p>
                <div className="bg-crem rounded-xl px-4 py-2.5 text-center">
                  <p className="text-xs text-maro font-sans">
                    <strong>Virtutea sa:</strong> {selectedSaint.virtue}
                  </p>
                </div>
                <button
                  onClick={() => setShowBack(false)}
                  className="text-sm font-sans text-albastru hover:underline"
                >
                  ← Înapoi la icoană
                </button>
              </div>
            )}

            <div className="px-6 py-4 border-t border-crem-inchis">
              <button
                onClick={() => setSelectedSaint(null)}
                className="w-full py-3 bg-crem text-maro rounded-xl font-bold font-sans hover:bg-crem-inchis"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
