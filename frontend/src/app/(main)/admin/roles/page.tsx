"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import BreadcrumbTabs from "@/components/BreadcrumbTabs";
import { Plus } from "lucide-react";
import RoleEditDrawer from "@/components/admin/RoleEditDrawer";

export default function RoleAdminPage() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await axiosInstance.get("/roles");
    setRoles(res.data);
  };

  const handleAddRole = async () => {
    try {
      await axiosInstance.post("/roles", { name: newRole });
      setNewRole("");
      fetchRoles();
      toast.success("Thêm vai trò thành công!");
    } catch {
      toast.error("Không thể thêm vai trò.");
    }
  };

  return (
    <div className="p-6 text-white space-y-6">
      <BreadcrumbTabs />

      <div className="flex items-center gap-3">
        <Input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Tên vai trò mới"
          className="bg-white text-black w-[300px]"
        />
        <Button onClick={handleAddRole} className="flex items-center gap-1">
          <Plus size={16} /> Thêm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role: any) => (
          <div
            key={role.id}
            className="bg-[#2a2a3c] p-5 rounded-lg shadow hover:shadow-lg transition relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {role.users?.length || 0} người dùng •{" "}
                  {role.permissions?.length || 0} quyền
                </p>
              </div>
              <RoleEditDrawer role={role} onUpdated={fetchRoles} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
