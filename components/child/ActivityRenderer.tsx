"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  options: unknown;
  correctAnswer: string;
  explanation: string;
};

type Activity = {
  id: string;
  title: string;
  type: string;
  content: Record<string, unknown>;
  talantsReward: number;
  estimatedMins: number;
  questions: Question[];
  themeTitle: string;
  themeId: string;
};

export default function ActivityRenderer({
  activity,
  childId,
  alreadyCompleted,
}: {
  activity: Activity;
  childId: string;
  alreadyCompleted: boolean;
}) {
  const router = useRouter();

  if (activity.type === "lesson") {
    return <LessonActivity activity={activity} childId={childId} alreadyCompleted={alreadyCompleted} onComplete={() => router.push("/copil/harta")} />;
  }
  if (activity.type === "quiz" || activity.type === "matching") {
    return <QuizActivity activity={activity} childId={childId} alreadyCompleted={alreadyCompleted} onComplete={() => router.push("/copil/harta")} />;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "#F4F1FA" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 22, fontWeight: 700, color: "#403A4A", marginBottom: 12 }}>Activitate în pregătire</p>
        <button onClick={() => router.back()} className="btn-candy btn-sky">Înapoi</button>
      </div>
    </div>
  );
}

function Header({ title, themeTitle, progress, total, onBack }: { title: string; themeTitle: string; progress: number; total: number; onBack: () => void }) {
  return (
    <>
      <div style={{
        background: "#A43234",
        padding: "48px 16px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,.15)",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", margin: "0 0 2px" }}>
            {themeTitle}
          </p>
          <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 18, fontWeight: 700, color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </p>
        </div>
        {total > 1 && (
          <span style={{ fontFamily: "'Fredoka', system-ui", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.8)", flexShrink: 0 }}>
            {progress}/{total}
          </span>
        )}
      </div>
      {total > 1 && (
        <div style={{ height: 5, background: "rgba(164,50,52,.3)" }}>
          <div style={{ height: "100%", background: "#FFC23D", width: `${(progress / total) * 100}%`, transition: "width .3s" }} />
        </div>
      )}
    </>
  );
}

function LessonActivity({ activity, childId, alreadyCompleted, onComplete }: { activity: Activity; childId: string; alreadyCompleted: boolean; onComplete: () => void }) {
  const router = useRouter();
  const sections = (activity.content.sections as { title: string; text: string }[]) ?? [];
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(alreadyCompleted);
  const [saving, setSaving] = useState(false);

  async function finish() {
    if (done) { onComplete(); return; }
    setSaving(true);
    await fetch("/api/activitate/completa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: activity.id, childId, score: 100, timeSpentSecs: activity.estimatedMins * 60, answersLog: [] }),
    });
    setSaving(false);
    setDone(true);
    onComplete();
  }

  const isLast = current >= sections.length - 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAFA" }}>
      <Header title={activity.title} themeTitle={activity.themeTitle} progress={current + 1} total={Math.max(sections.length, 1)} onBack={() => router.back()} />

      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {sections[current] ? (
          <div style={{
            background: "white", borderRadius: 24, padding: 22,
            border: "1.5px solid #EFEBF5",
            boxShadow: "0 8px 24px -12px rgba(120,80,160,.2)",
          }}>
            {sections[current].title && (
              <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 22, fontWeight: 700, color: "#403A4A", marginBottom: 12, lineHeight: 1.2 }}>
                {sections[current].title}
              </p>
            )}
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 16, color: "#403A4A", lineHeight: 1.65, fontWeight: 600, margin: 0 }}>
              {sections[current].text}
            </p>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: 24, padding: 22, border: "1.5px solid #EFEBF5" }}>
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 16, color: "#403A4A", lineHeight: 1.65, fontWeight: 600 }}>
              {(activity.content.text as string) ?? "Conținut în pregătire..."}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          {current > 0 && (
            <button
              onClick={() => setCurrent(c => c - 1)}
              style={{
                flex: 1, padding: "14px", borderRadius: 999,
                border: "2px solid #EFEBF5", background: "white",
                fontFamily: "'Fredoka', system-ui", fontSize: 16, fontWeight: 600, color: "#8A8296",
                cursor: "pointer",
              }}
            >
              ← Înapoi
            </button>
          )}
          {isLast || sections.length === 0 ? (
            <button
              onClick={finish}
              disabled={saving}
              className="btn-candy btn-mint"
              style={{ flex: 1, opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Se salvează..." : done ? "Am terminat" : `Terminat! +${activity.talantsReward}`}
              {!done && !saving && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFC23D" style={{ marginLeft: 6, display: "inline", verticalAlign: "middle" }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="btn-candy btn-sky"
              style={{ flex: 1 }}
            >
              Continuă →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizActivity({ activity, childId, alreadyCompleted, onComplete }: { activity: Activity; childId: string; alreadyCompleted: boolean; onComplete: () => void }) {
  const router = useRouter();
  const questions = activity.questions;
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState<{ q: string; a: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(alreadyCompleted);
  const [saving, setSaving] = useState(false);

  if (questions.length === 0 || finished) {
    const pct = log.length ? Math.round((log.filter(l => l.correct).length / log.length) * 100) : 100;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "#FAFAFA", gap: 24 }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: pct >= 70 ? "linear-gradient(145deg, #3FD1A8, #22AE88)" : "linear-gradient(145deg, #FFC23D, #EFA014)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: pct >= 70 ? "0 8px 0 #22AE88, 0 16px 24px -8px rgba(34,174,136,.5)" : "0 8px 0 #EFA014, 0 16px 24px -8px rgba(239,160,20,.5)",
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {pct >= 70 ? <polyline points="20 6 9 17 4 12"/> : <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>}
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 28, fontWeight: 700, color: "#403A4A", margin: "0 0 8px" }}>
            {pct >= 70 ? "Bravo!" : "Bine ai făcut!"}
          </p>
          <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 15, color: "#8A8296", fontWeight: 600 }}>
            {log.length > 0 ? `${log.filter(l => l.correct).length} din ${log.length} răspunsuri corecte` : "Activitate completată!"}
          </p>
        </div>
        <div style={{
          background: "white", borderRadius: 20, padding: "16px 28px",
          border: "1.5px solid #EFEBF5", textAlign: "center",
        }}>
          <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 24, fontWeight: 700, color: "#FFC23D", margin: 0 }}>
            +{activity.talantsReward}
            {" "}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC23D" style={{ display: "inline", verticalAlign: "middle" }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </p>
        </div>
        <button onClick={onComplete} className="btn-candy btn-sky" style={{ width: "100%", maxWidth: 280 }}>
          Mergi acasă
        </button>
      </div>
    );
  }

  const q = questions[qIdx];
  const options = q ? (q.options as string[]) : [];

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: activity.id, childId, score: Math.round((score / questions.length) * 100), timeSpentSecs: questions.length * 30, answersLog: log }),
      });
      setSaving(false);
      setFinished(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAFA" }}>
      <Header title={activity.title} themeTitle={activity.themeTitle} progress={qIdx + 1} total={questions.length} onBack={() => router.back()} />

      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Question */}
        <div style={{
          background: "white", borderRadius: 24, padding: 22,
          border: "1.5px solid #EFEBF5", boxShadow: "0 8px 24px -12px rgba(120,80,160,.2)",
        }}>
          <p style={{ fontFamily: "'Fredoka', system-ui", fontSize: 20, fontWeight: 700, color: "#403A4A", lineHeight: 1.3, margin: 0 }}>
            {q?.text}
          </p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map((opt) => {
            const isCorrect = opt === q?.correctAnswer;
            const isSelected = opt === selected;
            let bg = "white", border = "#EFEBF5", color = "#403A4A";
            if (answered) {
              if (isCorrect) { bg = "#E4FAF3"; border = "#3FD1A8"; }
              else if (isSelected) { bg = "#FFEDE7"; border = "#FF7A5C"; }
              else { bg = "white"; border = "#EFEBF5"; color = "#BBB4C6"; }
            } else if (isSelected) { bg = "#E7F6FD"; border = "#54C2F0"; }

            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={answered}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "14px 18px", borderRadius: 16,
                  border: `2px solid ${border}`, background: bg,
                  fontFamily: "'Nunito', system-ui", fontSize: 16, fontWeight: 700, color,
                  cursor: answered ? "default" : "pointer",
                  transition: "all .15s",
                  display: "flex", alignItems: "center", gap: 12,
                }}
              >
                {answered && isCorrect && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3FD1A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
                {answered && isSelected && !isCorrect && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF7A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                )}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div style={{
            background: selected === q?.correctAnswer ? "#E4FAF3" : "#FFF4D6",
            border: `1.5px solid ${selected === q?.correctAnswer ? "#3FD1A8" : "#FFC23D"}`,
            borderRadius: 16, padding: "12px 16px",
          }}>
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 14, fontWeight: 700, color: "#403A4A", margin: "0 0 4px" }}>
              {selected === q?.correctAnswer ? "Corect!" : "Nu-i nimic!"}
            </p>
            <p style={{ fontFamily: "'Nunito', system-ui", fontSize: 14, color: "#8A8296", fontWeight: 600, margin: 0 }}>
              {q?.explanation}
            </p>
          </div>
        )}

        {answered && (
          <button onClick={next} disabled={saving} className="btn-candy btn-sky" style={{ opacity: saving ? 0.6 : 1 }}>
            {saving ? "Se salvează..." : qIdx < questions.length - 1 ? "Următoarea →" : "Termină!"}
          </button>
        )}
      </div>
    </div>
  );
}
