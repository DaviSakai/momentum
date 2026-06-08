'use client';

import './checkin-components.css';

const moodEmojis = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

/**
 * Single check-in history entry in compact format.
 */
export default function CheckInHistoryItem({ checkin }) {
  const dateFormatted = formatDateBR(checkin.date);

  return (
    <article className="card checkin-history-item">
      <span className="checkin-history-date">{dateFormatted}</span>
      <div className="checkin-history-metrics">
        {checkin.mood != null && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-label">Humor</span>
            <span className="checkin-history-metric-value">{moodEmojis[checkin.mood] || checkin.mood}</span>
          </div>
        )}
        {checkin.energy != null && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-label">Energia</span>
            <span className="checkin-history-metric-value">{checkin.energy}/5</span>
          </div>
        )}
        {checkin.focus != null && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-label">Foco</span>
            <span className="checkin-history-metric-value">{checkin.focus}/5</span>
          </div>
        )}
        {checkin.sleep_hours != null && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-label">Sono</span>
            <span className="checkin-history-metric-value">{checkin.sleep_hours}h</span>
          </div>
        )}
        {checkin.productivity_score != null && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-label">Produtividade</span>
            <span className="checkin-history-metric-value">{checkin.productivity_score}/10</span>
          </div>
        )}
        {checkin.training_done === 1 && (
          <div className="checkin-history-metric">
            <span className="checkin-history-metric-value">🏋️ Treinou</span>
          </div>
        )}
      </div>
      {checkin.notes && (
        <p className="checkin-history-notes">"{checkin.notes}"</p>
      )}
    </article>
  );
}

function formatDateBR(dateStr) {
  try {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  } catch {
    return dateStr;
  }
}
