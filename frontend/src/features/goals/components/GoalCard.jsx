'use client';

import { useState } from 'react';
import GoalProgressBar from './GoalProgressBar';
import GoalStatusBadge from './GoalStatusBadge';
import './goals-components.css';

const periodLabels = { weekly: 'Semanal', monthly: 'Mensal', annual: 'Anual' };

/**
 * Goal card with title, meta, progress, and action buttons.
 */
export default function GoalCard({ goal, onEdit, onDelete, onProgressUpdate, onStatusChange }) {
  const [progress, setProgress] = useState(goal.progress);
  const [isSaving, setIsSaving] = useState(false);

  async function handleProgressSave() {
    if (progress === goal.progress) return;
    setIsSaving(true);
    try {
      await onProgressUpdate(goal.id, progress);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(newStatus) {
    await onStatusChange(goal.id, newStatus);
  }

  return (
    <article className="card goal-card">
      <div className="goal-card-header">
        <h3 className="goal-card-title">{goal.title}</h3>
        <GoalStatusBadge status={goal.status} />
      </div>

      <div className="goal-card-meta">
        <span className="goal-card-category">{goal.category}</span>
        <span className="goal-card-period">{periodLabels[goal.period] || goal.period}</span>
        {goal.target_date && <span>📅 {goal.target_date}</span>}
      </div>

      {goal.description && (
        <p className="goal-card-description">{goal.description}</p>
      )}

      <GoalProgressBar progress={goal.progress} />

      {goal.status === 'active' && (
        <div className="goal-progress-control">
          <input
            type="range"
            className="goal-progress-slider"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            aria-label="Atualizar progresso"
          />
          <span className="goal-progress-value">{progress}%</span>
          {progress !== goal.progress && (
            <button
              className="btn btn-accent btn-sm"
              style={{ fontSize: 'var(--text-xs)', minHeight: 28, padding: '2px 10px' }}
              onClick={handleProgressSave}
              disabled={isSaving}
            >
              {isSaving ? '...' : 'Salvar'}
            </button>
          )}
        </div>
      )}

      <div className="goal-card-actions">
        {goal.status === 'active' && (
          <button className="btn btn-secondary" onClick={() => handleStatusChange('completed')}>
            ✅ Concluir
          </button>
        )}
        {goal.status === 'active' && (
          <button className="btn btn-secondary" onClick={() => handleStatusChange('paused')}>
            ⏸️ Pausar
          </button>
        )}
        {goal.status === 'paused' && (
          <button className="btn btn-secondary" onClick={() => handleStatusChange('active')}>
            ▶️ Reativar
          </button>
        )}
        {goal.status === 'completed' && (
          <button className="btn btn-secondary" onClick={() => handleStatusChange('active')}>
            🔄 Reabrir
          </button>
        )}
        <button className="btn btn-secondary" onClick={() => onEdit(goal)}>
          ✏️ Editar
        </button>
        <button className="btn btn-secondary" style={{ color: 'var(--color-error)' }} onClick={() => onDelete(goal)}>
          🗑️ Excluir
        </button>
      </div>
    </article>
  );
}
