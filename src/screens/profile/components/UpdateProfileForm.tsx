'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useProfile, useUpdateProfile } from '@/lib/hooks/useProfile';
import { skills as skillOptions } from '@/data/skills';
import { RadixSelect } from '@/components/ui/RadixSelect';
import { RadixMultiSelect } from '@/components/ui/RadixMultiSelect';
import { UpdateProfileRequest } from '@/lib/api/types';

export default function UpdateProfileForm() {
  const { data: user, isLoading: isLoadingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Personal Info
      fullName: '',
      email: '',
      contactNo: '',
      gender: '',
      smtpEmail: '',
      smtpAppPassword: '',
      // Technical Info
      roleLookingFor: '',
      skills: [] as string[],
      totalExperience: '',
      // Professional Info
      currentCompany: '',
      companyEmail: '',
      linkedIn: '',
      portfolio: '',
      resumeLink: '',
    },
  });

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      // Transform backend data to frontend format
      const roleLookingFor = user.preferences?.jobRoles?.[0] || user.technicalInfo?.roleLookingFor || '';
      const skills = user.preferences?.skills || user.technicalInfo?.skills || [];
      const totalExperience = user.preferences?.experience ?? user.technicalInfo?.totalExperience;
      const linkedIn = user.linkedInUrl || user.professionalInfo?.linkedIn || '';
      const resumeLink = user.resumeUrl || user.professionalInfo?.resumeLink || '';
      const currentCompany = user.workExperience?.[0]?.companyName || user.professionalInfo?.currentCompany || '';
      const companyEmail = user.workExperience?.[0]?.yourCompanyEmail || user.professionalInfo?.companyEmail || '';

      reset({
        fullName: user.fullName || '',
        email: user.email,
        contactNo: user.contactNo || '',
        gender: user.gender || '',
        smtpEmail: user.smtpCredentials?.email || '',
        smtpAppPassword: '',
        roleLookingFor,
        skills,
        totalExperience: totalExperience?.toString() || '',
        currentCompany,
        companyEmail,
        linkedIn,
        portfolio: user.professionalInfo?.portfolio || '',
        resumeLink,
      });

      setRoleValue(roleLookingFor);
      setExpValue(totalExperience?.toString() || '');
      setSkillsValue(skills);
    }
  }, [user, reset]);

  // Controlled values for selects
  const [roleValue, setRoleValue] = useState('');
  const [expValue, setExpValue] = useState('');
  const [skillsValue, setSkillsValue] = useState<string[]>([]);

  // Sync form values
  useEffect(() => {
    setValue('roleLookingFor', roleValue);
  }, [roleValue, setValue]);

  useEffect(() => {
    setValue('totalExperience', expValue);
  }, [expValue, setValue]);

  useEffect(() => {
    setValue('skills', skillsValue);
  }, [skillsValue, setValue]);

  // Role options
  const roleOptions = [
    { value: '', label: 'Select role' },
    { value: 'Frontend Engineer', label: 'Frontend Engineer' },
    { value: 'Backend Engineer', label: 'Backend Engineer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Product Manager', label: 'Product Manager' },
  ];

  // Experience options (0-40)
  const expOptions = [{ value: '', label: 'Select experience' }].concat(
    Array.from({ length: 41 }, (_, i) => ({ value: i.toString(), label: `${i} years` }))
  );

  // Skills as multi-select options
  const skillOptionList = skillOptions.map((sk) => ({ value: sk, label: sk }));

  function isValidUrl(str: string) {
    if (!str) return true; // Optional field
    try {
      const u = new URL(str);
      return !!u;
    } catch {
      return false;
    }
  }

  function isValidLinkedIn(url: string) {
    if (!url) return true; // Optional field
    return /^https:\/\/([\w]+\.)?linkedin\.com\//.test(url.trim());
  }

  const onSubmit = async (data: any) => {
    if (!user) return;

    // Map frontend fields to backend structure
    const updateData: UpdateProfileRequest = {
      fullName: data.fullName,
      contactNo: data.contactNo || undefined,
      gender: data.gender || undefined,
      // Map frontend fields to backend
      linkedInUrl: data.linkedIn || undefined,
      resumeUrl: data.resumeLink || undefined,
      preferences: {
        // Map roleLookingFor (string) to jobRoles (array)
        jobRoles: data.roleLookingFor ? [data.roleLookingFor] : undefined,
        skills: data.skills && data.skills.length > 0 ? data.skills : undefined,
        experience: data.totalExperience ? Number(data.totalExperience) : undefined,
      },
      // Map company info to workExperience
      // Only include if we have at least companyName
      workExperience: data.currentCompany
        ? [
            {
              companyName: data.currentCompany,
              yourCompanyEmail: data.companyEmail || '',
              hrEmail: '', // Required field, set to empty string if not provided
            },
          ]
        : undefined,
    };

    // Call API to update profile
    updateProfileMutation.mutate(updateData);
  };

  // Show loading state while fetching profile
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
    <form className="space-y-8" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {updateProfileMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          Failed to update profile. Please try again.
        </div>
      )}

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Full Name <span className="text-primary-orange">*</span>
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base ${
                errors.fullName ? 'border-red-400' : ''
              }`}
              {...register('fullName', { required: 'Full name is required.' })}
            />
            {errors.fullName && (
              <p className="text-red-600 text-xs mt-1">{errors.fullName.message as string}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Email (non-editable)
            </label>
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
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Contact Number
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
              {...register('contactNo')}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Gender</label>
            <select
              className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base bg-white"
              {...register('gender')}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* SMTP Credentials Card */}
        <div className="rounded-md border border-border p-6 bg-white mt-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Email Setup (SMTP)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMTP Email */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                SMTP Email
              </label>
              <input
                type="email"
                className={`mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base ${
                  errors.smtpEmail ? 'border-red-400' : ''
                }`}
                {...register('smtpEmail', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address.',
                  },
                })}
              />
              {errors.smtpEmail && (
                <p className="text-red-600 text-xs mt-1">{errors.smtpEmail.message as string}</p>
              )}
            </div>

            {/* SMTP App Password */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                App Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
                {...register('smtpAppPassword')}
                placeholder="Leave blank to keep existing"
              />
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-4">
            Use Gmail App Password or Outlook App Password for sending campaigns
          </p>
        </div>
      </div>

      {/* Technical Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2">
          Technical Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role Looking For */}
          <RadixSelect
            label="Job Role Looking For"
            value={roleValue}
            onValueChange={setRoleValue}
            options={roleOptions}
            placeholder="Select role"
            error={errors.roleLookingFor?.message as string}
            className="w-full"
          />

          {/* Experience */}
          <RadixSelect
            label="Total Experience (Years)"
            value={expValue}
            onValueChange={setExpValue}
            options={expOptions}
            placeholder="Select experience"
            className="w-full"
          />
        </div>

        {/* Skills Multi-Select */}
        <RadixMultiSelect
          label="Technical Skills"
          options={skillOptionList}
          values={skillsValue}
          onValuesChange={setSkillsValue}
          placeholder="Add a skill (e.g., React, Python)"
          className="w-full md:w-1/2"
        />

        {/* Chips for selected skills */}
        {skillsValue.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skillsValue.map((skill: string) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full border border-primary-orange bg-primary-orange/10 text-primary-orange font-medium text-sm"
              >
                {skill}
                <button
                  type="button"
                  className="ml-2 text-primary-orange hover:text-red-600 focus:outline-none"
                  onClick={() => setSkillsValue(skillsValue.filter((s) => s !== skill))}
                  title="Remove"
                  aria-label={`Remove ${skill}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Professional Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2">
          Professional Information
        </h2>
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
          <label className="block text-sm font-semibold text-text-primary mb-1">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            className={`mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8 ${
              errors.linkedIn ? 'border-red-400' : ''
            }`}
            {...register('linkedIn', {
              validate: (value) =>
                !value || isValidLinkedIn(value) || 'Invalid LinkedIn URL format',
            })}
            placeholder="https://linkedin.com/in/yourprofile"
            autoComplete="url"
          />
          {watch('linkedIn') && isValidLinkedIn(watch('linkedIn')) && (
            <span className="absolute right-3 top-2.5">
              <svg
                className="w-5 h-5 text-green-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          {errors.linkedIn && (
            <p className="text-red-600 text-xs mt-1">{errors.linkedIn.message as string}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Portfolio Website <span className="font-normal text-text-tertiary">(Optional)</span>
          </label>
          <input
            type="url"
            className={`mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8 ${
              errors.portfolio ? 'border-red-400' : ''
            }`}
            {...register('portfolio', {
              validate: (value) => !value || isValidUrl(value) || 'Invalid URL format',
            })}
            placeholder="https://yourportfolio.com"
            autoComplete="url"
          />
          {watch('portfolio') && isValidUrl(watch('portfolio')) && (
            <span className="absolute right-3 top-2.5">
              <svg
                className="w-5 h-5 text-green-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          {errors.portfolio && (
            <p className="text-red-600 text-xs mt-1">{errors.portfolio.message as string}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-text-primary mb-1">
            Resume Link (Google Drive/Dropbox)
          </label>
          <input
            type="url"
            className={`mt-1 w-full autofill:!bg-white rounded-lg border border-border py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base placeholder:text-text-tertiary pr-8 ${
              errors.resumeLink ? 'border-red-400' : ''
            }`}
            {...register('resumeLink', {
              validate: (value) => !value || isValidUrl(value) || 'Invalid URL format',
            })}
            placeholder="https://drive.google.com/file/d/..."
            autoComplete="url"
          />
          {watch('resumeLink') && isValidUrl(watch('resumeLink')) && (
            <span className="absolute right-3 top-2.5">
              <svg
                className="w-5 h-5 text-green-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          {errors.resumeLink && (
            <p className="text-red-600 text-xs mt-1">{errors.resumeLink.message as string}</p>
          )}
          <p className="text-xs mt-2 text-primary-orange/90">
            Share a public link to your resume for email attachments
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <button
          type="button"
          onClick={() => router.push('/dashboard/profile')}
          className="px-6 py-2 rounded-lg font-semibold border border-border text-text-secondary hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="bg-primary-orange text-white px-6 py-2 rounded-lg font-bold shadow transition min-w-[130px] flex items-center justify-center hover:bg-primary-orange/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
}

