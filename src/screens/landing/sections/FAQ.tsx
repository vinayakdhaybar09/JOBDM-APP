'use client';

import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does JobDM work?",
      answer: "Users register, craft referral emails, filter professionals, and send requests automatically. Our platform handles the entire process from finding the right contacts to tracking responses."
    },
    {
      question: "Can I manage multiple campaigns?",
      answer: "Yes, the dashboard allows multiple campaigns, scheduling, and tracking. You can create different campaigns for different job roles or companies and manage them all from one place."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, user data is encrypted and stored securely with limited access. We follow industry best practices for data protection and privacy compliance."
    },
    {
      question: "What types of professionals are in your database?",
      answer: "Our database includes verified HR professionals, recruiters, and industry experts from top-tier companies across various sectors including tech, finance, healthcare, and more."
    },
    {
      question: "How much does it cost to send referral requests?",
      answer: "Our flexible plan charges ₹99 per user per month, while our fixed plan is ₹9,000 per month for unlimited users. Both plans include unlimited referral requests."
    },
    {
      question: "Can I customize my email templates?",
      answer: "Yes, you can create personalized email templates and customize them for different types of referral requests. Our platform also provides pre-built templates to get you started."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-secondary-blue/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Everything you need to know about JobDM
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-primary-orange transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact support */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="mailto:support@jobdm.com"
            className="text-primary-orange font-semibold hover:underline"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
