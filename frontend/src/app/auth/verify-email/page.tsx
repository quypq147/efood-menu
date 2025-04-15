'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      if (!token) return;

      try {
        await axiosInstance.post('/auth/verify-email', { token });
        toast.success('Xác minh email thành công! Bạn có thể đăng nhập.');
        router.push('/auth/sign-in');
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Xác minh thất bại');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {loading ? 'Đang xác minh tài khoản...' : 'Đã xử lý xác minh!'}
    </div>
  );
}
