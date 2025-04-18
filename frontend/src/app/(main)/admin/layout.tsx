'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useHasMounted } from '@/hooks/useHasMounted';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const mounted = useHasMounted();
  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mounted && (!isLoggedIn || isLoggedIn && user?.roleName !== 'Admin')) {
      router.replace('/403');
    }
  }, [mounted, isLoggedIn, user]);

  if (!mounted) return null;

  return (
    <div className="p-6 text-white space-y-6">
      {children}
    </div>
  );
}


