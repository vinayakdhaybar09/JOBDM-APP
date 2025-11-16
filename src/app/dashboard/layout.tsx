"use client";
import React, { useState, useEffect } from "react";
import Sidebar, { SidebarOption } from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/lib/hooks/useAuth";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import { isAuthenticated } from "@/lib/utils/auth";

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
  const { mutate: logout } = useLogout();
  
  // Check authentication status
  const { isAuthenticated: isUserAuthenticated, isLoading: isAuthLoading } = useAuthCheck();
  const hasToken = isAuthenticated();

  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!isAuthLoading) {
      // If no token in localStorage, redirect immediately
      if (!hasToken) {
        router.push('/login');
        return;
      }
      
      // If token exists but API call failed (invalid token), redirect
      if (hasToken && !isUserAuthenticated) {
        router.push('/login');
        return;
      }
    }
  }, [hasToken, isUserAuthenticated, isAuthLoading, router]);

  const active = getActiveFromPath(pathname);

  const handleSelect = (section: SidebarOption) => {
    // Use router navigation so Next updates pathname and the `active` derived from it
    // Ensure user is authenticated before navigating
    if (!hasToken || !isUserAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (section === "dashboard") router.push("/dashboard");
    if (section === "profile") router.push("/dashboard/profile");
    if (section === "campaigns") router.push("/dashboard/campaigns");
    if (section === "pricing") router.push("/dashboard/pricing");
    if (section === "settings") router.push("/dashboard/settings");
  };

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = () => {
    // On mobile, open drawer; on desktop, toggle sidebar
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsDrawerOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Show loading state while checking authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (redirect will happen)
  if (!hasToken || !isUserAuthenticated) {
    return null;
  }

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
