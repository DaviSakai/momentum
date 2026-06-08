'use client';

import './tasks-components.css';

const config = {
  low: { label: 'Baixa', className: 'priority-low' },
  medium: { label: 'Média', className: 'priority-medium' },
  high: { label: 'Alta', className: 'priority-high' },
};

export default function PriorityBadge({ priority }) {
  const c = config[priority] || config.medium;
  return <span className={`priority-badge ${c.className}`}>{c.label}</span>;
}
