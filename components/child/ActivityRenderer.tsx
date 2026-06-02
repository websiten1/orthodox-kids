"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T, Gem, GButton, Panel, Medallion, XPBar, Pill, Icon } from "./ui";

type Question = { id: string; text: string; options: unknown; correctAnswer: string; explanation: string; };
type Activity  = {
  id: string; title: string; type: string; content: Record<string, unknown>;
  talantsReward: number; estimatedMins: number; questions: Question[];
  themeTitle: string; themeId: string;
};

export default function ActivityRenderer({ activity, childId, alreadyCompleted }: {
  activity: Activity; childId: string; alreadyCompleted: boolean;
}) {
  const router = useRouter();
  const back = () => router.push("/copil/harta");
  if (activity.type === "lesson")
    return <StoryReader activity={activity} childId={childId} alreadyCompleted={alreadyCompleted} onComplete={back} />;
  if (activity.type === "quiz" || activity.type === "matching")
    return <QuizActivity activity={activity} childId={childId} alreadyCompleted={alreadyCompleted} onComplete={back} />;
  return (
    <div style={{ minHeight: "100vh", background: T.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <span style={{ fontFamily: T.fD, fontSize: 22, color: T.ink }}>Activitate în pregătire</span>
      <GButton color="sky" onClick={back}>Înapoi</GButton>
    </div>
  );
}

// ── TopBanner ─────────────────────────────────────────────────────────────
function TopBanner({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
        <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
        <div style={{ width: 17, height: 11, border: `1.4px solid ${T.ink}`, borderRadius: 3, position: "relative", opacity: 0.9 }}>
          <div style={{ position: "absolute", inset: 1.5, width: "70%", background: T.ink, borderRadius: 1 }} />
        </div>
      </div>
      <div style={{ padding: "2px 14px 0", display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={onBack} style={{ width: 40, height: 40, borderRadius: 14, background: T.line, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="arrow-left" size={20} color={T.ink} stroke={2} />
        </div>
        <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>{title}</div>
      </div>
    </div>
  );
}

// ── Story Reader ──────────────────────────────────────────────────────────
function StoryReader({ activity, childId, alreadyCompleted, onComplete }: {
  activity: Activity; childId: string; alreadyCompleted: boolean; onComplete: () => void;
}) {
  const sections = (activity.content.sections as { title: string; text: string }[]) ?? [];
  const pages = sections.length > 0 ? sections : [{ title: activity.title, text: (activity.content.text as string) ?? "" }];
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(alreadyCompleted);
  const [saving, setSaving] = useState(false);
  const last = page === pages.length - 1;

  async function finish() {
    if (done) { onComplete(); return; }
    setSaving(true);
    await fetch("/api/activitate/completa", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: activity.id, childId, score: 100, timeSpentSecs: activity.estimatedMins * 60, answersLog: [] }),
    });
    setSaving(false); setDone(true); onComplete();
  }

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <TopBanner title="O Poveste" onBack={onComplete} />
      <div style={{ padding: 16 }}>
        <Panel style={{ padding: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <Medallion icon={activity.content.iconEmoji as string || "📖"} size={140} glow />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 26, color: T.ink, lineHeight: 1.1 }}>{activity.title}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8, color: T.mint, cursor: "pointer", fontFamily: T.fT, fontWeight: 800, fontSize: 13.5 }}>
              <span style={{ width: 32, height: 32, borderRadius: 999, background: T.teal50, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="volume-2" size={16} color={T.mint} stroke={1.9} />
              </span>
              Ascultă
            </div>
          </div>
          <p style={{ fontFamily: T.fT, fontSize: 17, lineHeight: 1.62, color: T.ink, textAlign: "center", margin: "2px 4px 0" }}>
            {pages[page]?.text}
          </p>
        </Panel>

        {/* Progress dots + button */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 7 }}>
            {pages.map((_, i) => (
              <div key={i} style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 8, background: i === page ? T.coral : T.line, transition: "width .25s" }} />
            ))}
          </div>
          {last
            ? <GButton color="teal" icon={<Icon name="check" size={16} color="#fff" stroke={2} />} onClick={finish}>
                {saving ? "Se salvează..." : `Terminat · +${activity.talantsReward}`}
              </GButton>
            : <GButton color="coral" icon={<Icon name="arrow-right" size={16} color="#fff" stroke={2} />} onClick={() => setPage(p => p + 1)}>
                Următor
              </GButton>
          }
        </div>
      </div>
    </div>
  );
}

// ── Quiz Activity ─────────────────────────────────────────────────────────
function QuizActivity({ activity, childId, alreadyCompleted, onComplete }: {
  activity: Activity; childId: string; alreadyCompleted: boolean; onComplete: () => void;
}) {
  const questions = activity.questions;
  const [qIdx, setQIdx]     = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore]   = useState(0);
  const [log, setLog]       = useState<{ q: string; a: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(alreadyCompleted);
  const [saving, setSaving] = useState(false);

  if (questions.length === 0 || finished) {
    const correct = log.filter(l => l.correct).length;
    const pct = log.length ? Math.round((correct / log.length) * 100) : 100;
    return (
      <div style={{ minHeight: "100vh", background: T.cream }}>
        <TopBanner title="Rezultat" onBack={onComplete} />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, paddingTop: 32 }}>
          <Panel style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%" }}>
            <Medallion icon={pct >= 70 ? "🌟" : "💪"} size={120} glow />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 28, color: T.ink }}>{pct >= 70 ? "Bravo!" : "Bine ai făcut!"}</div>
              {log.length > 0 && <div style={{ fontFamily: T.fT, fontSize: 15, color: T.ink2, marginTop: 6 }}>{correct} din {log.length} răspunsuri corecte</div>}
            </div>
            <Pill bg={T.sun} fg="#7a5200" style={{ fontSize: 18 }}>
              <Gem size={16} /> +{activity.talantsReward}
            </Pill>
            <GButton color="teal" full big icon={<Icon name="arrow-right" size={19} color="#fff" stroke={2} />} onClick={onComplete}>
              Mergi acasă
            </GButton>
          </Panel>
        </div>
      </div>
    );
  }

  const q = questions[qIdx];
  const opts = q ? (q.options as string[]) : [];

  function choose(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const ok = opt === q.correctAnswer;
    if (ok) setScore(s => s + 1);
    setLog(l => [...l, { q: q.text, a: opt, correct: ok }]);
  }

  async function next() {
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setAnswered(false);
    } else {
      setSaving(true);
      await fetch("/api/activitate/completa", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: activity.id, childId, score: Math.round((score / questions.length) * 100), timeSpentSecs: questions.length * 30, answersLog: log }),
      });
      setSaving(false); setFinished(true);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <TopBanner title={activity.title} onBack={onComplete} />

      {/* XP progress */}
      <div style={{ padding: "12px 16px 0", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}><XPBar pct={(qIdx + 1) / questions.length} color={T.mint} height={10} /></div>
        <Pill bg={T.gold50} fg={T.goldE}><Gem size={14} /> {qIdx + 1} / {questions.length}</Pill>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Question */}
        <Panel style={{ padding: "18px 16px" }}>
          <p style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 20, color: T.ink, lineHeight: 1.3, margin: 0 }}>{q?.text}</p>
        </Panel>

        {/* Options */}
        {opts.map(opt => {
          const isSel  = opt === selected;
          const isCorr = opt === q?.correctAnswer;
          let bg = "#fff", border = T.line, color = T.ink;
          if (answered) {
            if (isCorr)        { bg = T.teal50;   border = T.mint;  }
            else if (isSel)    { bg = T.red50;     border = T.coral; color = T.ink2; }
            else               { color = T.ink3; }
          } else if (isSel)    { bg = T.sky50;     border = T.sky; }

          return (
            <div key={opt} onClick={() => choose(opt)} style={{
              padding: "14px 18px", borderRadius: 16,
              border: `2px solid ${border}`, background: bg,
              fontFamily: T.fT, fontSize: 15, fontWeight: 700, color,
              cursor: answered ? "default" : "pointer",
              display: "flex", alignItems: "center", gap: 10,
              transition: "all .12s",
            }}>
              {answered && isCorr && <Icon name="check" size={18} color={T.mint} stroke={2.5} />}
              {answered && isSel && !isCorr && <span style={{ color: T.coral, fontWeight: 900 }}>✕</span>}
              {opt}
            </div>
          );
        })}

        {/* Explanation */}
        {answered && (
          <Panel style={{ padding: "12px 16px", border: `2px solid ${selected === q?.correctAnswer ? T.mint : T.sun}`, background: selected === q?.correctAnswer ? T.teal50 : T.gold50 }}>
            <p style={{ fontFamily: T.fT, fontSize: 14, color: T.ink, fontWeight: 700, margin: 0 }}>{q?.explanation}</p>
          </Panel>
        )}

        {answered && (
          <GButton color={qIdx < questions.length - 1 ? "coral" : "teal"} full big
            icon={<Icon name="arrow-right" size={19} color="#fff" stroke={2} />}
            onClick={next}
            style={{ opacity: saving ? 0.6 : 1 }}>
            {saving ? "Se salvează..." : qIdx < questions.length - 1 ? "Următoarea" : "Termină!"}
          </GButton>
        )}
      </div>
    </div>
  );
}
