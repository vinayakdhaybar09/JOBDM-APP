import React from "react";
// Add Lucide icons if available
import { Briefcase, User, DollarSign, LogOut, LayoutDashboard, Settings } from "lucide-react";

export type SidebarOption = "dashboard" | "campaigns" | "profile" | "pricing" | "settings";

interface SidebarProps {
  active: SidebarOption;
  onSelect: (option: SidebarOption) => void;
  onLogout: () => void;
  hideLogo?: boolean;
  variant?: 'desktop' | 'mobile';
  isOpen?: boolean;
}

const NAV_ITEMS = [
  { label: "Dashboard", key: "dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
  { label: "Campaigns", key: "campaigns", icon: <Briefcase className="w-5 h-5 mr-3" /> },
  { label: "Profile", key: "profile", icon: <User className="w-5 h-5 mr-3" /> },
  { label: "Pricing", key: "pricing", icon: <DollarSign className="w-5 h-5 mr-3" /> },
  { label: "Settings", key: "settings", icon: <Settings className="w-5 h-5 mr-3" /> },
];

export default function Sidebar({ active, onSelect, onLogout, hideLogo = false, variant = 'desktop', isOpen = true }: SidebarProps & { isOpen?: boolean }) {
  // You can move user/account data props in the future
  const userName = "Vinayak D";
  const userEmail = "vinayakdhaybar09@gmail.com";
  const coins = 20;
  const plan = "Free";
  
  const isDesktop = variant === 'desktop';
  const asideClasses = isDesktop 
    ? `hidden md:flex flex-col fixed top-0 h-full w-72 bg-secondary-blue rounded-l-3xl shadow-lg z-20 border-r border-border select-none transition-transform duration-300 ${
        isOpen ? 'left-0' : '-left-72'
      }`
    : "flex flex-col h-full w-full select-none";
  
  return (
    <aside className={asideClasses}>
      {/* Logo row */}
      {!hideLogo && (
        <div className="flex items-center gap-4 px-7 h-24 border-b border-border">
          <div className="bg-primary-orange rounded-xl p-3 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary tracking-tight">JobDM</div>
            <div className="text-xs text-text-secondary mt-0.5">Referrals, Made Simple</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 flex flex-col px-2 pt-8">
        <span className="px-7 text-[12px] font-semibold tracking-wider text-text-tertiary mb-2 uppercase">Navigation</span>
        <nav className="flex flex-col gap-1 px-3">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`flex items-center text-base font-medium px-4 py-2.5 rounded-xl transition-colors mb-1 whitespace-nowrap gap-1
                ${active === item.key ? "bg-white text-primary-orange shadow-sm" : "text-text-primary hover:bg-primary-orange/10 hover:text-primary-orange"}`}
              style={{ fontFamily: 'var(--font-roboto)' }}
              onClick={() => onSelect(item.key as SidebarOption)}
            >
              {item.icon}{item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Account info */}
      <div className="border-t border-border mt-4 py-5 px-7">
        <span className="block text-[12px] font-semibold tracking-wider text-text-tertiary mb-2 uppercase">Account</span>
        <div className="flex items-center justify-between mb-1">
          <span className="text-text-secondary text-sm">Email Credits</span>
          <span className="bg-success-green/20 text-success-green text-xs font-bold px-2 py-0.5 rounded-md">{coins} coins</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Plan</span>
          <span className="bg-primary-orange/10 text-primary-orange text-xs font-semibold px-2 py-0.5 rounded-md">{plan}</span>
        </div>
      </div>

      {/* User info + logout at bottom */}
      <div className="flex flex-col px-7 pb-7 gap-3 mt-auto">
        <div className="flex items-center gap-3 mt-2">
          <div className="bg-white text-primary-orange font-bold w-9 h-9 flex items-center justify-center rounded-full border-2 border-card text-lg uppercase">
            {userName[0]}
          </div>
          <div>
            <div className="text-base font-medium text-text-primary leading-5">{userName}</div>
            <div className="text-xs text-text-tertiary -mt-0.5">{userEmail}</div>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center text-text-tertiary text-base gap-2 pl-1 mt-1 hover:text-primary-orange transition-colors font-medium">
          <LogOut className="w-5 h-5 shrink-0" /> Logout
        </button>
      </div>
    </aside>
  );
}
