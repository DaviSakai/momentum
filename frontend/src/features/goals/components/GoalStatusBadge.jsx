'use client';

import './goals-components.css';

const statusConfig = {
  active: { label: 'Ativa', icon: '🟢', className: 'goal-status-active' },
  completed: { label: 'Concluída', icon: '✅', className: 'goal-status-completed' },
  paused: { label: 'Pausada', icon: '⏸️', className: 'goal-status-paused' },
};

/**
 * Visual status badge with color + text (not color alone).
 */
export default function GoalStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.active;

  return (
    <span className={`goal-status-badge ${config.className}`}>
      {config.icon} {config.label}
    </span>
  );
}
