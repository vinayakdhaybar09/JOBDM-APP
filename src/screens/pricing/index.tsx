import React from 'react';
import CurrentBalance from './components/CurrentBalance';
import FreeTrial from './components/FreeTrial';
import PricingCard from './components/PricingCard';
import Features from './components/Features';
import FAQ from './components/FAQ';

const PricingScreen = () => {
  const pricingPlans = [
    {
      title: 'Starter Pack',
      price: 50,
      credits: 50,
      features: [
        { text: '50 Email Credits' },
        { text: 'Basic Templates' },
        { text: 'Email Tracking' },
        { text: '24/7 Support' },
      ],
    },
    {
      title: 'Professional',
      price: 100,
      credits: 120,
      bonusCredits: 20,
      features: [
        { text: '120 Email Credits' },
        { text: '20 Bonus Credits' },
        { text: 'Advanced Templates' },
        { text: 'Follow-up Automation' },
        { text: 'Email Tracking & Analytics' },
        { text: 'Priority Support' },
      ],
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: 150,
      credits: 180,
      bonusCredits: 30,
      features: [
        { text: '180 Email Credits' },
        { text: '30 Bonus Credits' },
        { text: 'Premium Templates' },
        { text: 'Advanced Automation' },
        { text: 'Detailed Analytics' },
        { text: 'Custom Integrations' },
        { text: 'Dedicated Support' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc,#eff6ff,#f8fafc)] opacity-50" />
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Email Credits
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Power your job search with affordable email credits. Each credit sends one personalized email.
            </p>
            <CurrentBalance />
            <FreeTrial />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-50 rounded-3xl -mx-8 -my-8" />
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          <Features />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default PricingScreen;
