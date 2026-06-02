"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/copil/harta",
    label: "Acasă",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#A43234" : "none"} stroke={active ? "#A43234" : "#8A8296"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: "/copil/echipa",
    label: "Eroi",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A43234" : "#8A8296"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    href: "/copil/joc-echipa/turn",
    label: "Joc",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A43234" : "#8A8296"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    special: true,
  },
  {
    href: "/copil/sfinti",
    label: "Calendar",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A43234" : "#8A8296"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    href: "/copil/profil",
    label: "Eu",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A43234" : "#8A8296"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function ChildNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
      style={{
        background: "#3D2B1F",
        borderTop: "1px solid rgba(255,255,255,.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div style={{ display: "flex", padding: "8px 0 12px" }}>
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href) ||
            (item.href === "/copil/harta" && pathname === "/copil/harta");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none" }}
            >
              {item.special ? (
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: active ? "#A43234" : "rgba(255,255,255,.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: active ? "0 4px 12px rgba(164,50,52,.5)" : "none",
                  transition: "all .15s",
                  marginTop: -8,
                }}>
                  {item.icon(active)}
                </div>
              ) : (
                item.icon(active)
              )}
              <span style={{
                fontFamily: "'Nunito', system-ui",
                fontSize: 10,
                fontWeight: active ? 800 : 600,
                color: active ? "#FF7A5C" : "rgba(255,255,255,.45)",
                letterSpacing: "0.02em",
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
