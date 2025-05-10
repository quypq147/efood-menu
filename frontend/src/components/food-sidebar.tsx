'use client';

import {
  Home,
  Utensils,
  Settings,
  LogOut,
  Users,
  ShieldUser,
  LucideLayoutDashboard,
} from 'lucide-react';
import { icons } from '@/lib/icons';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import SidebarItem from './SidebarItem';

export function FoodSidebar() {
  const { isLoggedIn, user } = useUserStore();
  const isAdmin = user?.roleName === 'Admin';

  const navItems = [
    { icon: <Home size={20} />, href: '/', tooltip: 'Trang chủ' },
    { icon: <LucideLayoutDashboard size={20} />, href: '/dashboard', tooltip: 'Thực đơn' },
    { icon: <Settings size={20} />, href: '/settings', tooltip: 'Cài đặt' },
  ];

  if (isLoggedIn && user?.id) {
    navItems.push({
      icon: <Users size={20} />,
      href: `/users/${user.id}`,
      tooltip: 'Người dùng',
    });
  }

  return (
    <aside className="h-screen rounded-r-lg w-[80px] bg-[#1F1D2B] border-r flex flex-col justify-between items-center py-6 ">
      {/* Logo */}
      <div className="space-y-6 flex flex-col items-center">
        <div className="rounded-xl bg-primary p-2">
          <Image src={icons.logo} alt="logo" width={32} height={32} />
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4 mt-2">
          {navItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              href={item.href}
              tooltip={item.tooltip}
            />
          ))}
          {isAdmin && (
            <SidebarItem
              icon={<ShieldUser size={20} />}
              href="/admin"
              tooltip="Trang quản trị"
            />
          )}
        </div>
      </div>

      {/* Logout */}
      <div>
        {isLoggedIn ? (
          <SidebarItem
            icon={<LogOut size={20} />}
            href="/auth/logout"
            tooltip="Đăng xuất"
          />
        ) : (
          <SidebarItem
            icon={<Users size={20} />}
            href="/auth/sign-in"
            tooltip="Đăng nhập"
          />
        )}
      </div>
    </aside>
  );
}







