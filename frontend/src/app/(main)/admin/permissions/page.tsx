"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BreadcrumbTabs from "@/components/BreadcrumbTabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="p-6 text-white rounded-xl min-h-[80vh] shadow-lg">
      <BreadcrumbTabs />
      <h2 className="text-2xl font-bold mb-6">🛡️ Bảng phân quyền</h2>

      <div className="overflow-x-auto rounded-lg border border-[#313140] bg-[#232336]">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="sticky top-0 z-10 bg-[#232336] border-b border-[#313140]">
            <tr>
              <th className="text-left py-3 px-4 font-semibold">Quyền</th>
              {roles.map((role) => (
                <th key={role.id} className="text-center px-4">
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {permissions.map((perm, idx) => (
                <motion.tr
                  key={perm.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.04 }}
                  className="border-b border-[#313140] hover:bg-[#28283a] transition"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium">{perm.name}</div>
                    <div className="text-xs text-gray-400">Phân quyền theo vai trò</div>
                  </td>
                  {roles.map((role) => (
                    <td key={role.id} className="text-center">
                      <Checkbox
                        checked={matrix[role.id]?.[perm.id] || false}
                        onCheckedChange={() => togglePermission(role.id, perm.id)}
                        className="border-gray-400 data-[state=checked]:bg-[#ff6b5c] data-[state=checked]:border-[#ff6b5c]"
                      />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="ghost" className="text-gray-400 hover:text-white">
          Hủy
        </Button>
        <Button className="bg-[#ff6b5c] hover:bg-[#ff8575] text-white">
          Lưu
        </Button>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #313140;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
