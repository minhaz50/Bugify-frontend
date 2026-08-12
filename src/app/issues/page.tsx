'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import { TypeBadge, StatusBadge } from '@/components/ui/Badge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { PlusCircle, Search, Trash2, Pencil, Eye, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-5 py-4"><div className="skeleton h-4 w-full max-w-[120px]" /></td>
      ))}
    </tr>
  );
}

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
  const [page, setPage] = useState(1);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort });
      if (filterType) params.set('type', filterType);
      if (filterStatus) params.set('status', filterStatus);
      const { data } = await api.get(`/issues?${params}`);
      setIssues(data.data);
      setPage(1);
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

  const filtered = issues.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase()) ||
    i.reporter?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Issues</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {loading ? 'Loading...' : `${filtered.length} issue${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <Link href="/issues/create" className="btn-primary">
          <PlusCircle className="w-4 h-4" /> New Issue
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input pl-9" placeholder="Search by title, description, or reporter..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select className="input w-auto text-sm" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
            </select>
            <select className="input w-auto text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select className="input w-auto text-sm" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                {['#', 'Title', 'Type', 'Status', 'Reporter', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-slate-400">
                    <p className="text-lg mb-2">No issues found</p>
                    <Link href="/issues/create" className="btn-primary btn-sm inline-flex mt-2">
                      <PlusCircle className="w-4 h-4" /> Create first issue
                    </Link>
                  </td>
                </tr>
              ) : paginated.map((issue) => {
                const canEdit = isMaintainer || (issue.reporter?.id === user?.id && issue.status === 'open');
                return (
                  <tr key={issue.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-4 text-xs text-slate-400 font-mono">#{issue.id}</td>
                    <td className="px-5 py-4 max-w-xs">
                      <Link href={`/issues/${issue.id}`} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-1 transition-colors">
                        {issue.title}
                      </Link>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap"><TypeBadge type={issue.type} /></td>
                    <td className="px-5 py-4 whitespace-nowrap"><StatusBadge status={issue.status} /></td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm text-slate-900 dark:text-white font-medium">{issue.reporter?.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{issue.reporter?.role}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link href={`/issues/${issue.id}`}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        {canEdit && (
                          <Link href={`/issues/${issue.id}/edit`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                        )}
                        {isMaintainer && (
                          <button onClick={() => setDeleteId(issue.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
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

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary btn-sm disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary btn-sm disabled:opacity-40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal isOpen={!!deleteId} title="Delete Issue"
        message="Are you sure you want to permanently delete this issue? This cannot be undone."
        onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleteLoading} />
    </div>
  );
}
