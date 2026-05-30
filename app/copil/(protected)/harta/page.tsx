import { getChildSession } from "@/lib/auth";
import { DEMO_THEMES, DEMO_CHILD } from "@/lib/demo-data";
import MapView from "@/components/child/MapView";

export default async function HartaPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <MapView
      child={{ id: session.childId, displayName: session.displayName, talantsBalance: DEMO_CHILD.talantsBalance, avatarConfig: DEMO_CHILD.avatarConfig }}
      activeThemes={DEMO_THEMES}
      gospelToday={null}
    />
  );
}
