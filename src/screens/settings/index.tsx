'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Copy, Check, LogOut, CreditCard, Users, Coins, Link2 } from 'lucide-react';

// Mock data - replace with actual data from your store/API
const mockPaymentHistory = [
  { id: 1, date: '2024-01-15', price: '$29.99', package: 'Starter Pack', coins: 100 },
  { id: 2, date: '2024-02-10', price: '$49.99', package: 'Professional Pack', coins: 250 },
  { id: 3, date: '2024-03-05', price: '$19.99', package: 'Basic Pack', coins: 50 },
];

const mockReferralStats = {
  totalReferrals: 12,
  coinsEarned: 240,
  referralLink: 'https://jobdm.com/ref/VINAYAK123',
};

export default function SettingsScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(mockReferralStats.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-roboto)' }}>
        Settings
      </h1>

      {/* Payment History Section */}
      <section className="bg-card rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-primary-orange" />
          <h2 className="text-2xl font-bold text-text-primary">Payment History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Package</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Coins</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Price</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-secondary-blue/30 transition-colors">
                  <td className="py-3 px-4 text-sm text-text-primary">{payment.date}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{payment.package}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">
                    <span className="bg-success-green/20 text-success-green px-2 py-1 rounded-md font-semibold">
                      {payment.coins} coins
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-text-primary">{payment.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Referral Section */}
      <section className="bg-card rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary-orange" />
          <h2 className="text-2xl font-bold text-text-primary">Referral Program</h2>
        </div>

        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-secondary mb-2">
            Your Referral Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-secondary-blue rounded-lg px-4 py-3 border border-border">
              <Link2 className="w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={mockReferralStats.referralLink}
                readOnly
                className="flex-1 bg-transparent text-text-primary outline-none text-sm"
              />
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 bg-primary-orange text-white rounded-lg hover:bg-primary-orange/90 transition-colors flex items-center gap-2 font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary-blue rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary-orange" />
              <span className="text-sm text-text-secondary">Total Referrals</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{mockReferralStats.totalReferrals}</p>
          </div>

          <div className="bg-secondary-blue rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-success-green" />
              <span className="text-sm text-text-secondary">Coins Earned</span>
            </div>
            <p className="text-2xl font-bold text-success-green">{mockReferralStats.coinsEarned}</p>
          </div>

          <div className="bg-secondary-blue rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-primary-orange" />
              <span className="text-sm text-text-secondary">Reward Rate</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">20 coins/referral</p>
          </div>
        </div>
      </section>

      {/* Account Actions Section */}
      <section className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Account Actions</h2>
        
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

