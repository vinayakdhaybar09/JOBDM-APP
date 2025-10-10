'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCurrentUser, updateCurrentUser } from '@/lib/inMemoryStore';

export default function ProfessionalInfoTab() {
  const user = getCurrentUser();
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      currentCompany: user.professionalInfo?.currentCompany || '',
      companyEmail: user.professionalInfo?.companyEmail || '',
      linkedIn: user.professionalInfo?.linkedIn || '',
      portfolio: user.professionalInfo?.portfolio || '',
      resumeLink: user.professionalInfo?.resumeLink || '',
    },
  });

  function isValidUrl(str: string) {
    try { 
      const u = new URL(str); 
      return !!u; 
    } catch { 
      return false; 
    }
  }
  
  function isValidLinkedIn(url: string) {
    return /^https:\/\/([\w]+\.)?linkedin\.com\//.test(url.trim());
  }

  // Save handler
  const onSubmit = (values: Record<string, string>) => {
    updateCurrentUser({ professionalInfo: values as any });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    reset(values); // reset dirty
  };

  return (
    <form className="space-y-7" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Current Company <span className="font-normal text-text-tertiary">(Optional)</span>
          </label>
          <input
            type="text"
            className="mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary"
            {...register('currentCompany')}
            placeholder="e.g., Google, Microsoft"
            autoComplete="organization"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Company Email <span className="font-normal text-text-tertiary">(Optional)</span>
          </label>
          <input
            type="email"
            className="mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary"
            {...register('companyEmail')}
            placeholder="your.name@company.com"
            autoComplete="email"
          />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-sm font-semibold text-text-primary mb-1">LinkedIn Profile URL</label>
        <input
          type="url"
          className="mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8"
          {...register('linkedIn')}
          placeholder="https://linkedin.com/in/yourprofile"
          autoComplete="url"
        />
        {isValidLinkedIn(getValues('linkedIn')) && (
          <span className="absolute right-3 top-2.5">
            <svg className="w-5 h-5 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
      
      <div className="relative">
        <label className="block text-sm font-semibold text-text-primary mb-1">
          Portfolio Website <span className="font-normal text-text-tertiary">(Optional)</span>
        </label>
        <input
          type="url"
          className="mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8"
          {...register('portfolio')}
          placeholder="https://yourportfolio.com"
          autoComplete="url"
        />
        {isValidUrl(getValues('portfolio')) && (
          <span className="absolute right-3 top-2.5">
            <svg className="w-5 h-5 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
      
      <div className="relative">
        <label className="block text-sm font-semibold text-text-primary mb-1">Resume Link (Google Drive/Dropbox)</label>
        <input
          type="url"
          className="mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8"
          {...register('resumeLink')}
          placeholder="https://drive.google.com/file/d/..."
          autoComplete="url"
        />
        {isValidUrl(getValues('resumeLink')) && (
          <span className="absolute right-3 top-2.5">
            <svg className="w-5 h-5 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
        <p className="text-xs mt-2 text-primary-orange/90">Share a public link to your resume for email attachments</p>
      </div>
      
      <div className="flex justify-end mt-8">
        <button 
          type="submit" 
          className={`bg-primary-orange text-white px-6 py-2 rounded-lg font-bold shadow transition min-w-[130px] flex items-center justify-center ${
            !isDirty ? 'bg-opacity-60 pointer-events-none' : ''
          }`} 
          disabled={!isDirty}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
