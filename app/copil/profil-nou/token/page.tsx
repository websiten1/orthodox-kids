"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("newChildToken");
    if (!t) {
      router.push("/copil");
      return;
    }
    setToken(t);
  }, [router]);

  function handleCopy() {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleContinue() {
    sessionStorage.removeItem("newChildToken");
    router.push("/copil/harta");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-crem">
      <div className="w-full max-w-sm text-center space-y-6">
        <div>
          <div className="text-6xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-albastru">
            Codul tău personal
          </h1>
          <p className="text-maro text-sm mt-2 leading-relaxed font-sans">
            Acesta este codul tău secret. Scrie-l sau fotografiază-l!
            Vei avea nevoie de el data viitoare când vrei să intri.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-auriu">
          <div className="text-3xl font-bold tracking-widest text-albastru font-sans mb-3">
            {token.slice(0, 8).toUpperCase()}
          </div>
          <button
            onClick={handleCopy}
            className={`text-sm font-sans px-4 py-2 rounded-lg transition-all ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-crem text-maro hover:bg-crem-inchis"
            }`}
          >
            {copied ? "✓ Copiat!" : "📋 Copiază codul"}
          </button>
        </div>

        <div className="bg-auriu bg-opacity-10 rounded-xl p-4 border border-auriu border-opacity-30">
          <p className="text-sm text-maro font-sans">
            <strong>Important:</strong> Spune și unui părinte codul tău sau
            fotografiați-l împreună. Fără acest cod nu vei putea intra data viitoare.
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-albastru text-white font-bold text-lg
            hover:bg-albastru-deschis transition-all active:scale-95 shadow-lg"
        >
          Am salvat codul → Mergem!
        </button>
      </div>
    </main>
  );
}
