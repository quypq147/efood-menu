'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export default function RoleEditDrawer({
  role,
  onUpdated,
}: {
  role: any;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(role.name || '');
  const [description, setDescription] = useState(role.description || '');
  const [permissions, setPermissions] = useState<number[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);

  // Fetch permission list from API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axiosInstance.get('/permissions');
        setAllPermissions(res.data || []);
      } catch (err) {
        toast.error('Không thể tải danh sách quyền');
      }
    };
    fetchPermissions();
  }, []);

  useEffect(() => {
    // Convert role.permissions (object[]) to permissionIds (number[])
    if (role.permissions?.length) {
      const ids = role.permissions.map((p: any) => p.id);
      setPermissions(ids);
    }
  }, [role]);

  const togglePermission = (id: number) => {
    setPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/roles/${role.id}`, {
        name,
        description,
        permissionIds: permissions,
      });
      toast.success('✅ Cập nhật vai trò thành công!');
      setOpen(false);
      onUpdated();
    } catch {
      toast.error('❌ Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa vai trò này?');
    if (!confirm) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`/roles/${role.id}`);
      toast.success('🗑️ Đã xóa vai trò');
      setOpen(false);
      onUpdated();
    } catch {
      toast.error('❌ Xóa thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Pencil size={18} />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        aria-describedby="role-edit-description"
        className="text-white bg-[#1f1f2e] max-w-2xl mx-auto rounded-t-xl border-t border-[#2f2f3d]"
      >
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck size={20} /> Cập nhật vai trò
          </DrawerTitle>
        </DrawerHeader>

        <div id="role-edit-description" className="grid gap-5 p-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Tên vai trò</Label>
            <Input
              id="name"
              className="bg-white text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên vai trò"
            />

            <Label htmlFor="desc" className="mt-3">Mô tả vai trò</Label>
            <Textarea
              id="desc"
              className="bg-white text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả vai trò (tuỳ chọn)"
            />
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <Label className="block font-semibold">Danh sách quyền</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allPermissions.map((perm) => (
                <div key={perm.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`perm-${perm.id}`}
                    checked={permissions.includes(perm.id)}
                    onCheckedChange={() => togglePermission(perm.id)}
                  />
                  <Label htmlFor={`perm-${perm.id}`}>{perm.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter className="flex justify-between items-center px-4 pb-6">
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 border-red-500 hover:bg-red-500/10"
          >
            <Trash2 size={16} className="mr-2" /> Xóa
          </Button>

          <div className="flex gap-2">
            <DrawerClose asChild>
              <Button variant="ghost" disabled={loading}>Hủy</Button>
            </DrawerClose>
            <Button
              onClick={handleSave}
              className="bg-[#ff6b5c] hover:bg-[#ff7e6f]"
              disabled={loading}
            >
              {loading && <Loader2 size={16} className="animate-spin mr-2" />}
              Xác nhận
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}


