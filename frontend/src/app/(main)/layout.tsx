// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { FoodSidebar } from '@/components/food-sidebar'; // đảm bảo đúng path

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Efood',
  description: 'Ứng dụng quản lý thực đơn quán ăn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className , 'bg-background text-foreground')}>
        <div className="flex">
          {/* Sidebar cố định */}
          <div className="fixed top-0 left-0 h-screen w-[80px] z-50">
            <FoodSidebar />
          </div>

          {/* Nội dung chính với margin-left để tránh đè lên sidebar */}
          <main className="ml-[80px] w-full overflow-y-auto h-screen bg-[#393C49] scroll-smooth">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

