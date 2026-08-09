'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { TypeBadge, StatusBadge } from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Pencil, Trash2, User, Calendar, RefreshCw } from 'lucide-react';

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
    } finally {
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

  if (loading) return <ProtectedRoute><Spinner className="h-64" /></ProtectedRoute>;
  if (!issue) return <ProtectedRoute><p className="text-center py-20 text-gray-500">Issue not found.</p></ProtectedRoute>;

  const canEdit = isMaintainer || (issue.reporter?.id === user?.id && issue.status === 'open');
  const statuses = ['open', 'in_progress', 'resolved'];

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back */}
        <Link href="/issues" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Issues
        </Link>

        {/* Main Card */}
        <div className="card p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <TypeBadge type={issue.type} />
                <StatusBadge status={issue.status} />
                <span className="text-xs text-gray-400">#{issue.id}</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-snug">{issue.title}</h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {canEdit && (
                <Link href={`/issues/${issue.id}/edit`} className="btn-secondary flex items-center gap-2 text-sm">
                  <Pencil className="w-4 h-4" /> Edit
                </Link>
              )}
              {isMaintainer && (
                <button onClick={() => setShowDelete(true)} className="btn-danger flex items-center gap-2 text-sm">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{issue.description}</p>

          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{issue.reporter?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{issue.reporter?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{new Date(issue.created_at).toLocaleDateString()}</p>
                <p className="text-xs text-gray-400">Created</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <RefreshCw className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{new Date(issue.updated_at).toLocaleDateString()}</p>
                <p className="text-xs text-gray-400">Last updated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Change — maintainer only */}
        {isMaintainer && (
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Change Status</h2>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={issue.status === s || statusLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    issue.status === s
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDelete}
        title="Delete Issue"
        message="Are you sure you want to permanently delete this issue? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleteLoading}
      />
    </ProtectedRoute>
  );
}
