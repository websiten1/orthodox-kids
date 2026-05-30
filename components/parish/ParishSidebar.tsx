"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/parohie/dashboard", label: "Prezentare generală", icon: "📊" },
  { href: "/parohie/grupe", label: "Grupe", icon: "👥" },
  { href: "/parohie/teme", label: "Teme & Activități", icon: "📚" },
  { href: "/parohie/calendar", label: "Calendar", icon: "📅" },
  { href: "/parohie/evanghelie", label: "Evanghelia zilei", icon: "✝️" },
  { href: "/parohie/notificari", label: "Notificări", icon: "🔔" },
  { href: "/parohie/setari", label: "Setări", icon: "⚙️" },
];

export default function ParishSidebar({ parishName }: { parishName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = () => (
    <div className="h-full bg-albastru text-white flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white border-opacity-10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✦</span>
          <div>
            <h1 className="font-bold text-base leading-tight">Calea Luminii</h1>
            <p className="text-xs opacity-70 font-sans truncate max-w-[140px]">
              {parishName}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-sans transition-all
                ${
                  active
                    ? "bg-white bg-opacity-15 text-white"
                    : "text-white opacity-70 hover:opacity-100 hover:bg-white hover:bg-opacity-10"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white border-opacity-10">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans opacity-70 hover:opacity-100 transition-all"
        >
          <span>🚪</span>
          Ieșire
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 z-40">
        <Sidebar />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-albastru text-white flex items-center px-4 justify-between z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl">✦</span>
          <span className="font-bold text-sm font-sans">Calea Luminii</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Spacer for mobile */}
      <div className="lg:hidden h-14" />
    </>
  );
}
