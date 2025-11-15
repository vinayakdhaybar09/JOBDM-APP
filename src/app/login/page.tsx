'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/lib/hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { mutate: login, isPending, isSuccess } = useLogin();

  // Redirect to dashboard on successful login
  React.useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard');
      console.log('Login successful!');
    }
  }, [isSuccess, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the login mutation
    login({ email, password });
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Or{' '}
          <Link href="/register" className="font-medium text-primary-orange hover:text-primary-orange/80">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Demo credentials info */}
            <div className="bg-secondary-blue border border-primary-orange/20 text-text-primary px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: demo@gmail.com</p>
              <p>Password: demo@gmail.com</p>
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-lg placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-orange focus:ring-primary-orange border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-orange hover:text-primary-orange/80">
                  Forgot your password?
                </a>
              </div>
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
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
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

export default LoginPage;
