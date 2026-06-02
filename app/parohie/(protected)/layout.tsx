import { redirect } from "next/navigation";
import { getParishSession } from "@/lib/auth";
import ParishSidebar from "@/components/parish/ParishSidebar";

export default async function ParishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getParishSession();
  if (!session) {
    redirect("/parohie/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FBF6EC", display: "flex" }}>
      <ParishSidebar parishName={session!.name} />
      <main style={{ flex: 1, marginLeft: 0 }} className="lg:ml-[220px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
