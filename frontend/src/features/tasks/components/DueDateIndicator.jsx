'use client';

import './tasks-components.css';

export default function DueDateIndicator({ dueDate, status }) {
  if (!dueDate) return null;

  const today = new Date().toISOString().split('T')[0];
  const isOverdue = dueDate < today && status !== 'done';

  const formatted = formatDate(dueDate);

  return (
    <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
      📅 {formatted}{isOverdue ? ' (atrasada)' : ''}
    </span>
  );
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}
