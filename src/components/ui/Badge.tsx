import clsx from 'clsx';
import { IssueStatus, IssueType } from '@/types';

export function TypeBadge({ type }: { type: IssueType }) {
  return (
    <span className={clsx(type === 'bug' ? 'badge-bug' : 'badge-feature')}>
      {type === 'bug' ? '🐛 Bug' : '✨ Feature Request'}
    </span>
  );
}

export function StatusBadge({ status }: { status: IssueStatus }) {
  const labels: Record<IssueStatus, string> = {
    open: '🟡 Open',
    in_progress: '🟣 In Progress',
    resolved: '🟢 Resolved',
  };
  return (
    <span className={clsx(`badge-${status}`)}>
      {labels[status]}
    </span>
  );
}
