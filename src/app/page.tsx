// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push('/energy');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-lg font-semibold text-green-700">Redirecting to dashboard...</div>
    </div>
  );
}