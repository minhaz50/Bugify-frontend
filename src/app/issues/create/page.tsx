'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import IssueForm from '@/components/issues/IssueForm';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function CreateIssuePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form: { title: string; description: string; type: string }) => {
    setLoading(true);
    try {
      await api.post('/issues', form);
      toast.success('Issue created successfully!');
      router.push('/issues');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/issues" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Issues
        </Link>

        <div className="card p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Create New Issue</h1>
            <p className="text-gray-500 text-sm mt-1">Report a bug or request a new feature.</p>
          </div>
          <IssueForm onSubmit={handleSubmit} loading={loading} submitLabel="Create Issue" />
        </div>
      </div>
    </ProtectedRoute>
  );
}
