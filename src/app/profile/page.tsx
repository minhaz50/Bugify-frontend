'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Navbar from '@/components/layout/Navbar';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  const infoItems = [
    { label: 'Full Name', value: user?.name, icon: User },
    { label: 'Email Address', value: user?.email, icon: Mail },
    { label: 'Role', value: user?.role, icon: Shield },
    {
      label: 'Member Since',
      value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-',
      icon: Calendar,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-500 mt-1">Your account information</p>
            </div>

            {/* Avatar + Name */}
            <div className="card p-6 flex items-center gap-5">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-brand-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  user?.role === 'maintainer' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {user?.role === 'maintainer' ? '🔧 Maintainer' : '👤 Contributor'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="card divide-y divide-gray-100">
              {infoItems.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 p-5">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Role Permissions */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Permissions</h3>
              <div className="space-y-2">
                {[
                  { label: 'View all issues', allowed: true },
                  { label: 'Create new issues', allowed: true },
                  { label: 'Edit own open issues', allowed: true },
                  { label: 'Edit any issue', allowed: user?.role === 'maintainer' },
                  { label: 'Delete any issue', allowed: user?.role === 'maintainer' },
                  { label: 'Change issue status', allowed: user?.role === 'maintainer' },
                ].map(({ label, allowed }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      allowed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {allowed ? '✓' : '✗'}
                    </span>
                    <span className={allowed ? 'text-gray-900' : 'text-gray-400'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
