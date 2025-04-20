'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SidebarItem({
  href,
  icon,
  tooltip,
}: {
  href: string;
  icon: React.ReactNode;
  tooltip?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="group relative flex justify-center">
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm',
          isActive
            ? 'bg-[#ff6b5c] text-white shadow-[inset_-4px_0px_4px_rgba(0,0,0,0.2)]'
            : ' text-muted-foreground hover:bg-[#ff6b5c] hover:text-white'
        )}
      >
        {icon}
      </div>
    </Link>
  );
}




