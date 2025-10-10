'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCurrentUser, updateCurrentUser } from '@/lib/inMemoryStore';
import { skills as skillOptions } from '@/data/skills';
import { RadixSelect } from '@/components/ui/RadixSelect';
import { RadixMultiSelect } from '@/components/ui/RadixMultiSelect';

export default function TechnicalInfoTab() {
  const user = getCurrentUser();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleLookingFor: user.technicalInfo?.roleLookingFor || '',
      skills: user.technicalInfo?.skills || [],
      totalExperience: user.technicalInfo?.totalExperience || '',
    },
  });

  // Patch update helper
  function handleAutoSave(field: string, value: string | string[] | number) {
    updateCurrentUser({
      technicalInfo: {
        ...user.technicalInfo,
        [field]: value,
      },
    });
  }

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

  // Controlled values
  const [roleValue, setRoleValue] = useState(user.technicalInfo?.roleLookingFor || '');
  const [expValue, setExpValue] = useState(
    user.technicalInfo?.totalExperience?.toString() || ''
  );
  const [skillsValue, setSkillsValue] = useState<string[]>(user.technicalInfo?.skills || []);

  // Sync form and autosave for selects
  React.useEffect(() => {
    setValue('roleLookingFor', roleValue);
    handleAutoSave('roleLookingFor', roleValue);
  }, [roleValue]);
  
  React.useEffect(() => {
    setValue('totalExperience', expValue);
    handleAutoSave('totalExperience', expValue ? Number(expValue) : '');
  }, [expValue]);
  
  React.useEffect(() => {
    setValue('skills', skillsValue);
    handleAutoSave('skills', skillsValue);
  }, [skillsValue]);

  return (
    <form className="space-y-6" autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Looking For */}
        <RadixSelect
          label="Job Role Looking For *"
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </form>
  );
}
