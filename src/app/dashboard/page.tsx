'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Issue } from '@/types';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Bug, Sparkles, CheckCircle, Clock, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';

const COLORS = {
  open: '#EAB308',
  in_progress: '#A855F7',
  resolved: '#22C55E',
  bug: '#EF4444',
  feature_request: '#3B82F6',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/issues').then(({ data }) => {
      setIssues(data.data);
    }).finally(() => setLoading(false));
  }, []);

  const stats = {
    total: issues.length,
    open: issues.filter((i) => i.status === 'open').length,
    in_progress: issues.filter((i) => i.status === 'in_progress').length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
    bugs: issues.filter((i) => i.type === 'bug').length,
    features: issues.filter((i) => i.type === 'feature_request').length,
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

  const barData = [
    { name: 'Open', count: stats.open, fill: COLORS.open },
    { name: 'In Progress', count: stats.in_progress, fill: COLORS.in_progress },
    { name: 'Resolved', count: stats.resolved, fill: COLORS.resolved },
  ];

  const recentIssues = [...issues].slice(0, 5);

  const statCards = [
    { label: 'Total Issues', value: stats.total, icon: TrendingUp, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Open', value: stats.open, icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'In Progress', value: stats.in_progress, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Bugs', value: stats.bugs, icon: Bug, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Features', value: stats.features, icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <ProtectedRoute>
      {loading ? (
        <Spinner className="h-64" />
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your issues today.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card p-4">
                <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="card p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Issues by Status</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="card p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Issue Types</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                    {typeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={10} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="card">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Recent Issues</h2>
              <Link href="/issues" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentIssues.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No issues yet.</p>
              ) : recentIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      issue.status === 'open' ? 'bg-yellow-400' :
                      issue.status === 'in_progress' ? 'bg-purple-500' : 'bg-green-500'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                      <p className="text-xs text-gray-500">by {issue.reporter?.name}</p>
                    </div>
                  </div>
                  <span className={`ml-4 text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                    issue.type === 'bug' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {issue.type === 'bug' ? 'Bug' : 'Feature'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
