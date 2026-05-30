"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GospelActivity = {
  id: string;
  type: string;
  content: Record<string, unknown>;
};

type Gospel = {
  id: string;
  title: string;
  moralLesson: string;
  text: string;
  characters: string[];
};

type Props = {
  gospel: Gospel;
  activities: GospelActivity[];
  childId: string;
};

type StoryFrame = {
  text: string;
  character?: string;
  emotionQuestion?: string;
};

export default function GospelView({ gospel, activities, childId }: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "story" | "activity" | "end">("intro");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentActivityIdx, setCurrentActivityIdx] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  // Construim frame-urile poveștii din text
  const sentences = gospel.text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const frames: StoryFrame[] = sentences.map((sentence, i) => ({
    text: sentence.trim() + ".",
    character: gospel.characters[i % Math.max(gospel.characters.length, 1)],
    emotionQuestion:
      i === Math.floor(sentences.length / 2)
        ? "Cum crezi că s-au simțit oamenii în acel moment?"
        : undefined,
  }));

  async function claimReward() {
    if (rewardClaimed) return;
    await fetch("/api/copil/evanghelie/recompensa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId, gospelId: gospel.id }),
    });
    setRewardClaimed(true);
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-albastru text-white flex flex-col items-center justify-center px-4 space-y-8 text-center">
        <div>
          <div className="text-6xl mb-4">✦</div>
          <p className="text-sm opacity-70 font-sans mb-2">Evanghelia Zilei</p>
          <h1 className="text-2xl font-bold leading-tight">{gospel.title}</h1>
        </div>

        <div className="bg-white bg-opacity-10 rounded-2xl p-5 max-w-xs text-sm font-sans leading-relaxed">
          <p className="opacity-90">{gospel.moralLesson}</p>
        </div>

        <div className="text-sm font-sans opacity-70 space-y-1">
          <p>Tapează să avansezi prin poveste</p>
          <p>La final: 3 întrebări pentru discuție</p>
        </div>

        <button
          onClick={() => setPhase("story")}
          className="px-8 py-4 bg-auriu text-white font-bold rounded-2xl text-lg
            hover:opacity-90 active:scale-95 transition-all shadow-lg"
        >
          Începe →
        </button>
      </div>
    );
  }

  if (phase === "story") {
    const frame = frames[currentFrame];
    const isLast = currentFrame === frames.length - 1;

    return (
      <div
        className="min-h-screen bg-crem flex flex-col"
        onClick={!isLast ? () => setCurrentFrame((f) => f + 1) : undefined}
      >
        <div className="h-1.5 bg-crem-inchis">
          <div
            className="h-full bg-auriu transition-all"
            style={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
          />
        </div>

        <header className="bg-albastru text-white px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="opacity-70">←</button>
          <p className="text-sm font-sans">
            {currentFrame + 1} / {frames.length}
          </p>
          <div className="w-8" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-6">
          {/* Ilustrație stilizată */}
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-albastru to-albastru-deschis
            flex items-center justify-center shadow-lg">
            <div className="text-center text-white">
              <div className="text-5xl mb-2">✦</div>
              {frame?.character && (
                <p className="text-xs font-sans opacity-80">{frame.character}</p>
              )}
            </div>
          </div>

          {/* Textul */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis max-w-sm w-full">
            <p className="text-foreground leading-relaxed text-base text-center">
              {frame?.text}
            </p>
          </div>

          {/* Întrebare emoțională */}
          {frame?.emotionQuestion && (
            <div className="bg-auriu bg-opacity-10 rounded-2xl p-4 border border-auriu border-opacity-30 max-w-sm w-full">
              <p className="text-sm text-maro font-sans italic text-center">
                💭 {frame.emotionQuestion}
              </p>
            </div>
          )}

          {!isLast ? (
            <p className="text-xs text-maro opacity-40 font-sans">
              Tapează oriunde pentru a continua
            </p>
          ) : (
            <button
              onClick={() => setPhase(activities.length > 0 ? "activity" : "end")}
              className="px-8 py-4 bg-albastru text-white font-bold rounded-2xl
                hover:bg-albastru-deschis active:scale-95 transition-all shadow-lg"
            >
              Continuă →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === "activity" && activities[currentActivityIdx]) {
    const activity = activities[currentActivityIdx];

    if (activity.type === "questions") {
      const discussionQs = (activity.content.questions as string[]) ?? [];
      return (
        <div className="min-h-screen bg-crem flex flex-col">
          <header className="bg-rosu text-white px-4 py-4">
            <h1 className="font-bold">Întrebările pentru mâine</h1>
            <p className="text-sm opacity-80 font-sans">
              Acestea sunt pentru discuția cu preotul
            </p>
          </header>
          <div className="flex-1 px-4 py-6 space-y-4">
            {discussionQs.map((q, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-crem-inchis">
                <div className="text-3xl font-bold text-auriu mb-2">{i + 1}.</div>
                <p className="text-foreground font-bold text-base">{q}</p>
                <p className="text-xs text-maro opacity-60 font-sans mt-2">
                  Gândește-te la răspuns și discutați duminică
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                if (currentActivityIdx < activities.length - 1) {
                  setCurrentActivityIdx((i) => i + 1);
                } else {
                  setPhase("end");
                }
              }}
              className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans
                hover:bg-albastru-deschis active:scale-95 transition-all"
            >
              Continuă →
            </button>
          </div>
        </div>
      );
    }

    // Alte tipuri de activitate evanghelie
    setPhase("end");
    return null;
  }

  if (phase === "end") {
    return (
      <div className="min-h-screen bg-crem flex flex-col items-center justify-center px-4 space-y-6 text-center">
        <div className="text-7xl">🌟</div>
        <div>
          <h2 className="text-2xl font-bold text-albastru">
            Evanghelie ascultată!
          </h2>
          <p className="text-maro font-sans mt-2 text-sm">
            {gospel.moralLesson}
          </p>
        </div>

        <div className="bg-auriu bg-opacity-20 rounded-2xl px-6 py-4 border border-auriu">
          <p className="text-xl font-bold text-auriu">+8 talanți 🪙</p>
          <p className="text-xs text-maro font-sans mt-1">
            Recompensă pentru Evanghelia Zilei
          </p>
        </div>

        <button
          onClick={async () => {
            await claimReward();
            router.push("/copil/harta");
          }}
          className="w-full max-w-xs py-4 rounded-2xl bg-albastru text-white font-bold font-sans
            hover:bg-albastru-deschis active:scale-95 transition-all shadow-lg"
        >
          Ia recompensa și mergi la hartă
        </button>
      </div>
    );
  }

  return null;
}
