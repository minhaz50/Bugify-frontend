'use client';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/issues': 'Issues',
  '/issues/create': 'New Issue',
};

export default function IssuesLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = titles[pathname] || (pathname.includes('/edit') ? 'Edit Issue' : 'Issue Detail');

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="hidden lg:flex flex-shrink-0"><Sidebar /></div>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10"><Sidebar onClose={() => setSidebarOpen(false)} /></div>
          </div>
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} title={title} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
