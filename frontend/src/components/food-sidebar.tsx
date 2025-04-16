'use client';

import {
  Home,
  Utensils,
  Settings,
  LogOut,
  Users,
  ShieldUser,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { icons } from '@/lib/icons';
import { useUserStore } from '@/store/userStore';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function FoodSidebar() {
  const { isLoggedIn, user } = useUserStore();
  console.log('user', user);
  const pathname = usePathname();
  const isAdmin = user?.roleName === 'Admin';

  const navItems = [
    { icon: <Home size={20} />, href: '/', tooltip: 'Trang chủ' },
    { icon: <Utensils size={20} />, href: '/menu', tooltip: 'Thực đơn' },
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
    <aside className="h-screen w-[80px] bg-[#1F1D2B] border-r flex flex-col justify-between items-center py-6">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-8">
        <div className="w-10 h-10 rounded-xl bg-[#312E3F] flex items-center justify-center">
          <Image src={icons.logo} alt="logo" width={20} height={20} />
        </div>

        {/* User avatar */}
        {isLoggedIn && user && (
          <div className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-black">
              {user.fullname?.charAt(0).toUpperCase() || '?'}
            </div>
            <p className="text-xs text-white w-16 truncate text-center">
              {user.fullname}
            </p>
          </div>
        )}

        {/* Menu */}
        <div className="flex flex-col space-y-6 mt-4">
          {navItems.map((item, index) => (
            <SidebarIcon
              key={index}
              href={item.href}
              icon={item.icon}
              tooltip={item.tooltip}
              isActive={pathname === item.href}
            />
          ))}
          {isAdmin && (
            <SidebarIcon
              icon={<ShieldUser size={20} />}
              href="/admin"
              tooltip="Trang quản trị"
              isActive={pathname.startsWith('/admin')}
            />
          )}
        </div>
      </div>

      {/* Logout/Login */}
      <div className="mb-4">
        {isLoggedIn ? (
          <SidebarIcon
            icon={<LogOut size={20} />}
            href="/logout"
            tooltip="Đăng xuất"
            isActive={pathname === '/logout'}
          />
        ) : (
          <SidebarIcon
            icon={<Users size={20} />}
            href="/auth/sign-in"
            tooltip="Đăng nhập"
            isActive={pathname === '/auth/sign-in'}
          />
        )}
      </div>
    </aside>
  );
}

function SidebarIcon({
  icon,
  href,
  tooltip,
  isActive,
}: {
  icon: React.ReactNode;
  href?: string;
  tooltip?: string;
  isActive?: boolean;
}) {
  const IconButton = (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'w-12 h-12 rounded-2xl transition-all duration-200',
        isActive
          ? 'bg-[#ff6b5c] text-white shadow-md'
          : 'bg-transparent text-muted-foreground hover:bg-[#ff6b5c] hover:text-white'
      )}
    >
      {icon}
    </Button>
  );

  const withTooltip = tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{IconButton}</TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    IconButton
  );

  return href ? <Link href={href}>{withTooltip}</Link> : withTooltip;
}

