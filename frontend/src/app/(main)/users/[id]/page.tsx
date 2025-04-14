'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function UserProfileById() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: '', address: '', birthDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}`);
        setUser(res);
        setForm({
          name: res.name || '',
          address: res.address || '',
          birthDate: res.birthDate?.slice(0, 10) || '',
        });
      } catch (err) {
        toast.error('Không thể tải thông tin người dùng');
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.patch(`/users/me`, form, {
        withCredentials: true,
      }); // 👈 hoặc `/users/${id}` nếu là admin
      toast.success('Cập nhật thành công!');
      setUser(res);
    } catch (err) {
      toast.error('Lỗi khi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-white p-6">Đang tải...</div>;

  return (
    <div className=" bg-[#1c1c28] text-white px-4 py-10 flex justify-center">
      <div className="bg-[#2a2a3c] p-8 rounded-xl shadow-md max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Hồ sơ người dùng</h2>

        <div className="space-y-3">
          <div>
            <Label className="text-white">Họ tên</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label className="text-white">Địa chỉ</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label className="text-white">Ngày sinh</Label>
            <Input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              className="bg-white text-black"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full mt-4 bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </div>
  );
}


