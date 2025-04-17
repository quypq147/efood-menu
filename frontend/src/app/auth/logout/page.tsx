'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axios';

export default function LogoutPage() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
        clearUser(); // Clear store
        toast.success('Đã đăng xuất');
      } catch {
        toast.error('Lỗi khi đăng xuất');
      } finally {
        router.push('/'); // redirect về home
      }
    };

    logout();
  }, []);

  return (
    <div className="text-white text-center mt-20 text-xl">
      Đang đăng xuất...
    </div>
  );
}
