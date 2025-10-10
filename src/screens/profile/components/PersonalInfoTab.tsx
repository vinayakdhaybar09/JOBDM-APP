'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCurrentUser, updateCurrentUser } from '@/lib/inMemoryStore';
import { smtpTestStub } from '@/lib/smtpTestStub';

export default function PersonalInfoTab() {
  const user = getCurrentUser();
  const { register, handleSubmit, setValue, formState: { errors, isDirty }, getValues } = useForm({
    defaultValues: {
      fullName: user.fullName || '',
      email: user.email,
      contactNo: user.contactNo || '',
      gender: user.gender || '',
      smtpEmail: user.smtpCredentials?.email || '',
      smtpAppPassword: '',
    },
  });
  
  // SMTP Test State
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [smtpResult, setSmtpResult] = useState<string | null>(null);

  // Autosave each field on change
  function handleAutoSave(field: string, value: string) {
    // Patch correct nested fields
    if (field === 'fullName' || field === 'contactNo' || field === 'gender') {
      updateCurrentUser({ [field]: value });
    } else if (field === 'smtpEmail') {
      updateCurrentUser({ smtpCredentials: { ...user.smtpCredentials, email: value }});
    }
    // email cannot be changed
  }

  return (
    <form className="space-y-6" autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Full Name <span className="text-primary-orange">*</span></label>
          <input
            type="text"
            className={`mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base ${errors.fullName ? 'border-red-400' : ''}`}
            {...register('fullName', { required: 'Full name is required.' })}
            onBlur={e => handleAutoSave('fullName', e.target.value)}
          />
          {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message as string}</p>}
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email (non-editable)</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-border py-2 px-3 bg-gray-100 text-base cursor-not-allowed"
            {...register('email')}
            readOnly
            tabIndex={-1}
          />
        </div>
        
        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Contact Number</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
            {...register('contactNo')}
            onBlur={e => handleAutoSave('contactNo', e.target.value)}
          />
        </div>
        
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Gender</label>
          <select
            className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base bg-white"
            {...register('gender')}
            onBlur={e => handleAutoSave('gender', e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      {/* SMTP Credentials Card */}
      <div className="rounded-md border border-border p-6 bg-white mt-2">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Email Setup (SMTP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMTP Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">SMTP Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
              {...register('smtpEmail', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address.' } })}
              onBlur={e => handleAutoSave('smtpEmail', e.target.value)}
            />
            {errors.smtpEmail && <p className="text-red-600 text-xs mt-1">{errors.smtpEmail.message as string}</p>}
          </div>
          
          {/* SMTP App Password */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">App Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
              {...register('smtpAppPassword')}
            />
          </div>
        </div>
        
        {/* Test SMTP Button */}
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            className="bg-primary-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors"
            disabled={smtpLoading}
            onClick={async () => {
              setSmtpLoading(true);
              setSmtpResult(null);
              const values = getValues();
              const { success, message } = await smtpTestStub({
                email: values.smtpEmail as string,
                appPassword: values.smtpAppPassword as string,
              });
              setSmtpResult(message);
              setSmtpLoading(false);
            }}
          >
            {smtpLoading ? 'Testing...' : 'Test Connection'}
          </button>
          {smtpResult && <span className="text-sm text-text-secondary font-medium">{smtpResult}</span>}
        </div>
        <p className="text-xs text-text-secondary mt-2">Use Gmail App Password or Outlook App Password for sending campaigns</p>
      </div>
    </form>
  );
}
