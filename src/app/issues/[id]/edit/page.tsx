'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import IssueForm from '@/components/issues/IssueForm';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function EditIssuePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isMaintainer } = useAuth();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/issues/${id}`)
      .then(({ data }) => {
        const iss = data.data;
        const canEdit = isMaintainer || (iss.reporter?.id === user?.id && iss.status === 'open');
        if (!canEdit) {
          toast.error('You are not allowed to edit this issue');
          router.push(`/issues/${id}`);
          return;
        }
        setIssue(iss);
      })
      .catch(() => { toast.error('Issue not found'); router.push('/issues'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form: { title: string; description: string; type: string }) => {
    setSubmitting(true);
    try {
      await api.patch(`/issues/${id}`, form);
      toast.success('Issue updated successfully!');
      router.push(`/issues/${id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update issue');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href={`/issues/${id}`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Issue
      </Link>

      {loading ? (
        <div className="space-y-4">
          <div className="skeleton h-64" />
          <div className="skeleton h-40" />
        </div>
      ) : issue ? (
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">Edit Issue</h1>
              <p className="text-sm text-slate-400 truncate max-w-xs">#{issue.id} — {issue.title}</p>
            </div>
          </div>
          <IssueForm initial={issue} onSubmit={handleSubmit} loading={submitting} submitLabel="Save Changes" />
        </div>
      ) : null}
    </div>
  );
}
