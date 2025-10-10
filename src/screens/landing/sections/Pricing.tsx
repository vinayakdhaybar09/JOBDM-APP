import React from 'react';
import Link from 'next/link';

const Pricing = () => {
  const plans = [
    {
      name: "Flexible",
      description: "Pay per active user/month",
      price: "₹99",
      period: "per user/month",
      features: [
        "Unlimited referral requests",
        "Access to verified database",
        "Email templates",
        "Basic analytics",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Fixed",
      description: "Flat monthly fee",
      price: "₹9,000",
      period: "per month",
      features: [
        "Everything in Flexible",
        "Advanced analytics",
        "Priority support",
        "Custom email templates",
        "API access",
        "Dedicated account manager"
      ],
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Choose the plan that works best for your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 ${
                plan.popular ? 'ring-2 ring-primary-orange' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-text-secondary mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-orange">{plan.price}</span>
                  <span className="text-text-secondary ml-2">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-success-green mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link 
                href="/register"
                className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200 ${
                  plan.popular 
                    ? 'bg-primary-orange text-white hover:bg-primary-orange/90' 
                    : 'bg-secondary-blue text-primary-orange hover:bg-primary-orange hover:text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <Link 
            href="/register"
            className="text-primary-orange font-semibold hover:underline"
          >
            Start your free trial today →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
