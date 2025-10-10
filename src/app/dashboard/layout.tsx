"use client";
import React, { useState } from "react";
import Sidebar, { SidebarOption } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [section, setSection] = useState<SidebarOption>("dashboard");
  // Navigation between tabs will be handled by the sidebar, but children are rendered by next routing
  // So page components should be rendered by route (e.g., /dashboard, /dashboard/profile, etc.), not by setSection.

  return (
    <div className="min-h-screen bg-background md:pl-72 flex">
      <Sidebar
        active={section}
        onSelect={(section) => {
          setSection(section);
          // Navigate via next/router
          if (section === "dashboard") window.location.href = "/dashboard";
          if (section === "profile") window.location.href = "/dashboard/profile";
          if (section === "campaigns") window.location.href = "/dashboard/campaigns";
          if (section === "pricing") window.location.href = "/dashboard/pricing";
        }}
        onLogout={() => {
          // Trigger logout via next-auth
          // Should be implemented in the Sidebar onLogout button
        }}
      />
      <main className="w-full max-w-5xl mx-auto py-10 px-4 flex flex-col gap-8" style={{ fontFamily: 'var(--font-roboto)' }}>
        {children}
      </main>
    </div>
  );
}
