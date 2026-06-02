"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { T, Gem, GButton, Panel, Medallion, XPBar, Pill, SectionTitle, Icon } from "./ui";

type Q    = { id: string; text: string; options: string[]; correctAnswer: string; explanation: string; };
type Team = { id: string; name: string; };

const TOTAL = 6;
const TIMER = 20;

export default function TurnulCredinteiGame({ myTeam, opponentTeam, questions }: {
  myTeam: Team; opponentTeam: Team; childId?: string; questions: Q[];
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [qIdx, setQIdx]   = useState(0);
  const [myBlocks, setMyBlocks]   = useState(0);
  const [oppBlocks, setOppBlocks] = useState(0);
  const [selected, setSelected]   = useState<string | null>(null);
  const [answered, setAnswered]   = useState(false);
  const [timer, setTimer]         = useState(TIMER);
  const [result, setResult]       = useState<"win" | "lose" | "draw" | null>(null);

  // Timer
  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timer <= 0) { setAnswered(true); if (Math.random() < 0.4) setOppBlocks(b => Math.min(b + 1, TOTAL)); return; }
    const t = setTimeout(() => setTimer(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, answered, timer]);

  function choose(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === questions[qIdx]?.correctAnswer) setMyBlocks(b => Math.min(b + 1, TOTAL));
    if (Math.random() < 0.35) setOppBlocks(b => Math.min(b + 1, TOTAL));
  }

  async function next() {
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setAnswered(false); setTimer(TIMER);
    } else {
      const r: "win" | "lose" | "draw" = myBlocks > oppBlocks ? "win" : myBlocks < oppBlocks ? "lose" : "draw";
      setResult(r); setPhase("done");
      await fetch("/api/echipa/joc-rezultat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: myTeam.id, activityId: "turnul-credintei", result: r }),
      });
    }
  }

  // ── Intro ──
  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionTitle icon={<Icon name="shapes" size={18} color={T.coral} stroke={2} />} color={T.coral}>
          Jocul de azi
        </SectionTitle>
        <Panel style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 26, color: T.ink }}>Turnul Credinței</div>
          <div style={{ fontFamily: T.fT, fontSize: 14, color: T.ink2, textAlign: "center", lineHeight: 1.5 }}>
            Răspundeți corect și construiți turnul împreună. Câștigă echipa cu cele mai multe blocuri!
          </div>
          {/* Progress bar preview */}
          <div style={{ width: "100%" }}>
            <XPBar pct={0} color={T.mint} height={12} />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Pill bg={T.gold50} fg={T.goldE}><Gem size={14} /> 3 / {Math.min(questions.length, TOTAL)}</Pill>
          </div>
        </Panel>

        {/* Teams */}
        <div style={{ display: "flex", gap: 12 }}>
          {[{ team: myTeam, note: "noi", color: T.coral }, { team: opponentTeam, note: "ei", color: T.mint }].map(({ team, note, color }) => (
            <Panel key={team.id} style={{ flex: 1, padding: "16px 12px", textAlign: "center" as const }}>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 18, color: T.ink }}>{team.name}</div>
              <div style={{ fontFamily: T.fT, fontWeight: 800, fontSize: 11, color, marginTop: 4 }}>({note})</div>
            </Panel>
          ))}
        </div>

        <GButton color="coral" full big icon={<Icon name="play" size={19} color="#fff" stroke={2} />} onClick={() => setPhase("playing")}>
          Începe Jocul
        </GButton>
        <div style={{ fontFamily: T.fT, fontSize: 12, color: T.ink3, textAlign: "center" }}>
          Un joc calm, fără cronometru de presiune — doar sfinți de descoperit.
        </div>
      </div>
    </div>
  );

  // ── Done ──
  if (phase === "done" && result) {
    const talants = result === "win" ? 15 : result === "draw" ? 8 : 5;
    return (
      <div style={{ minHeight: "100vh", background: T.cream }}>
        <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
          <div style={{ height: 44, padding: "0 22px", display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          </div>
        </div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <Panel style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%" }}>
            <Medallion icon={result === "win" ? "🏆" : result === "draw" ? "🤝" : "💪"} size={120} glow />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 28, color: T.ink }}>
                {result === "win" ? "Ați câștigat!" : result === "draw" ? "Egalitate!" : "Data viitoare!"}
              </div>
              <div style={{ fontFamily: T.fT, fontSize: 14, color: T.ink2, marginTop: 6 }}>
                {myTeam.name}: {myBlocks} · {opponentTeam.name}: {oppBlocks}
              </div>
            </div>
            <Pill bg={T.sun} fg="#7a5200" style={{ fontSize: 18 }}><Gem size={16} /> +{talants}</Pill>
          </Panel>

          {/* Tower visual */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            {[{ label: myTeam.name, blocks: myBlocks, color: T.coral }, { label: opponentTeam.name, blocks: oppBlocks, color: T.mint }].map(({ label, blocks, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column-reverse", gap: 3, marginBottom: 8 }}>
                  {Array.from({ length: TOTAL }).map((_, idx) => (
                    <div key={idx} style={{ width: 44, height: 12, borderRadius: 4, background: idx < blocks ? color : T.line }} />
                  ))}
                </div>
                <span style={{ fontFamily: T.fT, fontSize: 11, fontWeight: 700, color: T.ink2 }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <GButton color="sky" full onClick={() => { setPhase("intro"); setQIdx(0); setMyBlocks(0); setOppBlocks(0); setSelected(null); setAnswered(false); setTimer(TIMER); setResult(null); }}>
              Din nou
            </GButton>
            <GButton color="teal" full onClick={() => router.push("/copil/echipa")}>
              Înapoi
            </GButton>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing ──
  const q = questions[qIdx];
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <span style={{ fontFamily: T.fT, fontSize: 13, fontWeight: 800, color: timer <= 5 ? T.coral : T.ink2 }}>{timer}s</span>
        </div>
        {/* Score row */}
        <div style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.fT, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: T.ink3 }}>{myTeam.name}</div>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.coral }}>{myBlocks}</div>
          </div>
          <div style={{ flex: 1, margin: "0 10px" }}>
            <XPBar pct={(qIdx + 1) / questions.length} color={T.mint} height={8} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.fT, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: T.ink3 }}>{opponentTeam.name}</div>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.mint }}>{oppBlocks}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Panel style={{ padding: "18px 16px" }}>
          <p style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 20, color: T.ink, lineHeight: 1.3, margin: 0 }}>{q?.text}</p>
        </Panel>

        {q?.options?.map(opt => {
          const isSel  = opt === selected;
          const isCorr = opt === q.correctAnswer;
          let bg = "#fff", border = T.line, color = T.ink;
          if (answered) {
            if (isCorr)     { bg = T.teal50; border = T.mint; }
            else if (isSel) { bg = T.red50;  border = T.coral; color = T.ink2; }
            else             { color = T.ink3; }
          } else if (isSel) { bg = T.sky50; border = T.sky; }

          return (
            <div key={opt} onClick={() => choose(opt)} style={{
              padding: "14px 18px", borderRadius: 16,
              border: `2px solid ${border}`, background: bg,
              fontFamily: T.fT, fontSize: 15, fontWeight: 700, color,
              cursor: answered ? "default" : "pointer",
              transition: "all .12s",
            }}>
              {opt}
            </div>
          );
        })}

        {answered && (
          <>
            <Panel style={{ padding: "12px 16px", border: `2px solid ${T.goldLine}`, background: T.gold50 }}>
              <p style={{ fontFamily: T.fT, fontSize: 14, color: T.ink, fontWeight: 700, margin: 0 }}>{q?.explanation}</p>
            </Panel>
            <GButton color={qIdx < questions.length - 1 ? "coral" : "teal"} full big
              icon={<Icon name="arrow-right" size={19} color="#fff" stroke={2} />} onClick={next}>
              {qIdx < questions.length - 1 ? "Următor" : "Termină!"}
            </GButton>
          </>
        )}
      </div>
    </div>
  );
}
