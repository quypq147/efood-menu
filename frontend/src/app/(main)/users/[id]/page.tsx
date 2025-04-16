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
        console.log('res', res.data);
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
    <div className="  text-white py-10 px-6 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-[#2a2a3c] rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6">Cài đặt tài khoản</h2>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-[#1f1f2e] rounded-lg flex gap-2 mb-4 w-full max-w-md">
            <TabsTrigger
              value="profile"
              className="flex-1 py-2 text-base data-[state=active]:bg-[#ff6b5c] data-[state=active]:text-white"
            >
              🧑 Hồ sơ
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 py-2 text-base data-[state=active]:bg-[#ff6b5c] data-[state=active]:text-white"
            >
              🔒 Bảo mật
            </TabsTrigger>
          </TabsList>

          {/* Hồ sơ */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Họ tên</Label>
                <Input
                  name="fullname"
                  value={form.fullname}
                  onChange={handleInfoChange}
                  className="bg-white text-black mt-1"
                />
              </div>
              <div>
                <Label>Số điện thoại</Label>
                <Input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInfoChange}
                  className="bg-white text-black mt-1"
                />
              </div>
              <div>
                <Label>Địa chỉ</Label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleInfoChange}
                  className="bg-white text-black mt-1"
                />
              </div>
              <div>
                <Label>Ngày sinh</Label>
                <Input
                  name="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={handleInfoChange}
                  className="bg-white text-black mt-1"
                />
              </div>
            </div>
            <Button
              onClick={handleInfoSubmit}
              disabled={loading}
              className="bg-[#ff6b5c] hover:bg-[#ff8575] mt-4"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </TabsContent>

          {/* Bảo mật */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Mật khẩu hiện tại</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  className="bg-white text-black mt-1"
                />
              </div>
              <div>
                <Label>Mật khẩu mới</Label>
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="bg-white text-black mt-1"
                />
              </div>
            </div>
            <Button
              onClick={handlePasswordSubmit}
              disabled={loading}
              className="bg-[#ff6b5c] hover:bg-[#ff8575] mt-4"
            >
              {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


