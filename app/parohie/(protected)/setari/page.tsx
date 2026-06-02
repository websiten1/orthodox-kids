import { getParishSession } from "@/lib/auth";

export default async function SetariPage() {
  const session = await getParishSession();
  if (!session) return null;
  const INFO = [
    { label: "Parohie", value: session.name },
    { label: "Email", value: session.email },
    { label: "Plan", value: "Gratuit (Demo)" },
  ];
  return (
    <div style={{ padding: "24px 20px 40px", maxWidth: 480 }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B58A3C", margin: "0 0 4px" }}>PAROHIE</p>
        <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 30, fontWeight: 700, color: "#403A4A", margin: 0 }}>Setări</h1>
      </div>
      <div style={{ background: "white", borderRadius: 20, border: "1px solid #ECE3D2", overflow: "hidden", boxShadow: "0 2px 12px -4px rgba(164,50,52,.08)", marginBottom: 16 }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #ECE3D2" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#403A4A", margin: 0 }}>Informații parohie</p>
        </div>
        {INFO.map(({ label, value }, i) => (
          <div key={label} style={{ padding: "13px 20px", borderBottom: i < INFO.length - 1 ? "1px solid #F6EEDD" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#8A8296", fontWeight: 700 }}>{label}</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#403A4A", fontWeight: 800 }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#EBF3EF", borderRadius: 20, padding: "18px 20px", border: "1px solid #C8DDD4" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "#2E5A47", margin: "0 0 10px" }}>Plan gratuit activ</p>
        {["Până la 3 grupe", "Toate cele 12 teme pre-create", "Mini-jocuri de echipă", "Dashboard și rapoarte"].map(f => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2E5A47", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#2E5A47", fontWeight: 700 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
