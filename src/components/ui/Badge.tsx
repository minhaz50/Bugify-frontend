import { IssueStatus, IssueType } from '@/types';

export function TypeBadge({ type }: { type: IssueType }) {
  return (
    <span className={type === 'bug' ? 'badge-bug' : 'badge-feature'}>
      {type === 'bug' ? '🐛 Bug' : '✨ Feature'}
    </span>
  );
}

export function StatusBadge({ status }: { status: IssueStatus }) {
  const map: Record<IssueStatus, { label: string; cls: string }> = {
    open:        { label: '🟡 Open',        cls: 'badge-open' },
    in_progress: { label: '🟣 In Progress', cls: 'badge-in_progress' },
    resolved:    { label: '🟢 Resolved',    cls: 'badge-resolved' },
  };
  const { label, cls } = map[status];
  return <span className={cls}>{label}</span>;
}
