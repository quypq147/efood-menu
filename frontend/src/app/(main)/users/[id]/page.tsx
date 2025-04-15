'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function UserSettingsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: '',
    address: '',
    birthDate: '',
    phoneNumber: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}`);
        setUser(res.data);
        setForm({
          fullname: res.data.fullname || '',
          address: res.data.address || '',
          birthDate: res.data.birthDate?.slice(0, 10) || '',
          phoneNumber: res.data.phoneNumber || '',
        });
      } catch {
        toast.error('Không thể tải thông tin người dùng');
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleInfoChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e: any) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleInfoSubmit = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.patch('/users/me', form);
      console.log(res.data);
      setUser(res.data);
      toast.success('Thông tin đã được cập nhật');
    } catch {
      toast.error('Lỗi khi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch('/auth/change-password', passwordForm);
      toast.success('Mật khẩu đã được đổi');
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch {
      toast.error('Sai mật khẩu hiện tại hoặc lỗi máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-[#1c1c28] text-white flex justify-center py-10 px-4">
      <Tabs defaultValue="profile" className="w-full max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tài khoản</h2>
          <TabsList className="bg-[#2a2a3c] rounded-lg w-fit">
            <TabsTrigger value="profile">🧑 Hồ sơ</TabsTrigger>
            <TabsTrigger value="security">🔒 Bảo mật</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Chi tiết hồ sơ</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Họ tên</Label>
              <Input
                name="fullname"
                value={form.fullname}
                onChange={handleInfoChange}
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label>Số điện thoại</Label>
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleInfoChange}
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label>Địa chỉ</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleInfoChange}
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label>Ngày sinh</Label>
              <Input
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleInfoChange}
                className="bg-white text-black"
              />
            </div>
          </div>
          <Button
            className="bg-[#ff6b5c] hover:bg-[#ff8575]"
            onClick={handleInfoSubmit}
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Đổi mật khẩu</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Mật khẩu hiện tại</Label>
              <Input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                className="bg-white text-black"
              />
            </div>
            <div>
              <Label>Mật khẩu mới</Label>
              <Input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="bg-white text-black"
              />
            </div>
          </div>
          <Button
            className="bg-[#ff6b5c] hover:bg-[#ff8575]"
            onClick={handlePasswordSubmit}
            disabled={loading}
          >
            {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

