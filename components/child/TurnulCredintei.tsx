"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type Team = { id: string; name: string };

type Props = {
  myTeam: Team;
  opponentTeam: Team;
  childId: string;
  questions: Question[];
};

const TOTAL_BLOCKS = 10;
const QUESTION_TIME = 20;

export default function TurnulCredinteiGame({
  myTeam,
  opponentTeam,
  childId,
  questions,
}: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "playing" | "finished">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [myBlocks, setMyBlocks] = useState(0);
  const [opponentBlocks, setOpponentBlocks] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  const q = questions[currentQ];

  // Timer
  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timeLeft <= 0) {
      // Timp expirat - adversarul poate răspunde
      setAnswered(true);
      // Simulăm adversarul cu 40% șansă de a răspunde corect
      if (Math.random() < 0.4) {
        setOpponentBlocks((b) => Math.min(b + 1, TOTAL_BLOCKS));
      }
      return;
    }
    const t = setTimeout(() => setTimeLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, answered, timeLeft]);

  function handleAnswer(option: string) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const isCorrect = option === q.correctAnswer;
    if (isCorrect) {
      setMyBlocks((b) => Math.min(b + 1, TOTAL_BLOCKS));
    }

    // Adversarul (AI) cu probabilitate de 35% răspunde corect
    if (Math.random() < 0.35) {
      setOpponentBlocks((b) => Math.min(b + 1, TOTAL_BLOCKS));
    }
  }

  async function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      // Joc terminat
      const gameResult: "win" | "lose" | "draw" =
        myBlocks > opponentBlocks
          ? "win"
          : myBlocks < opponentBlocks
          ? "lose"
          : "draw";

      setResult(gameResult);
      setPhase("finished");

      // Salvăm în DB
      await fetch("/api/echipa/joc-rezultat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: myTeam.id,
          activityId: "turnul-credintei",
          result: gameResult,
        }),
      });
    }
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-albastru text-white flex flex-col items-center justify-center px-4 space-y-8">
        <div className="text-center">
          <div className="text-7xl mb-4">🏰</div>
          <h1 className="text-3xl font-bold">Turnul Credinței</h1>
          <p className="text-sm opacity-80 font-sans mt-2">
            Construiți turnul răspunzând corect!
          </p>
        </div>

        <div className="flex items-center gap-6 w-full max-w-xs">
          <div className="flex-1 text-center bg-white bg-opacity-10 rounded-2xl p-4">
            <div className="text-3xl mb-1">🛡️</div>
            <p className="font-bold">{myTeam.name}</p>
            <p className="text-xs opacity-70 font-sans">(noi)</p>
          </div>
          <div className="text-2xl font-bold opacity-60">VS</div>
          <div className="flex-1 text-center bg-white bg-opacity-10 rounded-2xl p-4">
            <div className="text-3xl mb-1">⚔️</div>
            <p className="font-bold">{opponentTeam.name}</p>
            <p className="text-xs opacity-70 font-sans">(adversar)</p>
          </div>
        </div>

        <div className="text-center text-sm opacity-70 font-sans space-y-1">
          <p>• {questions.length} întrebări</p>
          <p>• {QUESTION_TIME} secunde per întrebare</p>
          <p>• Fiecare răspuns corect = 1 bloc la turn</p>
        </div>

        <button
          onClick={() => setPhase("playing")}
          className="w-full max-w-xs py-5 bg-auriu text-white font-bold text-xl rounded-2xl
            hover:opacity-90 active:scale-95 transition-all shadow-lg"
        >
          Începe Jocul! →
        </button>
      </div>
    );
  }

  if (phase === "finished" && result) {
    const talantsEarned =
      result === "win" ? 15 : result === "draw" ? 8 : 5;

    return (
      <div className="min-h-screen bg-crem flex flex-col items-center justify-center px-4 space-y-6">
        <div className="text-7xl">
          {result === "win" ? "🏆" : result === "draw" ? "🤝" : "💪"}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-albastru">
            {result === "win"
              ? "Ați câștigat!"
              : result === "draw"
              ? "Egalitate!"
              : "Data viitoare!"}
          </h2>
          <p className="text-maro font-sans mt-2">
            Turnul vostru: {myBlocks} blocuri · Adversar: {opponentBlocks} blocuri
          </p>
        </div>

        {/* Turnuri vizuale */}
        <div className="flex items-end justify-center gap-8">
          <div className="text-center">
            <div className="flex flex-col-reverse gap-1 mb-2">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-12 rounded-sm ${
                    i < myBlocks ? "bg-albastru" : "bg-crem-inchis"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-sans text-maro">{myTeam.name}</p>
          </div>
          <div className="text-center">
            <div className="flex flex-col-reverse gap-1 mb-2">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-12 rounded-sm ${
                    i < opponentBlocks ? "bg-rosu" : "bg-crem-inchis"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-sans text-maro">{opponentTeam.name}</p>
          </div>
        </div>

        <div className="bg-auriu bg-opacity-20 rounded-2xl px-6 py-4 border border-auriu text-center">
          <p className="text-2xl font-bold text-auriu">
            +{talantsEarned} talanți 🪙
          </p>
        </div>

        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              setPhase("intro");
              setCurrentQ(0);
              setMyBlocks(0);
              setOpponentBlocks(0);
              setSelected(null);
              setAnswered(false);
              setTimeLeft(QUESTION_TIME);
              setResult(null);
            }}
            className="flex-1 py-3 border-2 border-albastru text-albastru rounded-xl font-bold font-sans"
          >
            Joacă din nou
          </button>
          <button
            onClick={() => router.push("/copil/echipa")}
            className="flex-1 py-3 bg-albastru text-white rounded-xl font-bold font-sans"
          >
            Înapoi
          </button>
        </div>
      </div>
    );
  }

  // Joc în desfășurare
  const timerPercent = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div className="min-h-screen bg-crem flex flex-col">
      {/* Scoreboard */}
      <div className="bg-albastru text-white px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-center">
            <p className="text-xs opacity-70 font-sans">{myTeam.name}</p>
            <p className="text-2xl font-bold">{myBlocks}🏰</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-70 font-sans">
              {currentQ + 1}/{questions.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-70 font-sans">{opponentTeam.name}</p>
            <p className="text-2xl font-bold">{opponentBlocks}🏰</p>
          </div>
        </div>

        {/* Blocuri vizuale */}
        <div className="flex gap-1">
          <div className="flex-1 flex gap-0.5">
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-sm ${
                  i < myBlocks ? "bg-auriu" : "bg-white bg-opacity-20"
                }`}
              />
            ))}
          </div>
          <div className="w-2" />
          <div className="flex-1 flex gap-0.5">
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-sm ${
                  i < opponentBlocks ? "bg-rosu" : "bg-white bg-opacity-20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="h-1.5 bg-crem-inchis">
        <div
          className={`h-full transition-all ${
            timeLeft <= 5 ? "bg-red-500" : "bg-auriu"
          }`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>
      <div className="text-center py-1">
        <span
          className={`text-sm font-bold font-sans ${
            timeLeft <= 5 ? "text-red-500" : "text-maro opacity-60"
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      {/* Întrebarea */}
      <div className="flex-1 px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis">
          <p className="text-lg font-bold text-foreground leading-relaxed">
            {q?.text}
          </p>
        </div>

        <div className="space-y-3">
          {q?.options?.map((option) => {
            const isSelected = selected === option;
            const isCorrect = option === q.correctAnswer;

            let style = "border-2 border-crem-inchis bg-white";
            if (answered) {
              if (isCorrect) style = "border-2 border-green-400 bg-green-50";
              else if (isSelected) style = "border-2 border-red-300 bg-red-50";
              else style = "border-2 border-crem-inchis bg-white opacity-50";
            } else if (isSelected) {
              style = "border-2 border-auriu bg-auriu bg-opacity-10";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-sans text-base transition-all ${style}
                  ${!answered ? "hover:border-auriu active:scale-98" : "cursor-default"}`}
              >
                <span className="text-maro">{option}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`rounded-xl p-3 ${
              selected === q.correctAnswer
                ? "bg-green-50 border border-green-200"
                : "bg-amber-50 border border-amber-200"
            }`}
          >
            <p className="text-sm font-sans text-maro">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans
              hover:bg-albastru-deschis active:scale-95 transition-all"
          >
            {currentQ < questions.length - 1 ? "Următoarea →" : "Termină jocul!"}
          </button>
        )}
      </div>
    </div>
  );
}
