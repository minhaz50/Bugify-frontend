'use client';
import { useState } from 'react';
import { Issue } from '@/types';
import { AlertCircle } from 'lucide-react';

interface IssueFormProps {
  initial?: Partial<Issue>;
  onSubmit: (data: { title: string; description: string; type: string }) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

export default function IssueForm({ initial, onSubmit, loading, submitLabel }: IssueFormProps) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    type: initial?.type || 'bug',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.length > 150) e.title = 'Title must not exceed 150 characters';
    if (!form.description.trim()) e.description = 'Description is required';
    else if (form.description.length < 20) e.description = 'Description must be at least 20 characters';
    if (!form.type) e.type = 'Type is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Type selector */}
      <div>
        <label className="label">Issue Type <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-3">
          {(['bug', 'feature_request'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setForm({ ...form, type: t })}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                form.type === t
                  ? t === 'bug'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
              }`}>
              <span className="text-lg">{t === 'bug' ? '🐛' : '✨'}</span>
              {t === 'bug' ? 'Bug Report' : 'Feature Request'}
            </button>
          ))}
        </div>
        {errors.type && <p className="error-msg mt-1"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.type}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="label" htmlFor="issue-title">Title <span className="text-red-500">*</span></label>
        <input id="issue-title" type="text" className={`input ${errors.title ? 'input-error' : ''}`}
          placeholder="Short descriptive headline..." maxLength={150}
          value={form.title} onChange={e => { setForm({ ...form, title: e.target.value }); setErrors({ ...errors, title: '' }); }} />
        <div className="flex justify-between mt-1">
          {errors.title ? <p className="error-msg"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.title}</p> : <span />}
          <p className={`text-xs ${form.title.length > 140 ? 'text-amber-500' : 'text-slate-400'}`}>{form.title.length}/150</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label" htmlFor="issue-desc">Description <span className="text-red-500">*</span></label>
        <textarea id="issue-desc" className={`input resize-none h-40 ${errors.description ? 'input-error' : ''}`}
          placeholder="Detailed explanation of the problem or suggestion. Include steps to reproduce for bugs (minimum 20 characters)..."
          value={form.description} onChange={e => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: '' }); }} />
        <div className="flex justify-between mt-1">
          {errors.description ? <p className="error-msg"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.description}</p> : <span />}
          <p className={`text-xs ${form.description.length < 20 && form.description.length > 0 ? 'text-amber-500' : 'text-slate-400'}`}>{form.description.length} chars</p>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={() => window.history.back()} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary px-8" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : submitLabel}
        </button>
      </div>
    </form>
  );
}
