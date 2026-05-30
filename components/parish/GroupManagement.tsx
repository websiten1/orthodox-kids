"use client";

import { useState } from "react";
import Link from "next/link";

type Team = { id: string; name: string };
type Child = {
  id: string;
  displayName: string;
  talantsBalance: number;
  teamId: string | null;
  teamName: string | null;
  totalActivities: number;
  lastActivityDate: string | null;
  isInactive: boolean;
};

type Props = {
  group: { id: string; name: string; teams: Team[] };
  children: Child[];
};

export default function GroupManagement({ group, children }: Props) {
  const [assigningChild, setAssigningChild] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function assignTeam(childId: string, teamId: string) {
    setSaving(true);
    await fetch("/api/parohie/copil/atribuie-echipa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId, teamId }),
    });
    setSaving(false);
    setAssigningChild(null);
    window.location.reload();
  }

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return "Niciodată";
    const d = new Date(dateStr);
    return d.toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-800">
          Copii ({children.length})
        </h2>
        <div className="flex gap-2">
          <span className="text-xs font-sans text-gray-400">
            {children.filter((c) => !c.isInactive).length} activi ·{" "}
            {children.filter((c) => c.isInactive).length} inactivi
          </span>
        </div>
      </div>

      {children.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">👦</div>
          <p className="text-gray-400 font-sans text-sm">
            Niciun copil înscris încă.
            <br />
            Distribuiți codul de grupă pentru a înscrie copii.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {children.map((child) => (
            <div
              key={child.id}
              className={`px-5 py-3.5 flex items-center gap-4 ${
                child.isInactive ? "bg-amber-50" : ""
              }`}
            >
              <div className="text-xl">
                {child.isInactive ? "💛" : "👦"}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">
                  {child.displayName}
                  {child.isInactive && (
                    <span className="ml-2 text-xs text-amber-600 font-sans">
                      inactiv
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 font-sans">
                  {child.teamName ? (
                    <span className="text-albastru font-semibold">
                      {child.teamName}
                    </span>
                  ) : (
                    <span className="text-gray-300">fără echipă</span>
                  )}{" "}
                  · {child.totalActivities} activități · ultima:{" "}
                  {formatDate(child.lastActivityDate)}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-auriu">
                  🪙 {child.talantsBalance}
                </p>
              </div>

              {/* Atribuire echipă */}
              {assigningChild === child.id ? (
                <div className="flex gap-1 shrink-0">
                  {group.teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => assignTeam(child.id, team.id)}
                      disabled={saving}
                      className={`text-xs px-2 py-1 rounded-lg font-sans font-semibold transition-all
                        ${child.teamId === team.id
                          ? "bg-albastru text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {team.name}
                    </button>
                  ))}
                  <button
                    onClick={() => setAssigningChild(null)}
                    className="text-xs px-2 py-1 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAssigningChild(child.id)}
                  className="text-xs text-gray-400 hover:text-albastru font-sans shrink-0"
                >
                  Echipă
                </button>
              )}

              <Link
                href={`/parohie/grupe/${group.id}/copil/${child.id}`}
                className="text-xs text-albastru hover:underline font-sans shrink-0"
              >
                Detalii
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
