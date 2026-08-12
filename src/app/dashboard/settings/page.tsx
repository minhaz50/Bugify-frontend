'use client';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { Sun, Moon, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({ email: true, browser: false, digest: true });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Settings saved');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your preferences and account settings.</p>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div><h2 className="font-bold text-slate-900 dark:text-white">Appearance</h2>
          <p className="text-xs text-slate-400">Choose your preferred theme</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(['light', 'dark'] as const).map((t) => (
            <button key={t} onClick={() => theme !== t && toggleTheme()}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === t ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
              {t === 'light' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">{t}</p>
                <p className="text-xs text-slate-400">{t === 'light' ? 'Bright & clean' : 'Easy on eyes'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div><h2 className="font-bold text-slate-900 dark:text-white">Notifications</h2>
          <p className="text-xs text-slate-400">Control how you receive updates</p></div>
        </div>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', desc: 'Get notified about issue updates via email' },
            { key: 'browser', label: 'Browser notifications', desc: 'Receive real-time browser push notifications' },
            { key: 'digest', label: 'Weekly digest', desc: 'A weekly summary of team activity' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <button onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div><h2 className="font-bold text-slate-900 dark:text-white">Security</h2>
          <p className="text-xs text-slate-400">Manage your account security</p></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div><p className="text-sm font-medium text-slate-900 dark:text-white">Password</p>
            <p className="text-xs text-slate-400">Last changed: never</p></div>
            <button className="btn-secondary btn-sm" onClick={() => toast('Password change coming soon!')}>Change</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div><p className="text-sm font-medium text-slate-900 dark:text-white">Two-factor authentication</p>
            <p className="text-xs text-slate-400">Add an extra layer of security</p></div>
            <button className="btn-secondary btn-sm" onClick={() => toast('2FA coming soon!')}>Enable</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary" disabled={saving}>
          {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
