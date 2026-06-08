'use client';

import './goals-components.css';

const CATEGORIES = ['', 'Health', 'Productivity', 'Study', 'Fitness', 'Career', 'Personal', 'Financial'];
const STATUSES = ['', 'active', 'completed', 'paused'];
const PERIODS = ['', 'weekly', 'monthly', 'annual'];

const statusLabels = { '': 'Todos os status', active: 'Ativas', completed: 'Concluídas', paused: 'Pausadas' };
const periodLabels = { '': 'Todos os períodos', weekly: 'Semanal', monthly: 'Mensal', annual: 'Anual' };
const categoryLabels = { '': 'Todas as categorias' };

/**
 * Filter controls for status, category, and period.
 */
export default function GoalFilters({ filters, onFilterChange }) {
  function handleChange(e) {
    onFilterChange({ ...filters, [e.target.name]: e.target.value || undefined });
  }

  return (
    <div className="goal-filters" role="search" aria-label="Filtrar metas">
      <select
        name="status"
        className="goal-filter-select"
        value={filters.status || ''}
        onChange={handleChange}
        aria-label="Filtrar por status"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{statusLabels[s] || s}</option>
        ))}
      </select>

      <select
        name="category"
        className="goal-filter-select"
        value={filters.category || ''}
        onChange={handleChange}
        aria-label="Filtrar por categoria"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{categoryLabels[c] || c}</option>
        ))}
      </select>

      <select
        name="period"
        className="goal-filter-select"
        value={filters.period || ''}
        onChange={handleChange}
        aria-label="Filtrar por período"
      >
        {PERIODS.map((p) => (
          <option key={p} value={p}>{periodLabels[p] || p}</option>
        ))}
      </select>
    </div>
  );
}
