"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Q = { id: string; text: string; options: string[]; correctAnswer: string; explanation: string };
type Team = { id: string; name: string };

const TOTAL = 10;
const TIMER = 20;

export default function TurnulCredinteiGame({
  myTeam, opponentTeam, childId, questions,
}: { myTeam: Team; opponentTeam: Team; childId: string; questions: Q[] }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [qIdx, setQIdx] = useState(0);
  const [myBlocks, setMyBlocks] = useState(0);
  const [oppBlocks, setOppBlocks] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  const q = questions[qIdx];

  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timer <= 0) {
      setAnswered(true);
      if (Math.random() < 0.4) setOppBlocks(b => Math.min(b + 1, TOTAL));
      return;
    }
    const t = setTimeout(() => setTimer(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, answered, timer]);

  function choose(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === q.correctAnswer) setMyBlocks(b => Math.min(b + 1, TOTAL));
    if (Math.random() < 0.35) setOppBlocks(b => Math.min(b + 1, TOTAL));
  }

  async function next() {
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setAnswered(false); setTimer(TIMER);
    } else {
      const r: "win" | "lose" | "draw" = myBlocks > oppBlocks ? "win" : myBlocks < oppBlocks ? "lose" : "draw";
      setResult(r); setPhase("done");
      await fetch("/api/echipa/joc-rezultat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: myTeam.id, activityId: "turnul-credintei", result: r }),
      });
    }
  }

  if (phase === "intro") return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "20px 20px",
      background: "linear-gradient(160deg, #1B3A6B 0%, #2A5499 100%)",
      gap: 28,
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 40, fontWeight: 700, color: "#FFC23D", margin: "0 0 8px" }}>Turnul Credinței</p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Construiți turnul răspunzând corect!</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, width: "100%", maxWidth: 300 }}>
        {[
          { team: myTeam, note: "noi", color: "#FFC23D" },
          { team: opponentTeam, note: "ei", color: "#FF7A5C" },
        ].map(({ team, note, color }, i) => (
          <div key={team.id} style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,.1)", borderRadius: 20, padding: "16px 12px" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 18, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{team.name}</p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color, fontWeight: 700, margin: 0 }}>({note})</p>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)", fontWeight: 600, textAlign: "center", lineHeight: 1.8 }}>
        {questions.length} întrebări · {TIMER}s per întrebare<br/>Fiecare răspuns corect = 1 bloc
      </div>

      <button onClick={() => setPhase("playing")} className="btn-candy btn-sun" style={{ fontSize: 20, padding: "16px 36px" }}>
        Începe Jocul! →
      </button>
    </div>
  );

  if (phase === "done" && result) {
    const talants = result === "win" ? 15 : result === "draw" ? 8 : 5;
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "20px", gap: 24, background: "#FAFAFA",
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: result === "win" ? "linear-gradient(145deg,#FFC23D,#EFA014)" : result === "draw" ? "linear-gradient(145deg,#54C2F0,#2FA3D8)" : "linear-gradient(145deg,#FF7A5C,#E85636)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
          boxShadow: `0 8px 0 ${result === "win" ? "#C8820A" : result === "draw" ? "#1A8CBF" : "#C43010"}, 0 16px 24px -8px rgba(0,0,0,.2)`,
        }}>
          {result === "win" ? "🏆" : result === "draw" ? "🤝" : "💪"}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 32, fontWeight: 700, color: "#403A4A", margin: "0 0 6px" }}>
            {result === "win" ? "Ați câștigat!" : result === "draw" ? "Egalitate!" : "Data viitoare!"}
          </p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8A8296", fontWeight: 600, margin: 0 }}>
            Turnul vostru: {myBlocks} · Adversar: {oppBlocks}
          </p>
        </div>

        {/* Visual towers */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, justifyContent: "center" }}>
          {[
            { label: myTeam.name, blocks: myBlocks, color: "#FFC23D" },
            { label: opponentTeam.name, blocks: oppBlocks, color: "#FF7A5C" },
          ].map(({ label, blocks, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column-reverse", gap: 3, marginBottom: 8 }}>
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <div key={i} style={{ width: 48, height: 14, borderRadius: 4, background: i < blocks ? color : "#EFEBF5" }} />
                ))}
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, color: "#8A8296" }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: "14px 28px", border: "1.5px solid #EFEBF5", textAlign: "center" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 26, fontWeight: 700, color: "#FFC23D", margin: 0 }}>
            +{talants}
            {" "}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC23D" style={{ display: "inline", verticalAlign: "middle" }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, width: "100%", maxWidth: 300 }}>
          <button
            onClick={() => { setPhase("intro"); setQIdx(0); setMyBlocks(0); setOppBlocks(0); setSelected(null); setAnswered(false); setTimer(TIMER); setResult(null); }}
            style={{
              flex: 1, padding: "13px", borderRadius: 999,
              border: "2px solid #54C2F0", background: "white",
              fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 700, color: "#54C2F0",
              cursor: "pointer",
            }}
          >
            Din nou
          </button>
          <button onClick={() => router.push("/copil/echipa")} className="btn-candy btn-sky" style={{ flex: 1 }}>
            Înapoi
          </button>
        </div>
      </div>
    );
  }

  /* Playing */
  const timerPct = (timer / TIMER) * 100;
  const isCorrect = selected === q?.correctAnswer;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAFAFA" }}>
      {/* Score header */}
      <div style={{ background: "linear-gradient(160deg, #1B3A6B, #2A5499)", padding: "44px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 2px" }}>{myTeam.name}</p>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "#FFC23D", margin: 0 }}>{myBlocks}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", margin: "0 0 2px" }}>{qIdx + 1}/{questions.length}</p>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700, color: timer <= 5 ? "#FF7A5C" : "white", margin: 0 }}>{timer}s</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 2px" }}>{opponentTeam.name}</p>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "#FF7A5C", margin: 0 }}>{oppBlocks}</p>
          </div>
        </div>

        {/* Blocks progress */}
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i < myBlocks ? "#FFC23D" : i < oppBlocks ? "#FF7A5C" : "rgba(255,255,255,.2)" }} />
          ))}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: 4, background: "#F4F1FA" }}>
        <div style={{ height: "100%", background: timer <= 5 ? "#FF7A5C" : "#FFC23D", width: `${timerPct}%`, transition: "width 1s linear" }} />
      </div>

      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Question */}
        <div style={{ background: "white", borderRadius: 24, padding: 22, border: "1.5px solid #EFEBF5", boxShadow: "0 8px 24px -12px rgba(120,80,160,.2)" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 700, color: "#403A4A", lineHeight: 1.3, margin: 0 }}>
            {q?.text}
          </p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q?.options?.map(opt => {
            const isSel = opt === selected;
            const isCorr = opt === q.correctAnswer;
            let bg = "white", border = "#EFEBF5", color = "#403A4A";
            if (answered) {
              if (isCorr) { bg = "#E4FAF3"; border = "#3FD1A8"; }
              else if (isSel) { bg = "#FFEDE7"; border = "#FF7A5C"; }
              else { color = "#BBB4C6"; }
            } else if (isSel) { bg = "#E7F6FD"; border = "#54C2F0"; }

            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={answered}
                style={{
                  padding: "14px 18px", borderRadius: 16,
                  border: `2px solid ${border}`, background: bg,
                  fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700, color,
                  textAlign: "left", cursor: answered ? "default" : "pointer",
                  transition: "all .15s",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <>
            <div style={{
              background: isCorrect ? "#E4FAF3" : "#FFF4D6",
              border: `1.5px solid ${isCorrect ? "#3FD1A8" : "#FFC23D"}`,
              borderRadius: 16, padding: "12px 16px",
            }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#403A4A", fontWeight: 600, margin: 0 }}>
                {q?.explanation}
              </p>
            </div>
            <button onClick={next} className="btn-candy btn-sky">
              {qIdx < questions.length - 1 ? "Următoarea →" : "Termină jocul!"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
