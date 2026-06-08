'use client';

import TaskCard from './TaskCard';
import './tasks-components.css';

const columnConfig = {
  todo: { title: 'A Fazer', className: 'kanban-column--todo', emptyText: 'Nenhuma tarefa pendente' },
  in_progress: { title: 'Em Progresso', className: 'kanban-column--in_progress', emptyText: 'Nenhuma tarefa em andamento' },
  done: { title: 'Concluídas', className: 'kanban-column--done', emptyText: 'Nenhuma tarefa concluída' },
};

export default function KanbanColumn({ status, tasks, onEdit, onDelete, onStatusChange }) {
  const config = columnConfig[status] || columnConfig.todo;

  return (
    <div className={`kanban-column ${config.className}`}>
      <div className="kanban-column-header">
        <span className="kanban-column-title">{config.title}</span>
        <span className="kanban-column-count">{tasks.length}</span>
      </div>
      <div className="kanban-column-body">
        {tasks.length === 0 ? (
          <div className="kanban-column-empty">{config.emptyText}</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
