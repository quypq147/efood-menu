"use client";

import { Users, Tags, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import BreadcrumbTabs from "@/components/BreadcrumbTabs";
import AnimatePage from "@/components/AnimatePage";

export default function AdminHomePage() {
  const stats = [
    {
      title: "Người dùng",
      icon: <Users className="w-5 h-5" />,
      value: 128,
      href: "/admin/users",
    },
    {
      title: "Vai trò",
      icon: <Tags className="w-5 h-5" />,
      value: 5,
      href: "/admin/roles",
    },
    {
      title: "Món ăn",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      value: 54,
      href: "/admin/foods",
    },
    {
      title: "Đơn hàng",
      icon: <ShoppingBag className="w-5 h-5" />,
      value: 23,
      href: "/admin/orders",
    },
  ];

  return (
    <AnimatePage>
      <div className="text-white px-6 py-8 space-y-6">
        {/* Breadcrumb giống hình bạn gửi */}
        <BreadcrumbTabs />

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold mt-4">
            🎯 Chào mừng bạn đến trang Admin!
          </h1>
          <Separator className="mt-4 bg-white/20" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((item, index) => (
            <Link href={item.href} key={index}>
              <Card className="bg-[#2a2a3c] text-white hover:shadow-lg hover:bg-[#333347] transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AnimatePage>
  );
}
