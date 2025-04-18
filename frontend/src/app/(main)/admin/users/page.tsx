'use client';

import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import BreadcrumbTabs from '@/components/BreadcrumbTabs';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, roleRes] = await Promise.all([
        axiosInstance.get('/users'),
        axiosInstance.get('/roles'),
      ]);
      setUsers(userRes.data);
      setRoles(roleRes.data);
    };

    fetchData();
  }, []);

  const handleRoleChange = async (userId: number, newRoleId: string) => {
    try {
      await axiosInstance.patch(`/users/${userId}/role`, { roleId: +newRoleId });
      toast.success('Cập nhật vai trò thành công');
    } catch {
      toast.error('Thất bại khi cập nhật vai trò');
    }
  };

  return (
    <div className="p-6 text-white space-y-6">
      <BreadcrumbTabs />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {users.map((user: any) => (
          <div key={user.id} className="bg-[#2a2a3c] p-5 rounded-lg shadow flex justify-between items-center hover:shadow-lg transition">
            <div>
              <div className="text-base font-semibold">{user.fullname || user.name}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>

            <Select defaultValue={String(user.roleId)} onValueChange={(v) => handleRoleChange(user.id, v)}>
              <SelectTrigger className="w-[150px] bg-white text-black">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role: any) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}

