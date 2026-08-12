'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Zap, LayoutDashboard, Bug, PlusCircle, User, Settings, LogOut, X, Shield, BarChart3 } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const contributorLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/issues', label: 'All Issues', icon: Bug },
  { href: '/issues/create', label: 'New Issue', icon: PlusCircle },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const maintainerLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/issues', label: 'All Issues', icon: Bug },
  { href: '/issues/create', label: 'New Issue', icon: PlusCircle },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/users', label: 'Manage Users', icon: Shield },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps { onClose?: () => void; }

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout, isMaintainer } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const links = isMaintainer ? maintainerLinks : contributorLinks;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href) && !(href === '/issues' && pathname.includes('/create'));

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg"><Zap className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">DevPulse</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden btn-ghost p-1"><X className="w-5 h-5" /></button>
        )}
      </div>

      {/* User */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
          <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
            <span className={clsx('text-xs px-1.5 py-0.5 rounded-full font-medium', isMaintainer ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300')}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon, exact }) => (
          <Link key={href} href={href} onClick={onClose}
            className={clsx('sidebar-link', isActive(href, exact) ? 'sidebar-link-active' : 'sidebar-link-inactive')}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button onClick={handleLogout} className="sidebar-link sidebar-link-inactive w-full text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
