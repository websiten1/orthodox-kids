"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("newChildToken");
    if (!t) { router.push("/copil"); return; }
    setToken(t);
  }, [router]);

  function handleCopy() {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleContinue() {
    sessionStorage.removeItem("newChildToken");
    router.push("/copil/harta");
    router.refresh();
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{ background: "linear-gradient(160deg, #E7F6FD 0%, #FFF9EE 100%)" }}
    >
      <div className="w-full max-w-xs text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 26,
          background: "linear-gradient(145deg, #FFC23D, #EFA014)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
          boxShadow: "0 8px 0 #C8820A, 0 16px 24px -8px rgba(239,160,20,.5)",
        }}>
          🔑
        </div>

        <div>
          <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "#403A4A", margin: "0 0 10px" }}>
            Codul tău personal
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8A8296", fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            Acesta este codul tău secret. Scrie-l sau fotografiază-l!
            Vei avea nevoie de el data viitoare.
          </p>
        </div>

        {/* Token display */}
        <div style={{
          background: "white", borderRadius: 24, padding: "22px 28px",
          border: "2px solid #FFC23D",
          boxShadow: "0 8px 24px -10px rgba(239,160,20,.35)",
          width: "100%",
        }}>
          <p style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 34, fontWeight: 700,
            letterSpacing: "0.22em", color: "#403A4A",
            margin: "0 0 14px",
          }}>
            {token.slice(0, 8).toUpperCase()}
          </p>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
              padding: "8px 20px", borderRadius: 999,
              border: "none", cursor: "pointer",
              background: copied ? "#E4FAF3" : "#F4F1FA",
              color: copied ? "#22AE88" : "#8A8296",
              transition: "all .2s",
              boxShadow: copied ? "0 3px 0 #22AE88" : "none",
            }}
          >
            {copied ? "Copiat!" : "Copiază codul"}
          </button>
        </div>

        {/* Warning */}
        <div style={{
          background: "white", borderRadius: 18, padding: "14px 18px",
          border: "1.5px solid #EFEBF5",
          width: "100%",
        }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#403A4A" }}>Important:</strong> Spune și unui părinte codul tău. Fără el nu vei putea intra data viitoare.
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="btn-candy btn-sky"
          style={{ width: "100%", fontSize: 18 }}
        >
          Am salvat codul — Mergem!
        </button>
      </div>
    </main>
  );
}
