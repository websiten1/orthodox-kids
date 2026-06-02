"use client";

import { useState } from "react";

type ShopItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  talantsCost: number;
  isEarnable: boolean;
  imageUrl: string;
  requiredCondition: string | null;
  owned: boolean;
  equipped: boolean;
};

const CATS: { key: string; label: string; color: string }[] = [
  { key: "avatar_clothing", label: "Veșminte", color: "#54C2F0" },
  { key: "avatar_accessory", label: "Accesorii", color: "#FF7A5C" },
  { key: "room_item", label: "Cameră", color: "#C4956A" },
  { key: "card_frame", label: "Rame", color: "#FFC23D" },
  { key: "title", label: "Titluri", color: "#A77BF0" },
];

export default function ShopView({
  talantsBalance,
  childId,
  items,
}: {
  talantsBalance: number;
  childId: string;
  items: ShopItem[];
}) {
  const [activeTab, setActiveTab] = useState("avatar_clothing");
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [localBalance, setLocalBalance] = useState(talantsBalance);
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set(items.filter(i => i.owned).map(i => i.id)));
  const [equippedIds, setEquippedIds] = useState<Set<string>>(new Set(items.filter(i => i.equipped).map(i => i.id)));
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const filtered = items.filter(i => i.category === activeTab);

  async function handleBuy(item: ShopItem) {
    if (ownedIds.has(item.id)) { handleEquip(item); return; }
    if (localBalance < item.talantsCost) {
      setToast({ msg: "Nu ai suficienți talanți!", ok: false });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setPurchasing(item.id);
    const res = await fetch("/api/copil/magazin/cumpara", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId, shopItemId: item.id }),
    });
    setPurchasing(null);
    if (res.ok) {
      setLocalBalance(b => b - item.talantsCost);
      setOwnedIds(s => new Set([...s, item.id]));
      setToast({ msg: `"${item.name}" cumpărat!`, ok: true });
    } else { setToast({ msg: "Eroare la cumpărare.", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  async function handleEquip(item: ShopItem) {
    if (!ownedIds.has(item.id)) return;
    const eq = !equippedIds.has(item.id);
    await fetch("/api/copil/magazin/echipeaza", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId, shopItemId: item.id, equip: eq }),
    });
    setEquippedIds(s => {
      const n = new Set(s);
      eq ? n.add(item.id) : n.delete(item.id);
      return n;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #FF7A5C, #E85636)", padding: "52px 16px 20px" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 4px" }}>Magazin</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC23D">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>{localBalance}</span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.8)", fontWeight: 600 }}>talanți disponibili</span>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", background: "white", borderBottom: "1.5px solid #EFEBF5" }}>
        {CATS.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 14, fontWeight: 600,
              padding: "8px 16px", borderRadius: 999, border: "none",
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              background: activeTab === cat.key ? cat.color : "#F4F1FA",
              color: activeTab === cat.key ? "white" : "#8A8296",
              boxShadow: activeTab === cat.key ? `0 3px 0 ${cat.color}88` : "none",
              transition: "all .15s",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          margin: "12px 16px 0",
          padding: "12px 16px",
          borderRadius: 14,
          background: toast.ok ? "#E4FAF3" : "#FFEDE7",
          border: `1.5px solid ${toast.ok ? "#3FD1A8" : "#FF7A5C"}`,
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: toast.ok ? "#22AE88" : "#E85636",
          textAlign: "center",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Grid */}
      <div style={{ flex: 1, padding: "16px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, alignContent: "start" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "span 2", textAlign: "center", padding: "40px 20px" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 18, color: "#BBB4C6" }}>Niciun produs în această categorie.</p>
          </div>
        ) : filtered.map(item => {
          const owned = ownedIds.has(item.id);
          const equipped = equippedIds.has(item.id);
          const canAfford = localBalance >= item.talantsCost;
          const catColor = CATS.find(c => c.key === item.category)?.color ?? "#54C2F0";

          return (
            <div
              key={item.id}
              style={{
                background: "white", borderRadius: 20, overflow: "hidden",
                border: equipped ? `2px solid ${catColor}` : "1.5px solid #EFEBF5",
                boxShadow: equipped ? `0 0 0 3px ${catColor}22` : "0 4px 14px -8px rgba(120,80,160,.15)",
              }}
            >
              {/* Image area */}
              <div style={{
                background: `linear-gradient(145deg, ${catColor}22, ${catColor}11)`,
                height: 90,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 42,
              }}>
                {item.imageUrl}
              </div>

              {/* Info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 700, color: "#403A4A", margin: "0 0 2px", lineHeight: 1.1 }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8A8296", fontWeight: 600, margin: "0 0 10px" }}>
                  {item.description}
                </p>

                {item.isEarnable && !owned ? (
                  <div style={{
                    padding: "6px 10px", borderRadius: 10,
                    background: "#FFF4D6", border: "1.5px solid #FFC23D",
                    fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 700, color: "#EFA014",
                    textAlign: "center",
                  }}>
                    {item.requiredCondition ?? "Se câștigă"}
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={purchasing === item.id || (!owned && !canAfford)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 999,
                      border: owned && !equipped ? `2px solid ${catColor}` : "2px solid transparent",
                      cursor: "pointer",
                      fontFamily: "'Fredoka', sans-serif", fontSize: 14, fontWeight: 700,
                      background: equipped ? catColor : owned ? "white" : canAfford ? catColor : "#F4F1FA",
                      color: equipped ? "white" : owned ? catColor : canAfford ? "white" : "#BBB4C6",
                      boxShadow: (equipped || (canAfford && !owned)) ? `0 3px 0 ${catColor}88` : "none",
                      transition: "all .15s",
                      opacity: (!owned && !canAfford) ? 0.5 : 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}
                  >
                    {purchasing === item.id ? "..." : equipped ? "Echipat" : owned ? "Echipează" : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill={canAfford ? "#FFC23D" : "#BBB4C6"}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        {item.talantsCost}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
