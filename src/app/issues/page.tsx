'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { TypeBadge, StatusBadge } from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { PlusCircle, Search, Trash2, Pencil, Eye, Filter } from 'lucide-react';

export default function IssuesPage() {
  const { isMaintainer, user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sort, setSort] = useState('newest');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort });
      if (filterType) params.set('type', filterType);
      if (filterStatus) params.set('status', filterStatus);
      const { data } = await api.get(`/issues?${params}`);
      setIssues(data.data);
    } catch {
      toast.error('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, [sort, filterType, filterStatus]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/issues/${deleteId}`);
      toast.success('Issue deleted');
      setDeleteId(null);
      fetchIssues();
    } catch {
      toast.error('Failed to delete issue');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = issues.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
            <p className="text-gray-500 mt-1">{filtered.length} issue{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <Link href="/issues/create" className="btn-primary flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            New Issue
          </Link>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="input pl-9"
                placeholder="Search issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <select className="input w-auto" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">All Types</option>
                <option value="bug">Bug</option>
                <option value="feature_request">Feature Request</option>
              </select>
              <select className="input w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select className="input w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues Table */}
        {loading ? (
          <Spinner className="h-64" />
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <p className="text-gray-400 text-lg">No issues found.</p>
            <Link href="/issues/create" className="btn-primary inline-flex items-center gap-2 mt-4">
              <PlusCircle className="w-4 h-4" /> Create your first issue
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Title</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Type</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Reporter</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Created</th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((issue) => {
                    const canEdit = isMaintainer || (issue.reporter?.id === user?.id && issue.status === 'open');
                    return (
                      <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/issues/${issue.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-600 line-clamp-1">
                            {issue.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4"><TypeBadge type={issue.type} /></td>
                        <td className="px-6 py-4"><StatusBadge status={issue.status} /></td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{issue.reporter?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{issue.reporter?.role}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(issue.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/issues/${issue.id}`} className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            {canEdit && (
                              <Link href={`/issues/${issue.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <Pencil className="w-4 h-4" />
                              </Link>
                            )}
                            {isMaintainer && (
                              <button onClick={() => setDeleteId(issue.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Issue"
        message="Are you sure you want to permanently delete this issue? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteLoading}
      />
    </ProtectedRoute>
  );
}
