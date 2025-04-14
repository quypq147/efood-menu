'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axios';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Token không hợp lệ hoặc đã hết hạn');
      return;
    }
    if (password !== confirm) {
      toast.error('Mật khẩu không khớp');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/auth/reset-password', { token, password });
      toast.success('Đặt lại mật khẩu thành công!');
      router.push('/auth/sign-in');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Lỗi khi đặt lại mật khẩu');
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
        <h2 className="text-2xl font-bold text-center mb-2">Đặt lại mật khẩu</h2>
        <Input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-100 text-black"
        />
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="bg-gray-100 text-black"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
        >
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </form>
    </div>
  );
}
