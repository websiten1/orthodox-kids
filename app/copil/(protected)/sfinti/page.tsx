import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SaintsCollection from "@/components/child/SaintsCollection";

export default async function SfintiPage() {
  const session = await getChildSession();
  if (!session) return null;

  const allSaints = await prisma.saintCard.findMany({
    orderBy: [{ region: "asc" }, { name: "asc" }],
  });

  const ownedCards = await prisma.childSaintCollection.findMany({
    where: { childId: session.childId },
    select: { saintCardId: true, frameId: true },
  });

  const ownedIds = new Set(ownedCards.map((c) => c.saintCardId));

  return (
    <SaintsCollection
      saints={allSaints.map((s) => ({
        ...s,
        owned: ownedIds.has(s.id),
      }))}
      totalOwned={ownedIds.size}
    />
  );
}
