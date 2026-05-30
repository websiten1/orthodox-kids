"use client";

import { useState } from "react";

type Theme = {
  id: string;
  title: string;
  weekNumber: number;
  description: string;
  mapLocation: string;
  iconEmoji: string;
  ageRange: string;
  activityCount: number;
  totalMins: number;
  totalTalants: number;
  activeInGroups: string[];
};

type Group = { id: string; name: string; ageRange: string };

type Props = {
  themes: Theme[];
  groups: Group[];
};

const AGE_LABELS: Record<string, string> = {
  "all": "Toate",
  "1-2": "Cl. I-II",
  "3-4": "Cl. III-IV",
  "5-6": "Cl. V-VI",
  "7-8": "Cl. VII-VIII",
};

export default function ThemeLibrary({ themes, groups }: Props) {
  const [activatingTheme, setActivatingTheme] = useState<string | null>(null);
  const [localActive, setLocalActive] = useState<Record<string, Set<string>>>(
    () => {
      const map: Record<string, Set<string>> = {};
      for (const t of themes) {
        map[t.id] = new Set(t.activeInGroups);
      }
      return map;
    }
  );

  async function toggleTheme(themeId: string, groupId: string, activate: boolean) {
    setActivatingTheme(themeId);
    await fetch("/api/parohie/teme/activa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themeId, groupId, isActive: activate }),
    });

    setLocalActive((prev) => {
      const updated = { ...prev };
      const groupSet = new Set(updated[themeId] ?? []);
      if (activate) groupSet.add(groupId);
      else groupSet.delete(groupId);
      updated[themeId] = groupSet;
      return updated;
    });
    setActivatingTheme(null);
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Biblioteca de teme</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">
          Activați teme pentru grupe. Conținutul este pre-creat.
        </p>
      </div>

      <div className="space-y-4">
        {themes.map((theme) => {
          const activeGroups = localActive[theme.id] ?? new Set();
          const isActivatingThis = activatingTheme === theme.id;

          return (
            <div
              key={theme.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5 flex items-start gap-4">
                <div className="text-3xl shrink-0">{theme.iconEmoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-800">
                        Săptămâna {theme.weekNumber}: {theme.title}
                      </p>
                      <p className="text-sm text-gray-500 font-sans mt-0.5">
                        {theme.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs bg-gray-100 text-gray-500 rounded-lg px-2 py-1 font-sans">
                      {AGE_LABELS[theme.ageRange] ?? theme.ageRange}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-2 text-xs text-gray-400 font-sans">
                    <span>📚 {theme.activityCount} activități</span>
                    <span>⏱️ ~{theme.totalMins} min</span>
                    <span>🪙 {theme.totalTalants} talanți</span>
                  </div>
                </div>
              </div>

              {/* Grupe */}
              {groups.length > 0 && (
                <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                  <p className="text-xs font-semibold text-gray-400 font-sans mb-2">
                    Activă pentru:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {groups.map((group) => {
                      const isActive = activeGroups.has(group.id);
                      return (
                        <button
                          key={group.id}
                          onClick={() =>
                            toggleTheme(theme.id, group.id, !isActive)
                          }
                          disabled={isActivatingThis}
                          className={`text-xs px-3 py-1.5 rounded-lg font-sans font-semibold transition-all
                            ${isActive
                              ? "bg-albastru text-white"
                              : "border border-gray-200 text-gray-500 hover:border-albastru hover:text-albastru"
                            } ${isActivatingThis ? "opacity-50" : ""}`}
                        >
                          {isActive ? "✓ " : ""}{group.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
