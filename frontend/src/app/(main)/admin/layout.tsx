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

  if (!mounted) return null; // ✅ Không render gì trước khi xác thực xong

  return <>{children}</>;
}


