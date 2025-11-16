'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useVerifyOTP, useResendOTP } from '@/lib/hooks/useAuth';

interface OTPVerificationProps {
  email: string;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onBack,
  title = "Verify Your Email",
  subtitle = "We've sent a verification code to"
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { mutate: verifyOTP, isPending: isVerifyPending } = useVerifyOTP();
  const { mutate: resendOTP, isPending: isResendPending } = useResendOTP();

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate OTP
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setError('OTP must be exactly 6 digits');
      return;
    }

    // Verify OTP
    verifyOTP({
      email: email.trim(),
      otp: otp.trim()
    });
  };

  const handleResendOTP = () => {
    setError('');
    setOtp('');
    resendOTP(email.trim());
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <div className="bg-primary-orange rounded-lg p-3 mr-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-text-primary">JobDM</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          {subtitle}
        </p>
        <p className="mt-1 text-center text-sm font-medium text-text-primary">
          {email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-text-primary">
                Enter Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    if (value.length <= 6) {
                      setOtp(value);
                    }
                  }}
                  maxLength={6}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                />
              </div>
              <p className="mt-1 text-xs text-text-tertiary">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Verify button */}
            <div>
              <button
                type="submit"
                disabled={isVerifyPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-orange hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isVerifyPending ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </button>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResendPending}
                className="text-sm text-primary-orange hover:text-primary-orange/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResendPending ? 'Sending...' : "Didn't receive the code? Resend"}
              </button>
            </div>

            {/* Back button */}
            {onBack && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-text-secondary hover:text-primary-orange"
                >
                  ← Back
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

