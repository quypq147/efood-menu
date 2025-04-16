'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && user?.roleName !== 'Admin') {
      router.replace('/403'); // redirect nếu không phải admin
    }
  }, [user, isLoggedIn]);

  return <>{children}</>;
}

