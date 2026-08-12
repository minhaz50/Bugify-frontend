'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import { TypeBadge, StatusBadge } from '@/components/ui/Badge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Pencil, Trash2, User, Calendar, RefreshCw, Clock } from 'lucide-react';

export default function IssueDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isMaintainer } = useAuth();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    api.get(`/issues/${id}`)
      .then(({ data }) => setIssue(data.data))
      .catch(() => toast.error('Issue not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/issues/${id}`);
      toast.success('Issue deleted');
      router.push('/issues');
    } catch {
      toast.error('Failed to delete issue');
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    setStatusLoading(true);
    try {
      const { data } = await api.patch(`/issues/${id}`, { status });
      setIssue(data.data);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="skeleton h-8 w-32" />
      <div className="skeleton h-64" />
      <div className="skeleton h-32" />
    </div>
  );

  if (!issue) return (
    <div className="text-center py-20 text-slate-400">
      <p className="text-lg mb-4">Issue not found</p>
      <Link href="/issues" className="btn-primary btn-sm">Back to Issues</Link>
    </div>
  );

  const canEdit = isMaintainer || (issue.reporter?.id === user?.id && issue.status === 'open');
  const statuses = ['open', 'in_progress', 'resolved'];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/issues" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Issues
      </Link>

      <div className="card p-8">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <TypeBadge type={issue.type} />
              <StatusBadge status={issue.status} />
              <span className="text-xs text-slate-400 font-mono">#{issue.id}</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">{issue.title}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {canEdit && (
              <Link href={`/issues/${issue.id}/edit`} className="btn-secondary btn-sm">
                <Pencil className="w-4 h-4" /> Edit
              </Link>
            )}
            {isMaintainer && (
              <button onClick={() => setShowDelete(true)} className="btn-danger btn-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">{issue.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border-t border-slate-100 dark:border-slate-700 pt-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Reporter</p>
              <p className="font-semibold text-slate-900 dark:text-white">{issue.reporter?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{issue.reporter?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Created</p>
              <p className="font-semibold text-slate-900 dark:text-white">{new Date(issue.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Last Updated</p>
              <p className="font-semibold text-slate-900 dark:text-white">{new Date(issue.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {isMaintainer && (
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Change Status</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => handleStatusChange(s)}
                disabled={issue.status === s || statusLoading}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all disabled:cursor-not-allowed ${
                  issue.status === s
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 disabled:opacity-50'
                }`}>
                {statusLoading && issue.status !== s ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" />
                    {s.replace('_', ' ')}
                  </span>
                ) : s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal isOpen={showDelete} title="Delete Issue"
        message="Are you sure you want to permanently delete this issue? This action cannot be undone."
        onConfirm={handleDelete} onCancel={() => setShowDelete(false)} loading={deleteLoading} />
    </div>
  );
}
