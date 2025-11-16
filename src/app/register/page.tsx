'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegister } from '@/lib/hooks/useAuth';
import { Gender } from '@/lib/api/types';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNo, setContactNo] = useState('+91');
  const [gender, setGender] = useState<Gender | ''>('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { mutate: register, isPending, isSuccess } = useRegister();

  // Redirect to login on successful registration
  React.useEffect(() => {
    if (isSuccess) {
      router.push('/login');
      console.log('Registration successful!');
    }
  }, [isSuccess, router]);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/\d/.test(pwd)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (fullName.trim().length < 2 || fullName.trim().length > 100) {
      setError('Full name must be between 2 and 100 characters');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
      setError('Full name can only contain letters and spaces');
      return;
    }

    // Validate contact number: must start with +91 and have exactly 10 digits after
    const phoneNumber = contactNo.trim();
    if (!phoneNumber) {
      setError('Contact number is required');
      return;
    }

    if (!phoneNumber.startsWith('+91')) {
      setError('Contact number must start with +91');
      return;
    }

    const digitsAfterPrefix = phoneNumber.substring(3);
    if (!/^\d{10}$/.test(digitsAfterPrefix)) {
      setError('Contact number must have exactly 10 digits after +91');
      return;
    }

    if (!gender) {
      setError('Gender is required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Prepare registration data - default type to "employee"
    const registerData = {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      type: 'employee' as const,
      contactNo: contactNo.trim(),
      gender: gender as Gender,
    };

    // Call the register mutation
    register(registerData);
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary-orange hover:text-primary-orange/80">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Full Name field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-text-primary">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                  placeholder="Create a password (min 8 chars, uppercase, lowercase, number)"
                />
              </div>
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Contact Number field */}
            <div>
              <label htmlFor="contactNo" className="block text-sm font-medium text-text-primary">
                Contact Number
              </label>
              <div className="mt-1">
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-secondary-blue text-text-primary text-sm">
                    +91
                  </span>
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={contactNo.startsWith('+91') ? contactNo.substring(3) : contactNo}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                      if (value.length <= 10) {
                        setContactNo('+91' + value);
                      }
                    }}
                    maxLength={10}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-r-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                    placeholder="Enter 10 digit mobile number"
                  />
                </div>
                <p className="mt-1 text-xs text-text-tertiary">Only Indian numbers (+91) are supported</p>
              </div>
            </div>

            {/* Gender field */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-text-primary">
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender | '')}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-orange focus:ring-primary-orange border-border rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary-orange hover:text-primary-orange/80">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-orange hover:text-primary-orange/80">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-orange hover:bg-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isPending ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-text-secondary hover:text-primary-orange">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
