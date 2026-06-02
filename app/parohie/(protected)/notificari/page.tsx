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

const inputStyle = {
  width: "100%", padding: "12px 15px", borderRadius: 12,
  border: "1.5px solid #ECE3D2", fontFamily: "'Nunito', sans-serif",
  fontSize: 14, fontWeight: 600, color: "#403A4A",
  background: "#FDFAF5", outline: "none", boxSizing: "border-box" as const,
  transition: "border-color .15s",
};

export default function NotificariPage() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true); setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div style={{ padding: "24px 20px 40px", maxWidth: 560 }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B58A3C", margin: "0 0 4px" }}>PAROHIE</p>
        <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 30, fontWeight: 700, color: "#403A4A", margin: 0 }}>Notificări</h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 600, marginTop: 4 }}>Trimiteți anunțuri copiilor. Fără chat — doar mesaje de grup.</p>
      </div>

      <div style={{ background: "white", borderRadius: 20, padding: "24px", border: "1px solid #ECE3D2", boxShadow: "0 2px 12px -4px rgba(164,50,52,.08)" }}>
        <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A8296", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Destinatari</p>
            <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} style={{ ...inputStyle }}>
              {GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A8296", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Mesaj</p>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} maxLength={500}
              style={{ ...inputStyle, resize: "none" }} placeholder="Scrieți mesajul..." />
          </div>
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A8296", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Mesaje predefinite</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {PRESETS.map(p => (
                <button key={p} type="button" onClick={() => setMessage(p)}
                  style={{ textAlign: "left", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #ECE3D2", background: "#FDFAF5", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600, color: "#403A4A", transition: "border-color .15s" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {sent && (
            <div style={{ background: "#EBF3EF", border: "1.5px solid #2E5A47", borderRadius: 12, padding: "10px 14px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#2E5A47", textAlign: "center" }}>
              Mesaj trimis cu succes!
            </div>
          )}
          <button type="submit" disabled={!message.trim()} className="btn-candy btn-red" style={{ opacity: !message.trim() ? 0.6 : 1 }}>
            Trimite notificarea
          </button>
        </form>
      </div>
    </div>
  );
}
