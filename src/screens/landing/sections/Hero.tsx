'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignInClick = () => {
    if (session) {
      // User is already logged in, redirect to dashboard
      router.push('/dashboard');
    } else {
      // User is not logged in, go to login page
      router.push('/login');
    }
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-blue/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            JobDM – Simplifying{' '}
            <span className="text-primary-orange">Referrals</span>{' '}
            for Job Seekers
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Request referrals from top-tier professionals directly and effortlessly. 
            Connect with verified HR professionals and industry experts to accelerate your career.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleSignInClick}
              className="bg-primary-orange text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-orange/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
            <Link 
              href="/register"
              className="bg-white text-primary-orange border-2 border-primary-orange px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-orange hover:text-white transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
          
          {/* Trust indicator */}
          <p className="text-sm text-text-tertiary">
            Join thousands of job seekers who have successfully landed their dream jobs
          </p>
        </div>
        
        {/* Hero illustration placeholder */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-4xl h-64 bg-gradient-to-r from-secondary-blue to-primary-orange/10 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-text-secondary font-medium">Professional Network Visualization</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
