'use client';

import React from 'react';
import { useProfile } from '@/lib/hooks/useProfile';

export default function PersonalInfoTab() {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-center py-8 text-red-600">
        Failed to load profile data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
          <div className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-50 text-base text-text-primary">
            {user.fullName || 'Not provided'}
          </div>
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
          <div className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-50 text-base text-text-primary">
            {user.email}
          </div>
        </div>
        
        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Contact Number</label>
          <div className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-50 text-base text-text-primary">
            {user.contactNo || 'Not provided'}
          </div>
        </div>
        
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Gender</label>
          <div className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-50 text-base text-text-primary capitalize">
            {user.gender || 'Not provided'}
          </div>
        </div>
      </div>
      
      {/* SMTP Credentials Card */}
      <div className="rounded-md border border-border p-6 bg-white mt-2">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Email Setup (SMTP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMTP Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">SMTP Email</label>
            <div className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-50 text-base text-text-primary">
              {user.smtpCredentials?.email || 'Not configured'}
            </div>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-4">Use Gmail App Password or Outlook App Password for sending campaigns</p>
      </div>
    </div>
  );
}
