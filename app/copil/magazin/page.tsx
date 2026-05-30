import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ShopView from "@/components/child/ShopView";

export default async function MagazinPage() {
  const session = await getChildSession();
  if (!session) return null;

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    select: {
      id: true,
      talantsBalance: true,
      inventory: {
        include: { shopItem: true },
      },
    },
  });

  if (!child) return null;

  const allItems = await prisma.shopItem.findMany({
    orderBy: { talantsCost: "asc" },
  });

  const ownedIds = new Set(child.inventory.map((i) => i.shopItemId));
  const equippedIds = new Set(
    child.inventory.filter((i) => i.isEquipped).map((i) => i.shopItemId)
  );

  return (
    <ShopView
      talantsBalance={child.talantsBalance}
      childId={child.id}
      items={allItems.map((item) => ({
        ...item,
        owned: ownedIds.has(item.id),
        equipped: equippedIds.has(item.id),
      }))}
    />
  );
}
