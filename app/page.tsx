import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LandingPage from "./LandingPage";

export default async function HomePage() {
  const session = await getSession();
  if (session?.type === "parish") redirect("/parohie/dashboard");
  if (session?.type === "child")  redirect("/copil/harta");
  if (session?.type === "parent") redirect("/parinte");

  return <LandingPage />;
}
