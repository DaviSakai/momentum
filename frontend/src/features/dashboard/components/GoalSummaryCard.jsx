'use client';

import EmptyStateCard from './EmptyStateCard';
import CardSkeleton from './CardSkeleton';
import './dashboard-components.css';

/**
 * Goal summary card — shows active goals progress or empty state.
 */
export default function GoalSummaryCard({ data, isLoading, error, onRetry }) {
  if (isLoading) return <CardSkeleton lines={3} />;

  if (error) {
    return (
      <article className="card dashboard-card error-card">
        <div className="error-card-icon">⚠️</div>
        <h3>Metas</h3>
        <p className="error-card-message">Não foi possível carregar</p>
        <button className="error-card-retry" onClick={onRetry}>Tentar novamente</button>
      </article>
    );
  }

  if (!data || data.total === 0) {
    return (
      <EmptyStateCard
        icon="🎯"
        title="Metas"
        message="Defina objetivos claros e acompanhe seu progresso ao longo do tempo."
        ctaText="Definir primeira meta"
        ctaHref="/goals"
      />
    );
  }

  return (
    <article className="card dashboard-card">
      <div className="summary-card-header">
        <span className="summary-card-icon">🎯</span>
        <h3 className="summary-card-title">Metas</h3>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Ativas</span>
        <span className="summary-stat-value">{data.active}</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Concluídas</span>
        <span className="summary-stat-value">{data.completed}</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Total</span>
        <span className="summary-stat-value">{data.total}</span>
      </div>
    </article>
  );
}
