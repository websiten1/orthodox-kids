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
    <div className="min-h-screen flex flex-col bg-crem max-w-lg mx-auto relative">
      <div className="flex-1 pb-20">{children}</div>
      <ChildNav />
    </div>
  );
}
