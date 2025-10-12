import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do email credits work?',
      answer: 'Each credit allows you to send one personalized email. Credits don\'t expire and can be used anytime.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Unused credits can be refunded within 30 days of purchase. Contact support for assistance.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, and net banking through Razorpay.',
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! Our higher plans include bonus credits. Contact us for custom enterprise pricing.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-24">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-semibold">Q.</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;