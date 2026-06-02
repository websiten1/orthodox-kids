"use client";

import { useState } from "react";
import { T, Gem, GButton, Panel, Pill, SectionTitle, Icon } from "./ui";

type ShopItem = { id: string; name: string; description: string; category: string; talantsCost: number; isEarnable: boolean; imageUrl: string; requiredCondition: string | null; owned: boolean; equipped: boolean; };

const CATS = [
  { key: "avatar_clothing",  label: "Vesm.",    color: T.sky   },
  { key: "avatar_accessory", label: "Accesorii",color: T.coral },
  { key: "room_item",        label: "Camera",   color: T.mint  },
  { key: "card_frame",       label: "Rame",     color: T.sun   },
  { key: "title",            label: "Titluri",  color: T.lilac },
];

export default function ShopView({ talantsBalance, childId, items }: { talantsBalance: number; childId: string; items: ShopItem[]; }) {
  const [tab, setTab]         = useState("avatar_clothing");
  const [buying, setBuying]   = useState<string | null>(null);
  const [balance, setBalance] = useState(talantsBalance);
  const [owned, setOwned]     = useState(new Set(items.filter(i => i.owned).map(i => i.id)));
  const [equipped, setEquipped] = useState(new Set(items.filter(i => i.equipped).map(i => i.id)));
  const [toast, setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  const filtered = items.filter(i => i.category === tab);
  const catColor = CATS.find(c => c.key === tab)?.color ?? T.coral;

  async function buy(item: ShopItem) {
    if (owned.has(item.id)) { equip(item); return; }
    if (balance < item.talantsCost) { setToast({ msg: "Nu ai suficienti talanti!", ok: false }); setTimeout(() => setToast(null), 2000); return; }
    setBuying(item.id);
    const res = await fetch("/api/copil/magazin/cumpara", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ childId, shopItemId: item.id }) });
    setBuying(null);
    if (res.ok) { setBalance(b => b - item.talantsCost); setOwned(s => new Set([...s, item.id])); setToast({ msg: `"${item.name}" cumarat!`, ok: true }); }
    else { setToast({ msg: "Eroare.", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  async function equip(item: ShopItem) {
    if (!owned.has(item.id)) return;
    const eq = !equipped.has(item.id);
    await fetch("/api/copil/magazin/echipeaza", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ childId, shopItemId: item.id, equip: eq }) });
    setEquipped(s => { const n = new Set(s); eq ? n.add(item.id) : n.delete(item.id); return n; });
  }

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
          <Pill bg={T.gold50} fg={T.goldE}><Gem size={14} /> {balance}</Pill>
        </div>
        <div style={{ padding: "2px 14px 0" }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Magazin</div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", background: "#fff", borderBottom: `1px solid ${T.line}` }}>
        {CATS.map(c => (
          <button key={c.key} onClick={() => setTab(c.key)} style={{
            fontFamily: T.fT, fontWeight: 800, fontSize: 13,
            padding: "7px 14px", borderRadius: 999, border: "none", cursor: "pointer", whiteSpace: "nowrap",
            background: tab === c.key ? c.color : T.line,
            color: tab === c.key ? "#fff" : T.ink2,
            boxShadow: tab === c.key ? `0 3px 0 ${c.color}99` : "none",
            transition: "all .15s",
          }}>{c.label}</button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ margin: "12px 16px 0", padding: "10px 16px", borderRadius: 14, background: toast.ok ? T.teal50 : T.red50, border: `1.5px solid ${toast.ok ? T.mint : T.coral}`, fontFamily: T.fT, fontSize: 14, fontWeight: 700, color: toast.ok ? T.mintE : T.coralE, textAlign: "center" }}>
          {toast.msg}
        </div>
      )}

      {/* Grid */}
      <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, paddingBottom: 90 }}>
        {filtered.map(item => {
          const isOwned    = owned.has(item.id);
          const isEquipped = equipped.has(item.id);
          const canAfford  = balance >= item.talantsCost;

          return (
            <Panel key={item.id} style={{ overflow: "hidden", border: isEquipped ? `2px solid ${catColor}` : `2px solid ${T.line}` }}>
              {/* Image */}
              <div style={{ height: 90, background: `linear-gradient(160deg, ${catColor}18, ${catColor}10)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>
                {item.imageUrl}
              </div>
              {/* Info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 15, color: T.ink, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontFamily: T.fT, fontSize: 11, color: T.ink2, fontWeight: 600, marginBottom: 10 }}>{item.description}</div>
                {item.isEarnable && !isOwned ? (
                  <div style={{ padding: "6px 10px", borderRadius: 10, background: T.gold50, border: `1.5px solid ${T.sun}`, fontFamily: T.fT, fontSize: 10, fontWeight: 700, color: T.goldE, textAlign: "center" }}>
                    {item.requiredCondition ?? "Se castiga"}
                  </div>
                ) : (
                  <button onClick={() => buy(item)} disabled={buying === item.id || (!isOwned && !canAfford)} style={{
                    width: "100%", padding: "9px 12px", borderRadius: 999,
                    border: isOwned && !isEquipped ? `2px solid ${catColor}` : "2px solid transparent",
                    cursor: "pointer",
                    fontFamily: T.fT, fontSize: 14, fontWeight: 800,
                    background: isEquipped ? catColor : isOwned ? "#fff" : canAfford ? catColor : T.line,
                    color: isEquipped ? "#fff" : isOwned ? catColor : canAfford ? "#fff" : T.ink3,
                    boxShadow: (isEquipped || (canAfford && !isOwned)) ? `0 3px 0 ${catColor}88` : "none",
                    opacity: (!isOwned && !canAfford) ? 0.5 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    transition: "all .12s",
                  }}>
                    {buying === item.id ? "..." : isEquipped ? "Echipat" : isOwned ? "Echipeaza" : (
                      <><Gem size={12} /> {item.talantsCost}</>
                    )}
                  </button>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
