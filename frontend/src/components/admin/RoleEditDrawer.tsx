// components/admin/RoleEditDrawer.tsx
'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export default function RoleEditDrawer({ role, onUpdated }: { role: any; onUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/roles/${role.id}`, { name, description });
      toast.success('Đã cập nhật vai trò');
      setOpen(false);
      onUpdated();
    } catch {
      toast.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/roles/${role.id}`);
      toast.success('Đã xoá vai trò');
      setOpen(false);
      onUpdated();
    } catch {
      toast.error('Không thể xoá vai trò');
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className='bg-transperent' size="sm" >
          ✏️ Sửa
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Chỉnh sửa vai trò</DrawerTitle>
          <DrawerDescription>Thay đổi thông tin hoặc xoá vai trò này.</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <div>
            <Label htmlFor="name">Tên vai trò</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="desc">Mô tả</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xoá
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost">Huỷ</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
