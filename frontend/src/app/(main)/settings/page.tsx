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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sidebarItems = [
  { label: "Appearance", icon: Moon },
  { label: "Your Restaurant", icon: LayoutDashboard },
  { label: "Notifications", icon: Bell },
  { label: "Security", icon: ShieldCheck },
  { label: "About Us", icon: Info },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Appearance");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");

  return (
    <div className="flex flex-col  text-white p-6">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <div className="flex gap-2 text-white">
        {/* Sidebar */}
        <aside className="w-72 border-r border-[#2e2e40] bg-[#252836] p-6 space-y-4 rounded-lg">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full justify-start gap-2 rounded-lg hover:bg-[#ff6b5c]/20",
                activeTab === item.label && "bg-[#ff6b5c] text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === "Appearance" && (
            <Card className="bg-[#2A2A3C] text-white shadow-md max-w-3xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Moon size={20} /> Appearance Settings
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>🌙 Dark Mode</Label>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={(v) => setDarkMode(v)}
                  />
                </div>

                <div>
                  <Label className="block mb-2">🌐 Language</Label>
                  <Select
                    value={language}
                    onValueChange={(val) => setLanguage(val)}
                  >
                    <SelectTrigger className="bg-white text-black w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">🇻🇳 Vietnamese</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 text-right">
                  <Button className="bg-[#ff6b5c] hover:bg-[#ff8575]">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab !== "Appearance" && (
            <div className="text-lg text-gray-400 mt-6">
              Chưa có nội dung 😅
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
