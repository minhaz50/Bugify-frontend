'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Issue } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#a855f7'];

export default function AnalyticsPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/issues').then(({ data }) => setIssues(data.data)).finally(() => setLoading(false));
  }, []);

  const statusData = [
    { name: 'Open', value: issues.filter(i => i.status === 'open').length },
    { name: 'In Progress', value: issues.filter(i => i.status === 'in_progress').length },
    { name: 'Resolved', value: issues.filter(i => i.status === 'resolved').length },
  ];

  const typeData = [
    { name: 'Bugs', value: issues.filter(i => i.type === 'bug').length },
    { name: 'Features', value: issues.filter(i => i.type === 'feature_request').length },
  ];

  const trendData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const label = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const count = issues.filter(issue => new Date(issue.created_at).toDateString() === d.toDateString()).length;
    const resolved = issues.filter(issue => issue.status === 'resolved' && new Date(issue.updated_at).toDateString() === d.toDateString()).length;
    return { name: label, created: count, resolved };
  });

  const reporterData = Object.entries(
    issues.reduce((acc, i) => { const n = i.reporter?.name || 'Unknown'; acc[n] = (acc[n] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name, count }));

  if (loading) return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-64" />)}
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">In-depth data on your team's issue activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-1">Status Breakdown</h2>
          <p className="text-xs text-slate-400 mb-4">All issues grouped by status</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusData} barSize={48}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-1">Type Distribution</h2>
          <p className="text-xs text-slate-400 mb-4">Bugs vs feature requests</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {typeData.map((_, i) => <Cell key={i} fill={['#ef4444', '#3b82f6'][i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-slate-900 dark:text-white mb-1">14-Day Trend</h2>
          <p className="text-xs text-slate-400 mb-4">Issues created vs resolved over the past 2 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="created" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={2} fill="url(#created)" name="Created" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fill="url(#resolved)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-slate-900 dark:text-white mb-1">Top Reporters</h2>
          <p className="text-xs text-slate-400 mb-4">Users with the most reported issues</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reporterData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
