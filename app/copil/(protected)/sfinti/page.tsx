import { getChildSession } from "@/lib/auth";
import { DEMO_SAINTS } from "@/lib/demo-data";
import SaintsCollection from "@/components/child/SaintsCollection";

export default async function SfintiPage() {
  const session = await getChildSession();
  if (!session) return null;
  const totalOwned = DEMO_SAINTS.filter(s => s.owned).length;
  return <SaintsCollection saints={DEMO_SAINTS} totalOwned={totalOwned} />;
}
