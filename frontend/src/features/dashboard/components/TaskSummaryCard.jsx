'use client';

import EmptyStateCard from './EmptyStateCard';
import CardSkeleton from './CardSkeleton';
import './dashboard-components.css';

/**
 * Task summary card — shows task counts by status or empty state.
 */
export default function TaskSummaryCard({ data, isLoading, error, onRetry }) {
  if (isLoading) return <CardSkeleton lines={3} />;

  if (error) {
    return (
      <article className="card dashboard-card error-card">
        <div className="error-card-icon">⚠️</div>
        <h3>Tarefas</h3>
        <p className="error-card-message">Não foi possível carregar</p>
        <button className="error-card-retry" onClick={onRetry}>Tentar novamente</button>
      </article>
    );
  }

  if (!data || data.total === 0) {
    return (
      <EmptyStateCard
        icon="📋"
        title="Tarefas"
        message="Organize seu dia com um quadro Kanban simples e visual."
        ctaText="Criar primeira tarefa"
        ctaHref="/tasks"
      />
    );
  }

  return (
    <article className="card dashboard-card">
      <div className="summary-card-header">
        <span className="summary-card-icon">📋</span>
        <h3 className="summary-card-title">Tarefas</h3>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">A fazer</span>
        <span className="summary-stat-value">{data.todo}</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Em progresso</span>
        <span className="summary-stat-value">{data.in_progress}</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Concluídas</span>
        <span className="summary-stat-value">{data.done}</span>
      </div>
    </article>
  );
}
