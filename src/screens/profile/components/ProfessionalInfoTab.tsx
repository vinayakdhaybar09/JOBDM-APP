'use client';

import React from 'react';
import { useProfile } from '@/lib/hooks/useProfile';

export default function ProfessionalInfoTab() {
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

  // Transform backend data to frontend structure
  // Using direct fields from user model
  const linkedIn = user.linkedInUrl || '';
  const resumeLink = user.resumeUrl || '';
  // Using type assertion as portfolioUrl might not be in the User type yet
  const portfolio = (user as any).portfolioUrl || '';
  const currentCompany = user.workExperience?.[0]?.companyName || '';
  const companyEmail = user.workExperience?.[0]?.yourCompanyEmail || '';

  function isValidUrl(str: string) {
    if (!str) return false;
    try { 
      // Check if the URL has a valid protocol and domain
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch { 
      return false; 
    }
  }

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Current Company
          </label>
          <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base text-text-primary">
            {currentCompany || 'Not provided'}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Company Email
          </label>
          <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base text-text-primary">
            {companyEmail || 'Not provided'}
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">LinkedIn Profile URL</label>
        <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base">
          {linkedIn && isValidUrl(linkedIn) ? (
            <a 
              href={linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-orange hover:underline"
            >
              {linkedIn}
            </a>
          ) : (
            <span className="text-text-secondary">Not provided</span>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          Portfolio Website
        </label>
        <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base">
          {portfolio ? (
            <div className="flex items-center">
              <a
                href={portfolio.startsWith('http') ? portfolio : `https://${portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-orange hover:underline break-all"
              >
                {portfolio}
              </a>
            </div>
          ) : (
            <span className="text-text-secondary">Not provided</span>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">Resume Link (Google Drive/Dropbox)</label>
        <div className="mt-1 w-full rounded-lg border border-border py-2.5 px-4 bg-gray-50 text-base">
          {resumeLink && isValidUrl(resumeLink) ? (
            <a 
              href={resumeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-orange hover:underline"
            >
              {resumeLink}
            </a>
          ) : (
            <span className="text-text-secondary">Not provided</span>
          )}
        </div>
        <p className="text-xs mt-2 text-text-secondary">Share a public link to your resume for email attachments</p>
      </div>
    </div>
  );
}
