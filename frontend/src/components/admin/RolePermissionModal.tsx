'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';

export function RolePermissionModal({ roleId }: { roleId: number }) {
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    axiosInstance.get('/permissions').then((res) => setAllPermissions(res.data));
    axiosInstance.get(`/roles/${roleId}/permissions`).then((res) => {
      const ids = res.data.map((p: any) => p.id);
      setSelected(ids);
    });
  }, [roleId]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    await axiosInstance.post(`/roles/${roleId}/permissions`, {
      permissionIds: selected,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Chỉnh quyền</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-bold mb-2">Phân quyền cho vai trò</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {allPermissions.map((perm) => (
            <div key={perm.id} className="flex items-center space-x-2">
              <Checkbox
                checked={selected.includes(perm.id)}
                onCheckedChange={() => toggle(perm.id)}
              />
              <Label>{perm.name}</Label>
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={handleSave}>
          Lưu
        </Button>
      </DialogContent>
    </Dialog>
  );
}
