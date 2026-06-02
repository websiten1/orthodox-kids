"use client";

import { T, GButton, Icon } from "@/components/child/ui";

export default function LogoutButton() {
  return (
    <GButton
      color="gold"
      full
      icon={<Icon name="lock" size={16} color="#fff" stroke={2} />}
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      Colțul părinților
    </GButton>
  );
}
