// app/(main)/layout.tsx
'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { FoodSidebar } from '@/components/food-sidebar';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        geistSans.variable,
        geistMono.variable,
        'flex min-h-screen antialiased bg-[#393C49]'
      )}
    >
      <SidebarProvider>
        <FoodSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </SidebarProvider>
    </div>
  );
}
