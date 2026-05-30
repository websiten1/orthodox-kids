import { getChildSession } from "@/lib/auth";
import { DEMO_CHILD } from "@/lib/demo-data";
import Link from "next/link";

export default async function ProfilPage() {
  const session = await getChildSession();
  if (!session) return null;
  const iconPercent = Math.round((DEMO_CHILD.iconProgress.completedLayers / DEMO_CHILD.iconProgress.totalLayers) * 100);

  return (
    <div className="min-h-screen bg-crem">
      <div className="bg-albastru text-white px-4 py-8 text-center">
        <div className="text-7xl mb-3">👦</div>
        <h1 className="text-2xl font-bold">{session.displayName}</h1>
        <p className="text-sm opacity-80 mt-1 font-sans">Ucenic · Echipa Apostolii</p>
      </div>
      <div className="px-4 py-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-crem-inchis">
            <div className="text-3xl font-bold text-auriu">{DEMO_CHILD.talantsBalance}</div>
            <div className="text-xs text-maro opacity-70 font-sans mt-1">Talanți</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-crem-inchis">
            <div className="text-3xl font-bold text-albastru">{DEMO_CHILD.totalActivities}</div>
            <div className="text-xs text-maro opacity-70 font-sans mt-1">Activități</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-crem-inchis">
            <div className="text-3xl font-bold text-rosu">{DEMO_CHILD.totalSaints}</div>
            <div className="text-xs text-maro opacity-70 font-sans mt-1">Sfinți</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-crem-inchis">
          <h3 className="font-bold text-maro mb-3">🖼️ Icoana mea personală</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-xl border-2 border-auriu bg-crem-inchis flex items-center justify-center">
              <span className="text-2xl opacity-40">✦</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm font-sans mb-1">
                <span className="text-maro font-semibold">În construcție</span>
                <span className="text-auriu font-bold">{iconPercent}%</span>
              </div>
              <div className="h-3 bg-crem-inchis rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-auriu to-auriu-deschis rounded-full" style={{width: `${iconPercent}%`}} />
              </div>
              <p className="text-xs text-maro opacity-60 font-sans mt-1">{DEMO_CHILD.iconProgress.completedLayers} din {DEMO_CHILD.iconProgress.totalLayers} straturi</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/copil/magazin" className="bg-rosu text-white rounded-2xl p-4 text-center font-bold font-sans shadow-md hover:bg-rosu-deschis active:scale-95 transition-all">
            <div className="text-2xl mb-1">🛍️</div>Magazin
          </Link>
          <Link href="/copil/sfinti" className="bg-albastru text-white rounded-2xl p-4 text-center font-bold font-sans shadow-md hover:bg-albastru-deschis active:scale-95 transition-all">
            <div className="text-2xl mb-1">⭐</div>Sfinții mei
          </Link>
          <Link href="/copil/camera" className="bg-auriu text-white rounded-2xl p-4 text-center font-bold font-sans shadow-md hover:opacity-90 active:scale-95 transition-all col-span-2">
            <div className="text-2xl mb-1">🏠</div>Camera mea
          </Link>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="w-full py-3 text-sm text-maro opacity-50 hover:opacity-80 font-sans">
            Ieșire din cont
          </button>
        </form>
      </div>
    </div>
  );
}
