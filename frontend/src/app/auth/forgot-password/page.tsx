'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      toast.success('Email khôi phục đã được gửi!');
      router.push('/auth/reset-password'); // Tuỳ chọn: hoặc về trang chính
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Lỗi khi gửi yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c28] px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2a2a3c] p-8 rounded-2xl w-full max-w-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Quên mật khẩu</h2>
        <p className="text-sm text-center mb-4">
          Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
        </p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-100 text-black"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
        >
          {loading ? 'Đang gửi...' : 'Gửi email khôi phục'}
        </Button>
      </form>
    </div>
  );
}
