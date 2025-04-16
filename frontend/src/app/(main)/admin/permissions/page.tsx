'use client';

import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
}

interface RolePermissionMatrix {
  [roleId: number]: {
    [permissionId: number]: boolean;
  };
}

export default function RolePermissionMatrix() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [matrix, setMatrix] = useState<RolePermissionMatrix>({});

  useEffect(() => {
    const fetchData = async () => {
      const [roleRes, permRes, rolePermRes] = await Promise.all([
        axiosInstance.get('/roles'),
        axiosInstance.get('/permissions'),
        axiosInstance.get('/role-permissions'), // giả định API trả ra { roleId, permissionId }[]
      ]);

      const matrix: RolePermissionMatrix = {};
      roleRes.data.forEach((role: Role) => {
        matrix[role.id] = {};
        permRes.data.forEach((perm: Permission) => {
          matrix[role.id][perm.id] = false;
        });
      });

      rolePermRes.data.forEach((rp: { roleId: number; permissionId: number }) => {
        matrix[rp.roleId][rp.permissionId] = true;
      });

      setRoles(roleRes.data);
      setPermissions(permRes.data);
      setMatrix(matrix);
    };

    fetchData();
  }, []);

  const togglePermission = async (roleId: number, permissionId: number) => {
    const isChecked = !matrix[roleId][permissionId];

    try {
      setMatrix((prev) => ({
        ...prev,
        [roleId]: {
          ...prev[roleId],
          [permissionId]: isChecked,
        },
      }));

      if (isChecked) {
        await axiosInstance.post('/role-permissions', { roleId, permissionId });
      } else {
        await axiosInstance.delete(`/role-permissions`, {
          data: { roleId, permissionId },
        });
      }

      toast.success('Cập nhật quyền thành công');
    } catch {
      toast.error('Cập nhật thất bại');
    }
  };

  return (
    <div className="p-6 bg-[#1c1c28] text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">🛡️ Chỉnh sửa vai trò và quyền</h2>
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-[#2a2a3c]">
            <tr>
              <th className="text-left px-4 py-2 border-r border-gray-700">Chức Năng</th>
              {roles.map((role) => (
                <th key={role.id} className="text-center px-4 py-2 border-r border-gray-700">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id} className="border-t border-gray-700">
                <td className="px-4 py-2 border-r border-gray-700">{perm.name}</td>
                {roles.map((role) => (
                  <td key={role.id} className="text-center px-4 py-2 border-r border-gray-700">
                    <Checkbox
                      checked={matrix[role.id]?.[perm.id] || false}
                      onCheckedChange={() => togglePermission(role.id, perm.id)}
                      className="border-gray-400 data-[state=checked]:bg-[#ff6b5c] data-[state=checked]:border-[#ff6b5c]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <Button variant="ghost" className="mr-4 text-gray-300 hover:text-white">
          Hủy
        </Button>
        <Button className="bg-[#ff6b5c] hover:bg-[#ff8575] text-white">Lưu</Button>
      </div>
    </div>
  );
}
