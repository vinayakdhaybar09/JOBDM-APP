"use client";
import React, { useState } from "react";
import Sidebar, { SidebarOption } from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { usePathname, useRouter } from "next/navigation";

function getActiveFromPath(pathname: string | null): SidebarOption {
  if (!pathname) return "dashboard";
  if (pathname.startsWith("/dashboard/campaigns")) return "campaigns";
  if (pathname.startsWith("/dashboard/profile")) return "profile";
  if (pathname.startsWith("/dashboard/pricing")) return "pricing";
  if (pathname.startsWith("/dashboard/settings")) return "settings";
  // default to dashboard for /dashboard or unknown subpaths
  if (pathname.startsWith("/dashboard")) return "dashboard";
  return "dashboard";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop

  const active = getActiveFromPath(pathname);

  const handleSelect = (section: SidebarOption) => {
    // Use router navigation so Next updates pathname and the `active` derived from it
    if (section === "dashboard") router.push("/dashboard");
    if (section === "profile") router.push("/dashboard/profile");
    if (section === "campaigns") router.push("/dashboard/campaigns");
    if (section === "pricing") router.push("/dashboard/pricing");
    if (section === "settings") router.push("/dashboard/settings");
  };

  const handleLogout = () => {
    // Trigger logout via next-auth; leave implementation to auth layer or parent
  };

  const handleMenuClick = () => {
    // On mobile, open drawer; on desktop, toggle sidebar
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsDrawerOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar
        active={active}
        onSelect={handleSelect}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
      />
      
      {/* Navbar */}
      <DashboardNavbar 
        onMenuClick={handleMenuClick}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        active={active}
        onSelect={handleSelect}
        onLogout={handleLogout}
      />
      
      {/* Main content */}
      <main 
        className={`w-full max-w-5xl mx-auto pt-20 pb-10 px-4 flex flex-col gap-8 md:pt-20 transition-all duration-300 ${
          isSidebarOpen ? 'md:pl-72' : 'md:pl-4'
        }`} 
        style={{ fontFamily: 'var(--font-roboto)' }}
      >
        {children}
      </main>
    </div>
  );
}
