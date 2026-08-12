'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Issue } from '@/types';
import { TypeBadge, StatusBadge } from '@/components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { Bug, Sparkles, CheckCircle, Clock, AlertCircle, TrendingUp, ArrowRight, PlusCircle } from 'lucide-react';

const COLORS = { open: '#f59e0b', in_progress: '#a855f7', resolved: '#10b981', bug: '#ef4444', feature_request: '#3b82f6' };

function SkeletonCard() {
  return <div className="card p-5"><div className="skeleton h-8 w-16 mb-3" /><div className="skeleton h-5 w-24" /></div>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/issues').then(({ data }) => setIssues(data.data)).finally(() => setLoading(false));
  }, []);

  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'open').length,
    in_progress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    bugs: issues.filter(i => i.type === 'bug').length,
    features: issues.filter(i => i.type === 'feature_request').length,
  };

  const statusData = [
    { name: 'Open', value: stats.open, color: COLORS.open },
    { name: 'In Progress', value: stats.in_progress, color: COLORS.in_progress },
    { name: 'Resolved', value: stats.resolved, color: COLORS.resolved },
  ];

  const typeData = [
    { name: 'Bugs', value: stats.bugs, color: COLORS.bug },
    { name: 'Features', value: stats.features, color: COLORS.feature_request },
  ];

  // Simulated trend data from real issues by grouping dates
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const dayIssues = issues.filter(issue => new Date(issue.created_at).toDateString() === d.toDateString());
    return { name: label, issues: dayIssues.length };
  });

  const statCards = [
    { label: 'Total Issues', value: stats.total, icon: TrendingUp, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Open', value: stats.open, icon: AlertCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'In Progress', value: stats.in_progress, icon: Clock, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Bugs', value: stats.bugs, icon: Bug, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Features', value: stats.features, icon: Sparkles, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  ];

  const recentIssues = [...issues].slice(0, 8);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Good morning, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here's what's happening with your issues today.</p>
        </div>
        <Link href="/issues/create" className="btn-primary btn-sm hidden sm:inline-flex">
          <PlusCircle className="w-4 h-4" /> New Issue
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />) :
          statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card p-4 hover:shadow-md transition-shadow">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{label}</p>
            </div>
          ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Issues by Status</h2>
          <p className="text-xs text-slate-400 mb-4">Current distribution across all statuses</p>
          {loading ? <div className="skeleton h-48" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData} barSize={44}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart */}
        <div className="card p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Issue Types</h2>
          <p className="text-xs text-slate-400 mb-4">Bugs vs feature requests</p>
          {loading ? <div className="skeleton h-48" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={52} outerRadius={75} dataKey="value" paddingAngle={4}>
                  {typeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Line chart */}
      <div className="card p-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Issues This Week</h2>
        <p className="text-xs text-slate-400 mb-4">Daily issue creation over the past 7 days</p>
        {loading ? <div className="skeleton h-40" /> : (
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="issues" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent Issues Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Issues</h2>
            <p className="text-xs text-slate-400 mt-0.5">Latest {recentIssues.length} issues</p>
          </div>
          <Link href="/issues" className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-10" />)}</div>
          ) : recentIssues.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Bug className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No issues yet.</p>
              <Link href="/issues/create" className="btn-primary btn-sm mt-4 inline-flex">Create your first issue</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                  {['Title', 'Type', 'Status', 'Reporter', 'Date'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link href={`/issues/${issue.id}`} className="text-sm font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-1 max-w-xs">
                        {issue.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5"><TypeBadge type={issue.type} /></td>
                    <td className="px-5 py-3.5"><StatusBadge status={issue.status} /></td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400">{issue.reporter?.name}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{new Date(issue.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
