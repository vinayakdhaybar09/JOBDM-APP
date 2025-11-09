'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User, Menu } from 'lucide-react';

interface DashboardNavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function DashboardNavbar({ onMenuClick, isSidebarOpen }: DashboardNavbarProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 md:right-0 h-16 bg-card border-b border-border z-30 transition-all duration-300 ${
      isSidebarOpen ? 'md:left-72' : 'md:left-0'
    }`}>
      <div className="h-full px-4 flex items-center justify-between w-full">
        {/* Menu button - shown on both mobile and desktop */}
        <button
          onClick={onMenuClick}
          className="p-2 text-text-secondary hover:text-primary-orange transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo - centered on mobile only */}
        <div className="md:hidden flex-1 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-orange rounded-lg p-1.5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-text-primary">JobDM</span>
          </div>
        </div>

        {/* Spacer for desktop to push user icon to right */}
        <div className="hidden md:block flex-1" />

        {/* User icon */}
        <button
          onClick={handleProfileClick}
          className="p-2 text-text-secondary hover:text-primary-orange transition-colors"
          aria-label="Go to profile"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

