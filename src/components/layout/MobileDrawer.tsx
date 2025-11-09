'use client';

import React from 'react';
import { X } from 'lucide-react';
import Sidebar, { SidebarOption } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  active: SidebarOption;
  onSelect: (option: SidebarOption) => void;
  onLogout: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  active,
  onSelect,
  onLogout,
}: MobileDrawerProps) {
  const handleSelect = (option: SidebarOption) => {
    onSelect(option);
    onClose(); // Close drawer after selection
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-secondary-blue rounded-r-3xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex items-center justify-between px-7 h-16 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="bg-primary-orange rounded-xl p-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-text-primary tracking-tight">JobDM</div>
                <div className="text-xs text-text-secondary -mt-0.5">Referrals, Made Simple</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-primary-orange transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar
              active={active}
              onSelect={handleSelect}
              onLogout={onLogout}
              hideLogo={true}
              variant="mobile"
            />
          </div>
        </div>
      </div>
    </>
  );
}

