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
    <div className="min-h-screen bg-gray-50 flex">
      <ParishSidebar parishName={session!.name} />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">{children}</main>
    </div>
  );
}
