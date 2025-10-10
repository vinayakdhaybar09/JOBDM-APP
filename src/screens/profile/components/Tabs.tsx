'use client';

import React, { useState } from 'react';
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
  
  return (
    <div>
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
