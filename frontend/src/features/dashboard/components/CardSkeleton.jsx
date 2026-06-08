'use client';

import './dashboard-components.css';

/**
 * Animated skeleton loading placeholder for dashboard cards.
 */
export default function CardSkeleton({ lines = 3 }) {
  return (
    <article className="card dashboard-card skeleton-card" aria-busy="true" aria-label="Carregando...">
      <div className="skeleton-icon skeleton-pulse" />
      <div className="skeleton-title skeleton-pulse" />
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="skeleton-line skeleton-pulse"
          style={{ width: `${80 - i * 15}%` }}
        />
      ))}
    </article>
  );
}
