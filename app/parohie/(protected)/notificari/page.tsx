"use client";
import { useState } from "react";

const PRESETS = [
  "Ora de cateheză va fi mâine la ora 10:00!",
  "Felicitări echipei câștigătoare! Continuați cu entuziasm!",
  "A apărut o temă nouă. Intrați și vedeți activitățile!",
  "Vă invităm la slujba de duminică la ora 09:00.",
];

const GROUPS = [
  { id: "all", name: "Toată parohia" },
  { id: "g1", name: "Grupul Mic (Cl. I-II)" },
  { id: "g2", name: "Grupul Mare (Cl. V-VI)" },
];

export default function NotificariPage() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl space-y-6 lg:pt-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notificări</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">Trimiteți anunțuri copiilor. Fără chat, doar mesaje de grup.</p>
      </div>
      <form onSubmit={handleSend} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">Destinatari</label>
          <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans">
            {GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">Mesaj</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} maxLength={500}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-albastru focus:outline-none font-sans resize-none"
            placeholder="Scrieți mesajul dvs..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">Mesaje predefinite</label>
          <div className="space-y-2">
            {PRESETS.map(p => (
              <button key={p} type="button" onClick={() => setMessage(p)}
                className="w-full text-left text-sm text-gray-600 font-sans px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                {p}
              </button>
            ))}
          </div>
        </div>
        {sent && <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-sans text-center">✅ Mesaj trimis cu succes!</div>}
        <button type="submit" disabled={!message.trim()}
          className="w-full py-4 rounded-xl bg-albastru text-white font-bold font-sans hover:bg-albastru-deschis transition-all disabled:opacity-60">
          Trimite notificarea
        </button>
      </form>
    </div>
  );
}
