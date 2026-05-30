"use client";

import { useState, useEffect } from "react";

type Group = { id: string; name: string };

const PRESET_MESSAGES = [
  "Ora de cateheză va fi mâine la ora 10:00!",
  "Felicitări echipei câștigătoare! Continuați cu entuziasm!",
  "A apărut o temă nouă. Intru și văd activitățile!",
  "Vă invitați la slujba de duminică la ora 09:00.",
  "Mulțumim tuturor copiilor activi săptămâna aceasta!",
];

export default function NotificariPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch("/api/parohie/grupe")
      .then((r) => r.json())
      .then((d) => setGroups(d.groups ?? []));
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);

    await fetch("/api/parohie/notificari", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: selectedGroup === "all" ? null : selectedGroup,
        message: message.trim(),
      }),
    });

    setSending(false);
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notificări</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">
          Trimiteți anunțuri copiilor. Nu există chat, doar mesaje de grup.
        </p>
      </div>

      <form
        onSubmit={handleSend}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Destinatari
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans"
          >
            <option value="all">Toată parohia</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Mesaj
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans resize-none"
            placeholder="Scrieți mesajul dvs..."
          />
          <p className="text-xs text-gray-400 font-sans text-right mt-1">
            {message.length}/500
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
            Mesaje predefinite
          </label>
          <div className="space-y-2">
            {PRESET_MESSAGES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setMessage(preset)}
                className="w-full text-left text-sm text-gray-600 font-sans px-3 py-2 rounded-lg
                  bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {sent && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-sans text-center">
            ✅ Mesaj trimis cu succes!
          </div>
        )}

        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans
            hover:bg-albastru-deschis transition-all disabled:opacity-60"
        >
          {sending ? "Se trimite..." : "Trimite notificarea"}
        </button>
      </form>
    </div>
  );
}
