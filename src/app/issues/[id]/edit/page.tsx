'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Issue } from '@/types';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import IssueForm from '@/components/issues/IssueForm';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

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
        const issue = data.data;
        const canEdit = isMaintainer || (issue.reporter?.id === user?.id && issue.status === 'open');
        if (!canEdit) {
          toast.error('You are not allowed to edit this issue');
          router.push(`/issues/${id}`);
          return;
        }
        setIssue(issue);
      })
      .catch(() => {
        toast.error('Issue not found');
        router.push('/issues');
      })
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
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href={`/issues/${id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Issue
        </Link>

        {loading ? (
          <Spinner className="h-64" />
        ) : issue ? (
          <div className="card p-8">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900">Edit Issue</h1>
              <p className="text-gray-500 text-sm mt-1 truncate">#{issue.id} — {issue.title}</p>
            </div>
            <IssueForm initial={issue} onSubmit={handleSubmit} loading={submitting} submitLabel="Save Changes" />
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}
