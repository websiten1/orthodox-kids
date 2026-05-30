import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();

  if (session?.type === "parish") {
    redirect("/parohie/dashboard");
  }
  if (session?.type === "child") {
    redirect("/copil/harta");
  }
  if (session?.type === "parent") {
    redirect("/parinte");
  }

  // Pagina de prezentare cu 2 căi: copil sau parohie
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Fundal decorativ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rosu via-auriu to-rosu" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-rosu via-auriu to-rosu" />
      </div>

      <div className="w-full max-w-md space-y-8 text-center relative">
        {/* Logo / Titlu */}
        <div className="space-y-3">
          <div className="text-6xl">✦</div>
          <h1 className="text-4xl font-bold text-albastru leading-tight">
            Calea Luminii
          </h1>
          <p className="text-maro text-lg">
            Cateheză ortodoxă pentru copii
          </p>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-px flex-1 bg-auriu opacity-40" />
            <span className="text-auriu text-sm">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-auriu opacity-40" />
          </div>
        </div>

        {/* Cele 2 căi principale */}
        <div className="space-y-4">
          <a
            href="/copil"
            className="block w-full py-5 px-6 rounded-2xl text-white font-semibold text-xl transition-all shadow-lg
              bg-albastru hover:bg-albastru-deschis active:scale-95"
          >
            <span className="block text-2xl mb-1">⛪</span>
            Sunt copil
            <span className="block text-sm font-normal opacity-80 mt-1">
              Intru cu codul clasei mele
            </span>
          </a>

          <a
            href="/parohie/login"
            className="block w-full py-5 px-6 rounded-2xl font-semibold text-xl transition-all shadow-md
              border-2 border-auriu text-auriu bg-white hover:bg-auriu hover:text-white active:scale-95"
          >
            <span className="block text-2xl mb-1">🕯️</span>
            Parohie / Profesor
            <span className="block text-sm font-normal opacity-70 mt-1">
              Administrare grupă
            </span>
          </a>
        </div>

        <p className="text-sm text-maro opacity-60">
          Ești părinte?{" "}
          <a href="/parinte/login" className="underline hover:text-auriu">
            Urmărește progresul copilului
          </a>
        </p>
      </div>
    </main>
  );
}
