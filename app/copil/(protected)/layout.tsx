import { redirect } from "next/navigation";
import { getChildSession } from "@/lib/auth";
import ChildNav from "@/components/child/ChildNav";

export default async function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getChildSession();
  if (!session) {
    redirect("/copil");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FFFFFF", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <div style={{ flex: 1, paddingBottom: 72 }}>{children}</div>
      <ChildNav />
    </div>
  );
}
