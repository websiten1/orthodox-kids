import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { T, GButton, Medallion, Icon } from "@/components/child/ui";

export default async function HomePage() {
  const session = await getSession();
  if (session?.type === "parish") redirect("/parohie/dashboard");
  if (session?.type === "child")  redirect("/copil/harta");

  return (
    <main style={{ minHeight: "100vh", background: "#FBF8FF", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Brand medallion */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Medallion icon="✦" size={100} glow />
          </div>
          <h1 style={{ fontFamily: T.fD, fontSize: 38, fontWeight: 700, color: T.ink, margin: "0 0 6px", lineHeight: 1.05 }}>
            Calea Luminii
          </h1>
          <p style={{ fontFamily: T.fT, fontSize: 15, color: T.ink2, fontWeight: 600, margin: 0 }}>
            Cateheză ortodoxă pentru copii
          </p>
        </div>

        {/* Buttons */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="/copil" style={{ textDecoration: "none", display: "block" }}>
            <GButton color="coral" full big icon={<Icon name="book-open" size={20} color="#fff" stroke={2} />}>
              Sunt copil
            </GButton>
          </a>
          <a href="/parohie/login" style={{ textDecoration: "none", display: "block" }}>
            <GButton color="teal" full big icon={<Icon name="user-round" size={20} color="#fff" stroke={2} />}>
              Parohie / Profesor
            </GButton>
          </a>
        </div>

        <p style={{ fontFamily: T.fT, fontSize: 12, color: T.ink3, fontWeight: 600 }}>
          Ești părinte?{" "}
          <a href="/parinte/login" style={{ color: T.ink2, textDecoration: "underline" }}>Urmărește progresul copilului</a>
        </p>
      </div>
    </main>
  );
}
