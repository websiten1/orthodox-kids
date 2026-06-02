import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();
  if (session?.type === "parish") redirect("/parohie/dashboard");
  if (session?.type === "child")  redirect("/copil/harta");
  if (session?.type === "parent") redirect("/parinte");

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 py-12"
      style={{ background: "linear-gradient(160deg, #E7F6FD 0%, #FFF4D6 60%, #FFE7E7 100%)" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Brand */}
        <div className="text-center space-y-2">
          <div
            className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(145deg, #54C2F0, #2FA3D8)",
              boxShadow: "0 8px 0 #1A8CBF, 0 16px 24px -8px rgba(47,163,216,.5)",
            }}
          >
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M21 6L21 36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M10 17L32 17" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1
            className="text-4xl font-bold leading-tight"
            style={{ fontFamily: "'Fredoka', system-ui", color: "#403A4A" }}
          >
            Calea Luminii
          </h1>
          <p
            className="text-base"
            style={{ fontFamily: "'Nunito', system-ui", color: "#8A8296", fontWeight: 600 }}
          >
            Cateheză ortodoxă pentru copii
          </p>
        </div>

        {/* Paths */}
        <div className="w-full space-y-3">
          <a
            href="/copil"
            className="btn-candy btn-sky flex items-center justify-center gap-3 w-full text-lg"
            style={{ textDecoration: "none" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Sunt copil
          </a>

          <a
            href="/parohie/login"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full text-lg font-semibold border-2 transition-all"
            style={{
              fontFamily: "'Fredoka', system-ui",
              color: "#A43234",
              borderColor: "#A43234",
              textDecoration: "none",
              background: "white",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Parohie / Profesor
          </a>
        </div>

        <p
          className="text-sm"
          style={{ fontFamily: "'Nunito', system-ui", color: "#BBB4C6", fontWeight: 600 }}
        >
          Ești părinte?{" "}
          <a href="/parinte/login" style={{ color: "#8A8296", textDecoration: "underline" }}>
            Urmărește progresul copilului
          </a>
        </p>
      </div>
    </main>
  );
}
