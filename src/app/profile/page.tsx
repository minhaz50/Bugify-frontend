'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import toast from 'react-hot-toast';
import { User, Mail, Shield, Calendar, Pencil, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, login, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    if (user && token) {
      login(token, { ...user, name: form.name, email: form.email });
    }
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully');
  };

  const permissions = [
    { label: 'View all issues', allowed: true },
    { label: 'Create new issues', allowed: true },
    { label: 'Edit own open issues', allowed: true },
    { label: 'Edit any issue', allowed: user?.role === 'maintainer' },
    { label: 'Delete any issue', allowed: user?.role === 'maintainer' },
    { label: 'Change issue status', allowed: user?.role === 'maintainer' },
    { label: 'Access analytics', allowed: user?.role === 'maintainer' },
    { label: 'Manage users', allowed: user?.role === 'maintainer' },
  ];

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
          <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} title="My Profile" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">

              {/* Avatar card */}
              <div className="card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-extrabold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{user?.name}</h2>
                    <span className={`badge mt-1 ${user?.role === 'maintainer' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                      {user?.role === 'maintainer' ? '🔧 Maintainer' : '👤 Contributor'}
                    </span>
                  </div>
                </div>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="btn-secondary btn-sm">
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                ) : (
                  <button onClick={() => { setEditing(false); setErrors({}); setForm({ name: user?.name || '', email: user?.email || '' }); }} className="btn-ghost btn-sm">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                )}
              </div>

              {/* Info / Edit form */}
              <div className="card p-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5 uppercase tracking-wider">Account Information</h3>
                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="label" htmlFor="p-name">Full Name</label>
                      <input id="p-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name}
                        onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }} />
                      {errors.name && <p className="error-msg">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="label" htmlFor="p-email">Email Address</label>
                      <input id="p-email" type="email" className={`input ${errors.email ? 'input-error' : ''}`} value={form.email}
                        onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }} />
                      {errors.email && <p className="error-msg">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="label">Role</label>
                      <input className="input bg-slate-50 dark:bg-slate-700 cursor-not-allowed" value={user?.role} disabled />
                      <p className="text-xs text-slate-400 mt-1">Role cannot be changed after registration.</p>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button onClick={handleSave} className="btn-primary" disabled={saving}>
                        {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-700">
                    {[
                      { label: 'Full Name', value: user?.name, icon: User },
                      { label: 'Email Address', value: user?.email, icon: Mail },
                      { label: 'Role', value: user?.role, icon: Shield },
                      { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—', icon: Calendar },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-4 py-4">
                        <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">{label}</p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize mt-0.5">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Permissions */}
              <div className="card p-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5 uppercase tracking-wider">Your Permissions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {permissions.map(({ label, allowed }) => (
                    <div key={label} className={`flex items-center gap-2.5 p-3 rounded-xl text-sm ${allowed ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${allowed ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-600 text-white'}`}>
                        {allowed ? '✓' : '✗'}
                      </span>
                      <span className={allowed ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
