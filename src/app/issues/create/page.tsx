'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import IssueForm from '@/components/issues/IssueForm';
import toast from 'react-hot-toast';
import { ArrowLeft, PlusCircle } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/issues" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Issues
      </Link>
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-700">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">Create New Issue</h1>
            <p className="text-sm text-slate-400">Report a bug or request a new feature</p>
          </div>
        </div>
        <IssueForm onSubmit={handleSubmit} loading={loading} submitLabel="Create Issue" />
      </div>
    </div>
  );
}
