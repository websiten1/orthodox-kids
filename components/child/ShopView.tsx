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

type Props = {
  talantsBalance: number;
  childId: string;
  items: ShopItem[];
};

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  avatar_clothing: { label: "Veșminte", emoji: "👘" },
  avatar_accessory: { label: "Accesorii", emoji: "🕯️" },
  room_item: { label: "Camera mea", emoji: "🏠" },
  card_frame: { label: "Rame sfinți", emoji: "🖼️" },
  title: { label: "Titluri", emoji: "⭐" },
};

export default function ShopView({ talantsBalance, childId, items }: Props) {
  const [activeTab, setActiveTab] = useState<string>("avatar_clothing");
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [localBalance, setLocalBalance] = useState(talantsBalance);
  const [localOwned, setLocalOwned] = useState<Set<string>>(
    new Set(items.filter((i) => i.owned).map((i) => i.id))
  );
  const [localEquipped, setLocalEquipped] = useState<Set<string>>(
    new Set(items.filter((i) => i.equipped).map((i) => i.id))
  );
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const categories = Object.keys(CATEGORY_LABELS);
  const filteredItems = items.filter((i) => i.category === activeTab);

  async function handleBuy(item: ShopItem) {
    if (localOwned.has(item.id)) {
      handleEquip(item);
      return;
    }
    if (localBalance < item.talantsCost) {
      setMessage({ text: "Nu ai suficienți talanți!", ok: false });
      setTimeout(() => setMessage(null), 2500);
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
      setLocalBalance((b) => b - item.talantsCost);
      setLocalOwned((s) => new Set([...s, item.id]));
      setMessage({ text: `"${item.name}" a fost cumpărat!`, ok: true });
    } else {
      setMessage({ text: "Eroare la cumpărare.", ok: false });
    }
    setTimeout(() => setMessage(null), 2500);
  }

  async function handleEquip(item: ShopItem) {
    if (!localOwned.has(item.id)) return;
    const isEquipped = localEquipped.has(item.id);

    await fetch("/api/copil/magazin/echipeaza", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        childId,
        shopItemId: item.id,
        equip: !isEquipped,
      }),
    });

    setLocalEquipped((s) => {
      const updated = new Set(s);
      if (isEquipped) updated.delete(item.id);
      else updated.add(item.id);
      return updated;
    });
  }

  return (
    <div className="min-h-screen bg-crem flex flex-col">
      <header className="bg-rosu text-white px-4 py-4">
        <h1 className="text-2xl font-bold">Magazinul</h1>
        <p className="text-sm opacity-80 font-sans flex items-center gap-1.5 mt-0.5">
          <span>🪙</span>
          <span className="font-bold">{localBalance}</span> talanți disponibili
        </p>
      </header>

      {/* Tab-uri categorii */}
      <div className="flex overflow-x-auto gap-2 px-4 py-3 bg-white border-b border-crem-inchis">
        {categories.map((cat) => {
          const { label, emoji } = CATEGORY_LABELS[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold font-sans transition-all
                ${activeTab === cat
                  ? "bg-rosu text-white"
                  : "bg-crem text-maro hover:bg-crem-inchis"
                }`}
            >
              <span>{emoji}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Toast */}
      {message && (
        <div
          className={`mx-4 mt-3 px-4 py-3 rounded-xl text-sm font-sans text-center font-semibold
            ${message.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      {/* Produsele */}
      <div className="flex-1 px-4 py-4 grid grid-cols-2 gap-3">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="text-4xl mb-3">🛍️</div>
            <p className="text-maro opacity-60 font-sans text-sm">
              Niciun item în această categorie.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const owned = localOwned.has(item.id);
            const equipped = localEquipped.has(item.id);
            const canAfford = localBalance >= item.talantsCost;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-3 shadow-sm border flex flex-col gap-2 transition-all
                  ${equipped ? "border-auriu ring-2 ring-auriu ring-opacity-30" : "border-crem-inchis"}`}
              >
                {/* Imaginea produsului */}
                <div className="aspect-square bg-crem rounded-xl flex items-center justify-center text-5xl">
                  {item.imageUrl.startsWith("http") ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span>{item.imageUrl}</span>
                  )}
                </div>

                <div>
                  <p className="font-bold text-maro text-sm leading-tight">
                    {item.name}
                  </p>
                  <p className="text-xs text-maro opacity-60 font-sans">
                    {item.description}
                  </p>
                </div>

                {item.isEarnable && !owned ? (
                  <div className="text-xs text-center text-auriu font-sans bg-auriu bg-opacity-10 rounded-lg px-2 py-1.5">
                    {item.requiredCondition ?? "Se câștigă"}
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={purchasing === item.id || (!owned && !canAfford)}
                    className={`w-full py-2 rounded-xl text-sm font-bold font-sans transition-all
                      ${equipped
                        ? "bg-auriu text-white"
                        : owned
                        ? "border-2 border-auriu text-auriu"
                        : canAfford
                        ? "bg-rosu text-white hover:bg-rosu-deschis active:scale-95"
                        : "bg-crem-inchis text-maro opacity-50 cursor-not-allowed"
                      }`}
                  >
                    {purchasing === item.id
                      ? "..."
                      : equipped
                      ? "✓ Echipat"
                      : owned
                      ? "Echipează"
                      : `🪙 ${item.talantsCost}`}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
