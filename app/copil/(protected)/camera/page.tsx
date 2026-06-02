import { getChildSession } from "@/lib/auth";
import { T, GButton, Panel, Medallion, SectionTitle, Icon } from "@/components/child/ui";
import Link from "next/link";

export default async function CameraPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      <div style={{ background: "#fff", borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 22px" }}>
          <span style={{ fontFamily: T.fT, fontSize: 14, fontWeight: 800, color: T.ink }}>9:41</span>
        </div>
        <div style={{ padding: "2px 14px 0" }}>
          <div style={{ fontFamily: T.fD, fontWeight: 700, fontSize: 24, color: T.ink }}>Camera mea</div>
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, paddingBottom: 90 }}>
        <Panel style={{ overflow: "hidden", height: 240, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #E8F4FC 0%, #FFF8EE 65%, #ECD9BE 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "#D4C0A0", borderTop: "2px solid #C4A880" }} />
          <div style={{ position: "absolute", bottom: "30%", left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "0 30px", alignItems: "flex-end" }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 48 }}>🖼️</div><span style={{ fontFamily: T.fT, fontSize: 10, color: T.ink2, fontWeight: 700 }}>Icoana</span></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 44 }}>🕯️</div><span style={{ fontFamily: T.fT, fontSize: 10, color: T.ink2, fontWeight: 700 }}>Lumanare</span></div>
          </div>
        </Panel>
        <Link href="/copil/magazin" style={{ textDecoration: "none" }}>
          <GButton color="coral" full big icon={<Icon name="shapes" size={19} color="#fff" stroke={2} />}>Mergi la Magazin</GButton>
        </Link>
      </div>
    </div>
  );
}
