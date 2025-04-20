'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    const verify = async () => {
      try {
        await axiosInstance.post('/auth/verify-email', { token });
        setSuccess(true);
        toast.success('✅ Xác minh email thành công!');
      } catch (err) {
        setSuccess(false);
        toast.error('❌ Xác minh thất bại. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c28] text-white px-4">
      {loading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin" /> <span>Đang xác minh...</span>
        </div>
      ) : success ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">🎉 Xác minh thành công!</h2>
          <p>Bây giờ bạn có thể đăng nhập.</p>
        </div>
      ) : (
        <div className="text-center text-red-400">
          <h2 className="text-xl font-bold">❌ Xác minh thất bại!</h2>
          <p>Vui lòng thử lại hoặc kiểm tra link xác minh.</p>
        </div>
      )}
    </div>
  );
}


