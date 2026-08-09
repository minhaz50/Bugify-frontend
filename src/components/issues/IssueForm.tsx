'use client';

import { useState } from 'react';
import { Issue } from '@/types';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`input ${errors.title ? 'border-red-400 focus:ring-red-400' : ''}`}
          placeholder="Short descriptive headline..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          maxLength={150}
        />
        <div className="flex justify-between mt-1">
          {errors.title ? (
            <p className="text-xs text-red-500">{errors.title}</p>
          ) : <span />}
          <p className="text-xs text-gray-400">{form.title.length}/150</p>
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          {(['bug', 'feature_request'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm({ ...form, type: t })}
              className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                form.type === t
                  ? t === 'bug'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {t === 'bug' ? '🐛 Bug' : '✨ Feature Request'}
            </button>
          ))}
        </div>
        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`input resize-none h-36 ${errors.description ? 'border-red-400 focus:ring-red-400' : ''}`}
          placeholder="Detailed explanation of the problem or suggestion (min. 20 characters)..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={() => window.history.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary px-8" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
