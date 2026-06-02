"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, T } from "./ui";

const TABS = [
  { key: "home",     href: "/copil/harta",           label: "Acasă",    icon: "home",      color: T.coral },
  { key: "heroes",   href: "/copil/sfinti",           label: "Eroi",     icon: "crown",     color: T.lilac },
  { key: "play",     href: "/copil/joc-echipa/turn",  label: "Joc",      icon: "shapes",    color: T.mint  },
  { key: "calendar", href: "/copil/calendar",         label: "Calendar", icon: "calendar",  color: T.sky   },
  { key: "me",       href: "/copil/profil",           label: "Eu",       icon: "user-round",color: T.sun   },
];

export default function ChildNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50"
      style={{
        borderTop: `2px solid ${T.line}`,
        background: "#fff",
        paddingBottom: "env(safe-area-inset-bottom, 12px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 8px 6px" }}>
        {TABS.map(({ key, href, label, icon, color }) => {
          const active =
            pathname === href ||
            (href !== "/copil/harta" && pathname.startsWith(href));

          return (
            <Link
              key={key}
              href={href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
              }}
            >
              {/* Pill */}
              <span style={{
                width: 44, height: 34, borderRadius: 13,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? color : "transparent",
                boxShadow: active ? `0 4px 10px -3px ${color}` : "none",
                transition: "all .15s",
              }}>
                <Icon name={icon} size={21} color={active ? "#fff" : T.ink3} stroke={active ? 2.2 : 1.8} />
              </span>
              <span style={{
                fontFamily: T.fT,
                fontSize: 10,
                fontWeight: active ? 800 : 600,
                color: active ? color : T.ink3,
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
