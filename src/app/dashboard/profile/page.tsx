'use client';

import Tabs from '@/screens/profile/components/Tabs';

export default function ProfilePage() {
  // Authentication is handled by the dashboard layout
  // No need to check authentication here as the layout will redirect if not authenticated

  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Profile Settings</h1>
      <Tabs />
    </>
  );
}
