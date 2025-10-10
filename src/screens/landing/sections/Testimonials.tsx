import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      content: "JobDM helped me get multiple referrals in a week! The personalized email templates and verified database made all the difference in my job search.",
      avatar: "SJ"
    },
    {
      name: "Priya Sharma",
      role: "HR Manager",
      company: "TCS",
      content: "As an HR professional, I can manage requests easily and respond timely. JobDM has streamlined our referral process significantly.",
      avatar: "PS"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      content: "The automated email system saves a lot of time. I was able to reach out to 50+ professionals in just a few clicks.",
      avatar: "MC"
    }
  ];

  return (
    <section className="py-20 bg-secondary-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            You're in good company
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Join thousands of job seekers and HR professionals who trust JobDM for their referral needs.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
              {/* Quote */}
              <div className="mb-6">
                <svg className="w-8 h-8 text-primary-orange mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <p className="text-text-primary leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                  <p className="text-text-secondary text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-orange mb-2">10,000+</div>
            <div className="text-text-secondary">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-orange mb-2">50,000+</div>
            <div className="text-text-secondary">Referrals Sent</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-orange mb-2">85%</div>
            <div className="text-text-secondary">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
