'use client';

import './tasks-components.css';

export default function TaskFilters({ filters, onFilterChange }) {
  function handleChange(e) {
    onFilterChange({ ...filters, [e.target.name]: e.target.value || undefined });
  }

  return (
    <div className="task-filters" role="search" aria-label="Filtrar tarefas">
      <select
        name="priority"
        className="task-filter-select"
        value={filters.priority || ''}
        onChange={handleChange}
        aria-label="Filtrar por prioridade"
      >
        <option value="">Todas prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Média</option>
        <option value="low">Baixa</option>
      </select>

      <select
        name="category"
        className="task-filter-select"
        value={filters.category || ''}
        onChange={handleChange}
        aria-label="Filtrar por categoria"
      >
        <option value="">Todas categorias</option>
      </select>
    </div>
  );
}
