'use client';

import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function RoleAdminPage() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await axiosInstance.get('/roles');
    setRoles(res.data);
  };

  const handleAddRole = async () => {
    try {
      await axiosInstance.post('/roles', { name: newRole });
      setNewRole('');
      fetchRoles();
      toast.success('Thêm vai trò thành công!');
    } catch {
      toast.error('Không thể thêm vai trò.');
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Quản lý vai trò</h1>

      <div className="flex items-center gap-2 mb-4">
        <Input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Tên vai trò mới"
          className="bg-white text-black"
        />
        <Button onClick={handleAddRole}>Thêm</Button>
      </div>

      <div className="space-y-4">
        {roles.map((role: any) => (
          <div key={role.id} className="bg-[#2a2a3c] p-4 rounded-lg shadow">
            <div className="font-semibold">{role.name}</div>
            <div className="text-sm text-gray-400">
              {role.users.length} người dùng • {role.permissions.length} quyền
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
