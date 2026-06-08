'use client';

import EmptyStateCard from './EmptyStateCard';
import CardSkeleton from './CardSkeleton';
import './dashboard-components.css';

/**
 * Productivity card — shows daily score or empty state.
 */
export default function ProductivityCard({ data, isLoading, error, onRetry }) {
  if (isLoading) return <CardSkeleton lines={2} />;

  if (error) {
    return (
      <article className="card dashboard-card error-card">
        <div className="error-card-icon">⚠️</div>
        <h3>Produtividade</h3>
        <p className="error-card-message">Não foi possível carregar</p>
        <button className="error-card-retry" onClick={onRetry}>Tentar novamente</button>
      </article>
    );
  }

  if (!data) {
    return (
      <EmptyStateCard
        icon="📊"
        title="Produtividade"
        message="Faça um check-in diário para visualizar seu score de produtividade."
        ctaText="Fazer check-in"
        ctaHref="/checkin"
      />
    );
  }

  return (
    <article className="card dashboard-card">
      <div className="summary-card-header">
        <span className="summary-card-icon">📊</span>
        <h3 className="summary-card-title">Produtividade</h3>
      </div>
      <div className="summary-highlight">{data.score}%</div>
      <p className="summary-highlight-label">{data.label}</p>
    </article>
  );
}
