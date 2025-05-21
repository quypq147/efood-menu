"use client";

import {
  Moon,
  Globe2,
  Bell,
  Info,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import FoodManagementPage from "@/components/FoodManagementPage";
import { Button } from "@/components/ui/button";
import AppearanceSetting from "@/components/AppearanceSetting";

const sidebarItems = [
  {
    label: "Giao diện",
    icon: Moon,
    description: "Tuỳ chỉnh giao diện của bạn",
  },
  {
    label: "Quản lý sản phẩm",
    icon: Globe2,
    description: "Tuỳ chỉnh sản phẩm, giá cả, v.v.",
  },
  {
    label: "Thông báo",
    icon: Bell,
    description: "Tuỳ chỉnh thông báo của bạn",
  },
  {
    label: "Về chúng tôi",
    icon: Info,
    description: "Tìm hiểu thêm về chúng tôi",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState();

  return (
    <div className="flex p-5 ml-10 h-screen text-white">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Cài Đặt</h1>
        {/* Sidebar */}
        <aside className="w-72 bg-[#252836] p-6 space-y-4  ">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full flex background-none items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:text-white",
                activeTab === item.label
                  ? "bg-[#333347] text-white"
                  : "text-gray-400 hover:bg-[#333347] hover:text-white"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  activeTab === item.label ? "text-white" : "text-gray-400"
                )}
              />
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    "font-medium",
                    activeTab === item.label ? "text-white" : "text-gray-300"
                  )}
                >
                  {item.label}
                </span>
                <span className="text-xs text-start text-gray-500">
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          {activeTab === "Products Management" && (
            <Button className="bg-[#ff6b5c] text-white px-4 py-2 rounded-lg">
              Quản lý loại món ăn
            </Button>
          )}
        </div>
        <div className="mt-6">
          {activeTab === "Giao diện" && <AppearanceSetting />}
          {activeTab === "Quản lý sản phẩm" && <FoodManagementPage />}

          {activeTab === "Thông báo" && (
            <div>Notification settings go here...</div>
          )}
          {activeTab === "About Us" && (
            <div>Information about us goes here...</div>
          )}
        </div>
      </main>
    </div>
  );
}
