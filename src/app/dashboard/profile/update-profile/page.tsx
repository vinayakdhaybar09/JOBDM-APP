'use client';

import { useRouter } from 'next/navigation';
import UpdateProfileForm from '@/screens/profile/components/UpdateProfileForm';

export default function UpdateProfilePage() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/dashboard/profile')}
          className="p-2 text-text-secondary hover:text-primary-orange transition-colors"
          aria-label="Go back to profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-text-primary">Update Profile</h1>
      </div>
      <UpdateProfileForm />
    </>
  );
}

