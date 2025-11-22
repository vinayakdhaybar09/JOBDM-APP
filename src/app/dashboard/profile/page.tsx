'use client';

import Tabs from '@/screens/profile/components/Tabs';
import CircularProgress from '@/components/ui/CircularProgress';
import { useProfileCompletion } from '@/lib/hooks/useProfile';

export default function ProfilePage() {
  // Authentication is handled by the dashboard layout
  // No need to check authentication here as the layout will redirect if not authenticated

  const { data: completionData, isLoading } = useProfileCompletion();
  const percentage = completionData?.profileCompletion || 0;

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Profile Settings</h1>
        {!isLoading && (
          <CircularProgress percentage={percentage} size={50} strokeWidth={5} />
        )}
      </div>
      <Tabs />
    </>
  );
}
