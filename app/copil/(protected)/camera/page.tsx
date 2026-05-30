import { getChildSession } from "@/lib/auth";
import Link from "next/link";

export default async function CameraPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <div className="min-h-screen bg-crem flex flex-col">
      <header className="bg-maro text-crem px-4 py-5">
        <h1 className="text-2xl font-bold">Camera mea</h1>
        <p className="text-sm opacity-70 font-sans mt-0.5">Personalizează-ți spațiul</p>
      </header>
      <div className="flex-1 relative bg-gradient-to-b from-sky-100 to-amber-50 m-4 rounded-3xl overflow-hidden min-h-64 shadow-inner border border-crem-inchis">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1" />
          <div className="h-1/3 bg-amber-100 opacity-60" />
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
          <div className="text-center"><div className="text-5xl">🖼️</div><p className="text-xs text-maro opacity-70 font-sans mt-1">Icoană</p></div>
          <div className="text-center"><div className="text-5xl">🕯️</div><p className="text-xs text-maro opacity-70 font-sans mt-1">Lumânare</p></div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link href="/copil/magazin" className="block w-full text-center py-4 bg-rosu text-white font-bold rounded-2xl font-sans hover:bg-rosu-deschis active:scale-95 transition-all shadow-md">
          🛍️ Mergi la Magazin
        </Link>
      </div>
    </div>
  );
}
