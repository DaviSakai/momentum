'use client';

import './dashboard-components.css';

/**
 * Reusable empty state card with icon, message, and optional CTA.
 */
export default function EmptyStateCard({ icon, title, message, ctaText, ctaHref }) {
  return (
    <article className="card dashboard-card empty-state-card">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="empty-state-message">{message}</p>
      {ctaText && ctaHref && (
        <a href={ctaHref} className="btn btn-accent btn-sm empty-state-cta">
          {ctaText}
        </a>
      )}
    </article>
  );
}
