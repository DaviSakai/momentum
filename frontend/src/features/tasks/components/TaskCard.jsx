'use client';

import PriorityBadge from './PriorityBadge';
import DueDateIndicator from './DueDateIndicator';
import './tasks-components.css';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-card" tabIndex={0}>
      <h4 className="task-card-title">{task.title}</h4>

      <div className="task-card-meta">
        <PriorityBadge priority={task.priority} />
        <DueDateIndicator dueDate={task.due_date} status={task.status} />
        {task.category && <span className="task-category-tag">{task.category}</span>}
      </div>

      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-actions">
        {task.status === 'todo' && (
          <button className="btn btn-secondary" onClick={() => onStatusChange(task.id, 'in_progress')}>
            ▶️ Iniciar
          </button>
        )}
        {task.status === 'in_progress' && (
          <>
            <button className="btn btn-secondary" onClick={() => onStatusChange(task.id, 'done')}>
              ✅ Concluir
            </button>
            <button className="btn btn-secondary" onClick={() => onStatusChange(task.id, 'todo')}>
              ↩️ Voltar
            </button>
          </>
        )}
        {task.status === 'done' && (
          <button className="btn btn-secondary" onClick={() => onStatusChange(task.id, 'todo')}>
            🔄 Reabrir
          </button>
        )}
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>✏️</button>
        <button className="btn btn-secondary" style={{ color: 'var(--color-error)' }} onClick={() => onDelete(task)}>🗑️</button>
      </div>
    </div>
  );
}
