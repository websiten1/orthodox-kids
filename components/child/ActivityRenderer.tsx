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

type Props = {
  activity: Activity;
  childId: string;
  alreadyCompleted: boolean;
};

export default function ActivityRenderer({ activity, childId, alreadyCompleted }: Props) {
  const router = useRouter();

  if (activity.type === "lesson") {
    return (
      <LessonActivity
        activity={activity}
        childId={childId}
        alreadyCompleted={alreadyCompleted}
        onComplete={() => router.push("/copil/harta")}
      />
    );
  }

  if (activity.type === "quiz" || activity.type === "matching") {
    return (
      <QuizActivity
        activity={activity}
        childId={childId}
        alreadyCompleted={alreadyCompleted}
        onComplete={() => router.push("/copil/harta")}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-crem px-4">
      <div className="text-center space-y-4">
        <div className="text-5xl">🚧</div>
        <h2 className="text-xl font-bold text-albastru">
          Activitate în pregătire
        </h2>
        <p className="text-maro font-sans text-sm">
          Acest tip de activitate va fi disponibil curând.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-albastru text-white rounded-xl font-sans font-semibold"
        >
          Înapoi
        </button>
      </div>
    </div>
  );
}

function LessonActivity({
  activity,
  childId,
  alreadyCompleted,
  onComplete,
}: {
  activity: Activity;
  childId: string;
  alreadyCompleted: boolean;
  onComplete: () => void;
}) {
  const router = useRouter();
  const content = activity.content;
  const sections = (content.sections as { title: string; text: string; imageUrl?: string }[]) ?? [];
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [submitting, setSubmitting] = useState(false);

  const isLast = currentSection === sections.length - 1;

  async function handleComplete() {
    if (completed) { onComplete(); return; }
    setSubmitting(true);
    await fetch("/api/activitate/completa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activity.id,
        childId,
        score: 100,
        timeSpentSecs: activity.estimatedMins * 60,
        answersLog: [],
      }),
    });
    setCompleted(true);
    setSubmitting(false);
    onComplete();
  }

  return (
    <div className="min-h-screen bg-crem flex flex-col">
      <header className="bg-albastru text-white px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-white opacity-70 hover:opacity-100">
          ←
        </button>
        <div>
          <p className="text-xs opacity-70 font-sans">{activity.themeTitle}</p>
          <h1 className="font-bold text-base">{activity.title}</h1>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1.5 bg-crem-inchis">
        <div
          className="h-full bg-auriu transition-all"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 px-4 py-6 space-y-5">
        {sections[currentSection] && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis">
            <h2 className="text-xl font-bold text-albastru mb-3">
              {sections[currentSection].title}
            </h2>
            <p className="text-maro leading-relaxed text-base">
              {sections[currentSection].text}
            </p>
          </div>
        )}

        {sections.length === 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis">
            <p className="text-maro leading-relaxed">
              {(content.text as string) ?? "Conținut în pregătire..."}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection((s) => s - 1)}
              className="flex-1 py-3 rounded-xl border-2 border-crem-inchis text-maro font-semibold font-sans"
            >
              ← Înapoi
            </button>
          )}
          {isLast || sections.length === 0 ? (
            <button
              onClick={handleComplete}
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-auriu text-white font-bold font-sans
                hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
            >
              {submitting
                ? "Se salvează..."
                : completed
                ? "Am terminat ✓"
                : `Terminat! +${activity.talantsReward} talanți 🪙`}
            </button>
          ) : (
            <button
              onClick={() => setCurrentSection((s) => s + 1)}
              className="flex-1 py-3 rounded-xl bg-albastru text-white font-bold font-sans
                hover:bg-albastru-deschis active:scale-95 transition-all"
            >
              Continuă →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizActivity({
  activity,
  childId,
  alreadyCompleted,
  onComplete,
}: {
  activity: Activity;
  childId: string;
  alreadyCompleted: boolean;
  onComplete: () => void;
}) {
  const router = useRouter();
  const questions = activity.questions;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<{ q: string; a: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(alreadyCompleted);
  const [submitting, setSubmitting] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crem px-4">
        <div className="text-center">
          <p className="text-maro font-sans">Nu există întrebări pentru această activitate.</p>
          <button onClick={() => router.back()} className="mt-4 px-6 py-3 bg-albastru text-white rounded-xl font-sans">
            Înapoi
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const options = q ? (q.options as string[]) : [];

  function handleAnswer(option: string) {
    if (answered) return;
    const isCorrect = option === q.correctAnswer;
    setSelected(option);
    setAnswered(true);
    setCorrect(isCorrect);
    if (isCorrect) setScore((s) => s + 1);
    setAnswersLog((log) => [...log, { q: q.text, a: option, correct: isCorrect }]);
  }

  async function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setCorrect(false);
    } else {
      setSubmitting(true);
      await fetch("/api/activitate/completa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: activity.id,
          childId,
          score: Math.round((score / questions.length) * 100),
          timeSpentSecs: questions.length * 30,
          answersLog,
        }),
      });
      setSubmitting(false);
      setFinished(true);
    }
  }

  if (finished) {
    const finalScore = answersLog.length > 0
      ? Math.round((answersLog.filter((a) => a.correct).length / answersLog.length) * 100)
      : 100;

    return (
      <div className="min-h-screen bg-crem flex flex-col items-center justify-center px-4 space-y-6">
        <div className="text-6xl">{finalScore >= 70 ? "🌟" : "💪"}</div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-albastru">
            {finalScore >= 70 ? "Bravo!" : "Bine ai făcut!"}
          </h2>
          <p className="text-maro font-sans mt-1">
            {finalScore >= 70
              ? `Ai răspuns corect la ${answersLog.filter((a) => a.correct).length} din ${answersLog.length} întrebări!`
              : "Continuă să înveți. Vei reuși!"}
          </p>
        </div>
        <div className="bg-auriu bg-opacity-20 rounded-2xl px-6 py-4 border border-auriu text-center">
          <p className="text-2xl font-bold text-auriu">
            +{activity.talantsReward} talanți 🪙
          </p>
        </div>
        <button
          onClick={onComplete}
          className="w-full max-w-xs py-4 rounded-2xl bg-albastru text-white font-bold font-sans
            hover:bg-albastru-deschis active:scale-95 transition-all shadow-lg"
        >
          Mergi la hartă
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crem flex flex-col">
      <header className="bg-albastru text-white px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-white opacity-70 hover:opacity-100">
          ←
        </button>
        <div className="flex-1">
          <p className="text-xs opacity-70 font-sans">{activity.themeTitle}</p>
          <h1 className="font-bold">{activity.title}</h1>
        </div>
        <span className="text-sm font-sans opacity-80">
          {currentQ + 1}/{questions.length}
        </span>
      </header>

      <div className="h-1.5 bg-crem-inchis">
        <div
          className="h-full bg-auriu transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 px-4 py-6 space-y-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis">
          <p className="text-lg font-bold text-foreground leading-relaxed">
            {q.text}
          </p>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption = option === q.correctAnswer;

            let style =
              "border-2 border-crem-inchis bg-white hover:border-auriu";
            if (answered) {
              if (isCorrectOption) {
                style = "border-2 border-green-400 bg-green-50";
              } else if (isSelected && !isCorrectOption) {
                style = "border-2 border-red-300 bg-red-50";
              } else {
                style = "border-2 border-crem-inchis bg-white opacity-60";
              }
            } else if (isSelected) {
              style = "border-2 border-auriu bg-auriu bg-opacity-10";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-sans text-base transition-all ${style}
                  ${!answered ? "active:scale-98 cursor-pointer" : "cursor-default"}`}
              >
                <span className="text-maro">{option}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`rounded-xl p-4 border ${
              correct
                ? "bg-green-50 border-green-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <p className="font-bold font-sans text-sm mb-1">
              {correct ? "✅ Corect!" : "💡 Nu-i nimic!"}
            </p>
            <p className="text-sm text-maro font-sans">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans
              hover:bg-albastru-deschis active:scale-95 transition-all disabled:opacity-60"
          >
            {submitting
              ? "Se salvează..."
              : currentQ < questions.length - 1
              ? "Următoarea →"
              : "Termină jocul!"}
          </button>
        )}
      </div>
    </div>
  );
}
