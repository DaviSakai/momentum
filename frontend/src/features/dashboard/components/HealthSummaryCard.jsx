'use client';

import EmptyStateCard from './EmptyStateCard';
import CardSkeleton from './CardSkeleton';
import './dashboard-components.css';

/**
 * Health summary card — shows check-in data or empty state.
 */
export default function HealthSummaryCard({ data, isLoading, error, onRetry }) {
  if (isLoading) return <CardSkeleton lines={4} />;

  if (error) {
    return (
      <article className="card dashboard-card error-card">
        <div className="error-card-icon">⚠️</div>
        <h3>Check-in Diário</h3>
        <p className="error-card-message">Não foi possível carregar</p>
        <button className="error-card-retry" onClick={onRetry}>Tentar novamente</button>
      </article>
    );
  }

  if (!data) {
    return (
      <EmptyStateCard
        icon="💚"
        title="Check-in Diário"
        message="Registre como você está hoje — sono, humor, energia e foco."
        ctaText="Fazer check-in"
        ctaHref="/checkin"
      />
    );
  }

  const moodLabels = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

  return (
    <article className="card dashboard-card">
      <div className="summary-card-header">
        <span className="summary-card-icon">💚</span>
        <h3 className="summary-card-title">Check-in de Hoje</h3>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Humor</span>
        <span className="summary-stat-value">{moodLabels[data.mood] || data.mood}</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Energia</span>
        <span className="summary-stat-value">{data.energy}/5</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Foco</span>
        <span className="summary-stat-value">{data.focus}/5</span>
      </div>
      <div className="summary-stat-row">
        <span className="summary-stat-label">Sono</span>
        <span className="summary-stat-value">{data.sleep_hours}h</span>
      </div>
    </article>
  );
}
