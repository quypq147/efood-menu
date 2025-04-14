'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { RolePermissionModal } from '@/components/admin/RolePermissionModal';

export default function RoleDetailPage() {
  const { id } = useParams();
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get(`/roles/${id}`).then((res) => setRole(res.data));
  }, [id]);

  if (!role) return <div className="text-white">Đang tải vai trò...</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Vai trò: {role.name}</h1>

      <h2 className="font-semibold text-lg mb-2">Quyền hiện tại:</h2>
      <ul className="list-disc ml-6 mb-4">
        {role.permissions.map((p: any) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <RolePermissionModal roleId={+id} />
    </div>
  );
}

