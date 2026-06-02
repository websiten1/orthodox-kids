"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/parohie/dashboard",  label: "Prezentare generală", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/parohie/grupe",       label: "Grupe",               icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/parohie/teme",        label: "Teme & Activități",   icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { href: "/parohie/calendar",    label: "Calendar",            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/parohie/evanghelie",  label: "Evanghelia zilei",    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { href: "/parohie/notificari",  label: "Notificări",          icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { href: "/parohie/setari",      label: "Setări",              icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function ParishSidebar({ parishName }: { parishName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div style={{ height: "100%", background: "#1C0A0A", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11, background: "#A43234",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 3px 0 #6B1A1C",
          }}>
            <svg width="18" height="18" viewBox="0 0 42 42" fill="none">
              <path d="M21 6L21 36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M10 17L32 17" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.1 }}>
              Calea Luminii
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
              {parishName}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/parohie/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: "10px 12px", borderRadius: 12,
                textDecoration: "none",
                background: active ? "#A43234" : "transparent",
                color: active ? "white" : "rgba(255,255,255,.45)",
                transition: "all .15s",
                fontFamily: "'Nunito', sans-serif",
                fontSize: 13, fontWeight: 700,
              }}
            >
              <span style={{ color: active ? "white" : "rgba(255,255,255,.4)", flexShrink: 0 }}>
                <NavIcon d={item.icon} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <button
          onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 11,
            padding: "10px 12px", borderRadius: 12,
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,.3)", fontFamily: "'Nunito', sans-serif",
            fontSize: 13, fontWeight: 700,
            transition: "color .15s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Ieșire
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block" style={{ position: "fixed", left: 0, top: 0, height: "100%", width: 220, zIndex: 40 }}>
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 56,
        background: "#1C0A0A", display: "flex", alignItems: "center",
        padding: "0 16px", justifyContent: "space-between", zIndex: 40,
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#A43234", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 42 42" fill="none">
              <path d="M21 6L21 36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M10 17L32 17" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700, color: "white" }}>Calea Luminii</span>
        </div>
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "white", fontSize: 18 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: 220 }}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="lg:hidden" style={{ height: 56 }} />
    </>
  );
}
