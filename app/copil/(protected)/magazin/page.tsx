import { getChildSession } from "@/lib/auth";
import { DEMO_SHOP_ITEMS, DEMO_CHILD } from "@/lib/demo-data";
import ShopView from "@/components/child/ShopView";
export default async function MagazinPage() {
  const session = await getChildSession();
  if (!session) return null;
  return <ShopView talantsBalance={DEMO_CHILD.talantsBalance} childId={session.childId} items={DEMO_SHOP_ITEMS} />;
}
