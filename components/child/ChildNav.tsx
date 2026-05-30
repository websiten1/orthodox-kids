"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/copil/harta", label: "Hartă", icon: "🗺️" },
  { href: "/copil/echipa", label: "Echipă", icon: "🛡️" },
  { href: "/copil/profil", label: "Eu", icon: "👤" },
];

export default function ChildNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t-2 border-crem-inchis shadow-lg z-50">
      <div className="flex">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors font-sans
                ${active ? "text-albastru" : "text-maro opacity-50 hover:opacity-80"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-xs font-semibold ${active ? "text-albastru" : ""}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 h-1 w-12 bg-auriu rounded-t-full" style={{
                  bottom: 0,
                }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
