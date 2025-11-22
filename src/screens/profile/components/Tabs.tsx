'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoTab from './PersonalInfoTab';
import TechnicalInfoTab from './TechnicalInfoTab';
import ProfessionalInfoTab from './ProfessionalInfoTab';

const tabList = [
  { id: 'personal', label: 'Personal' },
  { id: 'technical', label: 'Technical' },
  { id: 'professional', label: 'Professional' },
];

export default function Tabs() {
  const [active, setActive] = useState('personal');
  const router = useRouter();
  
  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push('/dashboard/profile/update-profile')}
          className="bg-primary-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-orange/90 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </button>
      </div>
      <div className="flex border-b border-border mb-8">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`py-3 px-6 text-base font-medium focus:outline-none transition text-text-primary rounded-t-lg
              ${active === tab.id ? 'bg-secondary-blue border-x border-t border-border border-b-0 text-primary-orange' : 'bg-transparent text-text-secondary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {active === 'personal' && <PersonalInfoTab />}
        {active === 'technical' && <TechnicalInfoTab />}
        {active === 'professional' && <ProfessionalInfoTab />}
      </div>
    </div>
  );
}
