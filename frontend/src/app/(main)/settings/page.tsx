"use client";

import {
  Moon,
  Globe2,
  Bell,
  ShieldCheck,
  LayoutDashboard,
  Info,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import FoodManagementPage from "@/components/FoodManagementPage";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    label: "Appearance",
    icon: Moon,
    description: "Dark and Light mode, Font size",
  },
  {
    label: "Your Restaurant",
    icon: LayoutDashboard,
    description: "Manage your restaurant settings",
  },
  {
    label: "Products Management",
    icon: Globe2,
    description: "Manage your product, pricing, etc",
  },
  {
    label: "Notifications",
    icon: Bell,
    description: "Customize your notifications",
  },
  {
    label: "Security",
    icon: ShieldCheck,
    description: "Configure Password, PIN, etc",
  },
  {
    label: "About Us",
    icon: Info,
    description: "Find out more about Posly",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState();

  return (
    <div className="flex ml-10 h-screen text-white">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {/* Sidebar */}
        <aside className="w-72 bg-[#252836] p-6 space-y-4  ">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full flex background-none items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:text-white",
               activeTab === item.label ? "bg-[#333347] text-white" : "text-gray-400 hover:bg-[#333347] hover:text-white"
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
                <span className="text-xs text-gray-500">
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
          <h2 className="text-2xl font-bold">{activeTab}</h2>
          {activeTab === "Products Management" && (
            <Button className="bg-[#ff6b5c] text-white px-4 py-2 rounded-lg">
              Manage Categories
            </Button>
          )}
        </div>
        <div className="mt-6">
          {activeTab === "Appearance" && (
            <div>Dark and Light mode settings go here...</div>
          )}
          {activeTab === "Your Restaurant" && (
            <div>Your restaurant settings go here...</div>
          )}
          {activeTab === "Products Management" && <FoodManagementPage />}
          {activeTab === "Notifications" && (
            <div>Notification settings go here...</div>
          )}
          {activeTab === "Security" && <div>Security settings go here...</div>}
          {activeTab === "About Us" && (
            <div>Information about us goes here...</div>
          )}
        </div>
      </main>
    </div>
  );
}
