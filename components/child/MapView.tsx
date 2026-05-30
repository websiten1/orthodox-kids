"use client";

import { useState } from "react";
import Link from "next/link";

type Activity = {
  id: string;
  title: string;
  type: string;
  talantsReward: number;
  estimatedMins: number;
  completed: boolean;
  orderIndex: number;
};

type Theme = {
  id: string;
  title: string;
  mapLocation: string;
  iconEmoji: string;
  activities: Activity[];
};

type Child = {
  id: string;
  displayName: string;
  talantsBalance: number;
  avatarConfig: Record<string, unknown>;
};

type Props = {
  child: Child;
  activeThemes: Theme[];
  gospelToday: { id: string; title: string } | null;
};

const MAP_LOCATIONS = [
  {
    id: "biserica",
    label: "Biserica",
    emoji: "⛪",
    x: 50,
    y: 25,
    size: "large",
  },
  {
    id: "gradina",
    label: "Grădina",
    emoji: "🌿",
    x: 25,
    y: 45,
    size: "medium",
  },
  {
    id: "scriptoriu",
    label: "Scriptoriul",
    emoji: "📜",
    x: 75,
    y: 45,
    size: "medium",
  },
  {
    id: "drumul_sfintilor",
    label: "Drumul Sfinților",
    emoji: "⭐",
    x: 50,
    y: 60,
    size: "medium",
  },
  {
    id: "clopotnita",
    label: "Clopotnița",
    emoji: "🔔",
    x: 20,
    y: 70,
    size: "small",
  },
  {
    id: "fantana",
    label: "Fântâna",
    emoji: "💧",
    x: 80,
    y: 70,
    size: "small",
  },
  {
    id: "piata_parohiei",
    label: "Piața",
    emoji: "🏘️",
    x: 50,
    y: 85,
    size: "medium",
  },
];

function getActivityTypeIcon(type: string) {
  const icons: Record<string, string> = {
    lesson: "📖",
    quiz: "❓",
    minigame: "🎮",
    group_mission: "👥",
    matching: "🔗",
  };
  return icons[type] ?? "✦";
}

export default function MapView({ child, activeThemes, gospelToday }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const themesByLocation = new Map<string, Theme>();
  for (const theme of activeThemes) {
    themesByLocation.set(theme.mapLocation, theme);
  }

  const selectedTheme = selectedLocation
    ? themesByLocation.get(selectedLocation)
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-albastru text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            {(child.avatarConfig.avatarType as number) === 1 ? "👧" : "👦"}
          </span>
          <span className="font-semibold text-sm">{child.displayName}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white bg-opacity-20 rounded-full px-3 py-1">
          <span className="text-lg">🪙</span>
          <span className="font-bold text-sm">{child.talantsBalance}</span>
          <span className="text-xs opacity-80">talanți</span>
        </div>
      </header>

      {/* Harta */}
      <div className="relative flex-1 bg-gradient-to-b from-sky-100 to-green-50 overflow-hidden">
        {/* Titlul hartei */}
        <div className="absolute top-3 left-0 right-0 text-center pointer-events-none">
          <h1 className="text-lg font-bold text-albastru drop-shadow-sm">
            Harta Parohiei
          </h1>
        </div>

        {/* Evanghelia zilei — duminica */}
        {gospelToday && (
          <Link
            href={`/copil/evanghelie/${gospelToday.id}`}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-20
              bg-auriu text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg
              flex items-center gap-2 pulse-gold animate-bounce"
          >
            <span>✨</span>
            Evanghelia Zilei
            <span>✨</span>
          </Link>
        )}

        {/* Locațiile pe hartă */}
        <div className="relative w-full" style={{ paddingBottom: "130%" }}>
          {MAP_LOCATIONS.map((loc) => {
            const theme = themesByLocation.get(loc.id);
            const hasTheme = !!theme;
            const completedCount = theme?.activities.filter(
              (a) => a.completed
            ).length ?? 0;
            const totalCount = theme?.activities.length ?? 0;
            const isCompleted = hasTheme && completedCount === totalCount && totalCount > 0;
            const isActive = hasTheme && completedCount < totalCount;
            const isSelected = selectedLocation === loc.id;

            const sizeMap = {
              large: { w: 80, h: 80, text: "text-4xl" },
              medium: { w: 64, h: 64, text: "text-3xl" },
              small: { w: 48, h: 48, text: "text-2xl" },
            };
            const size = sizeMap[loc.size as keyof typeof sizeMap];

            return (
              <button
                key={loc.id}
                onClick={() =>
                  setSelectedLocation(isSelected ? null : loc.id)
                }
                disabled={!hasTheme}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-md
                  ${isSelected ? "scale-110 ring-2 ring-auriu" : ""}
                  ${isCompleted ? "bg-green-100 border-2 border-green-400" : ""}
                  ${isActive && !isCompleted ? "bg-white border-2 border-auriu pulse-gold" : ""}
                  ${!hasTheme ? "bg-gray-100 opacity-40 cursor-default border border-gray-200" : ""}`}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  width: `${size.w}px`,
                  height: `${size.h}px`,
                }}
              >
                <span className={size.text}>{loc.emoji}</span>
                <span className="text-xs font-bold text-center leading-tight text-maro px-1 font-sans">
                  {loc.label}
                </span>
                {hasTheme && (
                  <div className="text-xs font-sans text-maro opacity-70">
                    {completedCount}/{totalCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panou detalii temă — apare când selectezi o locație */}
      {selectedTheme && (
        <div className="fixed inset-x-0 bottom-16 z-40 px-4 max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-auriu p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-albastru text-lg">
                  {selectedTheme.iconEmoji} {selectedTheme.title}
                </h2>
                <p className="text-sm text-maro opacity-70 font-sans">
                  {selectedTheme.activities.filter((a) => a.completed).length} din{" "}
                  {selectedTheme.activities.length} activități completate
                </p>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-maro opacity-50 hover:opacity-100 p-1"
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-crem-inchis rounded-full overflow-hidden">
              <div
                className="h-full bg-auriu rounded-full transition-all"
                style={{
                  width: `${
                    (selectedTheme.activities.filter((a) => a.completed).length /
                      Math.max(selectedTheme.activities.length, 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            {/* Activitățile */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedTheme.activities.map((activity, idx) => {
                const prevCompleted =
                  idx === 0 || selectedTheme.activities[idx - 1].completed;
                const isLocked = !prevCompleted && !activity.completed;

                return (
                  <Link
                    key={activity.id}
                    href={
                      isLocked
                        ? "#"
                        : `/copil/activitate/${activity.id}`
                    }
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-all font-sans
                      ${activity.completed ? "bg-green-50 border border-green-200" : ""}
                      ${!activity.completed && !isLocked ? "bg-crem hover:bg-crem-inchis border border-auriu border-opacity-30" : ""}
                      ${isLocked ? "bg-gray-50 opacity-50 cursor-not-allowed border border-gray-100" : ""}`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <span className="text-xl">
                      {activity.completed
                        ? "✅"
                        : isLocked
                        ? "🔒"
                        : getActivityTypeIcon(activity.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-maro truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-maro opacity-60">
                        {activity.estimatedMins} min · +{activity.talantsReward} talanți
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
