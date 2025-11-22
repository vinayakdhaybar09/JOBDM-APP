'use client';

import React from 'react';
import { useProfile } from '@/lib/hooks/useProfile';

export default function TechnicalInfoTab() {
  const { data: user, isLoading: isLoadingProfile } = useProfile();

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 text-text-secondary">
        Failed to load profile data
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Looking For */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Job Role Looking For
          </label>
          <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base text-text-primary">
            {user.preferences?.jobRoles?.[0] || 'Not provided'}
          </div>
        </div>
        
        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Total Experience
          </label>
          <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base text-text-primary">
            {user.preferences?.experience ? `${user.preferences.experience} years` : 'Not provided'}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          Skills
        </label>
        <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base">
          {user.preferences?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {user.preferences?.skills?.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-gray-200 text-text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-text-secondary">No skills added</span>
          )}
        </div>
      </div>
    </div>
  );
}
