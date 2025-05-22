'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Trang số liệu', href: '/admin' },
  { name: 'Người dùng', href: '/admin/users' },
  { name: 'Vai Trò', href: '/admin/roles' },
  { name: 'Phân Quyền', href: '/admin/permissions' },
];

export default function BreadcrumbTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex space-x-6 text-sm font-medium border-b border-gray-600">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <button
            key={tab.href}
            onClick={() => router.push(tab.href)}
            className={cn(
              'relative pb-2 transition-colors duration-200',
              isActive ? 'text-[#ff6b5c]' : 'text-white hover:text-[#ff6b5c]'
            )}
          >
            {tab.name}
            {isActive && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#ff6b5c] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
