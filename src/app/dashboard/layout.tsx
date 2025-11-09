"use client";
import React from "react";
import Sidebar, { SidebarOption } from "@/components/layout/Sidebar";
import { usePathname, useRouter } from "next/navigation";

function getActiveFromPath(pathname: string | null): SidebarOption {
  if (!pathname) return "dashboard";
  if (pathname.startsWith("/dashboard/campaigns")) return "campaigns";
  if (pathname.startsWith("/dashboard/profile")) return "profile";
  if (pathname.startsWith("/dashboard/pricing")) return "pricing";
  // default to dashboard for /dashboard or unknown subpaths
  if (pathname.startsWith("/dashboard")) return "dashboard";
  return "dashboard";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const active = getActiveFromPath(pathname);

  return (
    <div className="min-h-screen bg-background md:pl-72 flex">
      <Sidebar
        active={active}
        onSelect={(section) => {
          // Use router navigation so Next updates pathname and the `active` derived from it
          if (section === "dashboard") router.push("/dashboard");
          if (section === "profile") router.push("/dashboard/profile");
          if (section === "campaigns") router.push("/dashboard/campaigns");
          if (section === "pricing") router.push("/dashboard/pricing");
        }}
        onLogout={() => {
          // Trigger logout via next-auth; leave implementation to auth layer or parent
        }}
      />
      <main className="w-full max-w-5xl mx-auto py-10 px-4 flex flex-col gap-8" style={{ fontFamily: 'var(--font-roboto)' }}>
        {children}
      </main>
    </div>
  );
}
