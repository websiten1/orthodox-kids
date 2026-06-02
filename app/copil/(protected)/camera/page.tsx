import { getChildSession } from "@/lib/auth";
import Link from "next/link";

export default async function CameraPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(160deg, #C4956A, #A07040)", padding: "52px 16px 20px" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 4px" }}>Camera mea</p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", fontWeight: 600, margin: 0 }}>Personalizează-ți spațiul</p>
      </div>

      {/* Room */}
      <div style={{
        margin: 16, borderRadius: 24, overflow: "hidden",
        background: "linear-gradient(180deg, #E8F4FC 0%, #FFF8EE 60%, #F5EDD8 100%)",
        minHeight: 240, position: "relative",
        border: "1.5px solid #EFEBF5",
        boxShadow: "0 8px 24px -10px rgba(120,80,160,.15)",
      }}>
        {/* Floor */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "#ECD9BE", borderTop: "2px solid #D4C0A0" }} />
        {/* Items */}
        <div style={{ position: "absolute", bottom: "34%", left: 0, right: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end", padding: "0 20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🖼️</div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, color: "#8A8296", fontWeight: 700, margin: "4px 0 0" }}>Icoană</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44 }}>🕯️</div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, color: "#8A8296", fontWeight: 700, margin: "4px 0 0" }}>Lumânare</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 20px" }}>
        <Link href="/copil/magazin" style={{ textDecoration: "none" }}>
          <div style={{
            background: "linear-gradient(145deg, #FF7A5C, #E85636)",
            borderRadius: 20, padding: "16px 20px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 5px 0 #C43010, 0 12px 20px -8px rgba(255,122,92,.5)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 18, fontWeight: 700, color: "white" }}>Mergi la Magazin</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
