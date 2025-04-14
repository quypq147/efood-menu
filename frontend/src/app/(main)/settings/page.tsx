"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");

  const handleThemeToggle = (value: boolean) => {
    setDarkMode(value);
    // TODO: Áp dụng theme
    console.log("Dark mode:", value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // TODO: Áp dụng đa ngôn ngữ
    console.log("Ngôn ngữ:", value);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt giao diện</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Chế độ tối (Dark Mode)</Label>
            <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
          </div>

          <div>
            <Label className="block mb-1 text-sm font-medium">Ngôn ngữ</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => console.log("Đã lưu theme và ngôn ngữ")}>Lưu thay đổi</Button>
        </CardContent>
      </Card>
    </div>
  );
}
