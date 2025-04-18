"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BreadcrumbTabs from "@/components/BreadcrumbTabs";
import { cn } from "@/lib/utils";

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
        axiosInstance.get("/roles"),
        axiosInstance.get("/permissions"),
        axiosInstance.get("/role-permissions"),
      ]);

      const matrix: RolePermissionMatrix = {};
      roleRes.data.forEach((role: Role) => {
        matrix[role.id] = {};
        permRes.data.forEach((perm: Permission) => {
          matrix[role.id][perm.id] = false;
        });
      });

      rolePermRes.data.forEach(
        (rp: { roleId: number; permissionId: number }) => {
          matrix[rp.roleId][rp.permissionId] = true;
        }
      );

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
        await axiosInstance.post("/role-permissions", { roleId, permissionId });
      } else {
        await axiosInstance.delete(`/role-permissions`, {
          data: { roleId, permissionId },
        });
      }

      toast.success("Cập nhật quyền thành công");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className="p-4 bg-[#1c1c28] text-white rounded-xl">
      <BreadcrumbTabs />
      <h2 className="text-2xl font-bold mb-6">🛡️ Bảng phân quyền</h2>

      <div className="space-y-4">
        {permissions.map((perm) => (
          <div
            key={perm.id}
            className="bg-[#2a2a3c] px-6 py-4 rounded-lg shadow flex items-center justify-between hover:bg-[#313140] transition"
          >
            <div className="flex-1">
              <p className="text-base font-semibold">{perm.name}</p>
              <p className="text-sm text-gray-400">Phân quyền theo vai trò</p>
            </div>

            <div className="flex gap-6">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex flex-col gap-2 items-center text-sm"
                >
                  <Badge
                    className={cn(
                      "px-4 py-1 rounded-md text-sm font-semibold",
                      role.name === "Admin" && "bg-red-600 text-white",
                      role.name === "Staff" && "bg-blue-600 text-white",
                      role.name === "Customer" && "bg-gray-600 text-white"
                    )}
                  >
                    {role.name}
                  </Badge>
                  <Checkbox
                    checked={matrix[role.id]?.[perm.id] || false}
                    onCheckedChange={() => togglePermission(role.id, perm.id)}
                    className="border-gray-400 data-[state=checked]:bg-[#ff6b5c] data-[state=checked]:border-[#ff6b5c]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="ghost" className="text-gray-400 hover:text-white">
          Hủy
        </Button>
        <Button className="bg-[#ff6b5c] hover:bg-[#ff8575] text-white">
          Lưu
        </Button>
      </div>
    </div>
  );
}
