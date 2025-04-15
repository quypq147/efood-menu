'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export default function RolePermissionTable() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [mapping, setMapping] = useState<Record<number, number[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const [roleRes, permissionRes] = await Promise.all([
        axiosInstance.get('/roles'),
        axiosInstance.get('/permissions'),
      ]);
      setRoles(roleRes.data);
      setPermissions(permissionRes.data);

      const map: Record<number, number[]> = {};
      for (const role of roleRes.data) {
        map[role.id] = role.permissions?.map((p: any) => p.id) || [];
      }
      setMapping(map);
    };

    fetchData();
  }, []);

  const togglePermission = (roleId: number, permissionId: number) => {
    setMapping(prev => {
      const current = prev[roleId] || [];
      const updated = current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId];
      return { ...prev, [roleId]: updated };
    });
  };

  const handleSave = async () => {
    try {
      for (const [roleId, permissionIds] of Object.entries(mapping)) {
        await axiosInstance.patch(`/roles/${roleId}/permissions`, {
          permissionIds,
        });
      }
      toast.success('Cập nhật quyền thành công!');
    } catch (err) {
      toast.error('Lỗi khi cập nhật quyền');
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa quyền theo vai trò</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-white/10">
          <thead>
            <tr>
              <th className="text-left p-2">Quyền</th>
              {roles.map((r: any) => (
                <th key={r.id} className="text-center p-2">{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((p: any) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-2">{p.name}</td>
                {roles.map((role: any) => (
                  <td key={role.id} className="text-center">
                    <Checkbox
                      checked={mapping[role.id]?.includes(p.id)}
                      onCheckedChange={() => togglePermission(role.id, p.id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={handleSave} className="mt-6 bg-[#ff6b5c] hover:bg-[#ff8575] text-white">
        Lưu thay đổi
      </Button>
    </div>
  );
}
