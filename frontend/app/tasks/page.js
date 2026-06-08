'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../src/features/auth/context/AuthContext';
import { getAllTasks, createTask, updateTask, changeTaskStatus, deleteTask } from '../../src/services/taskApi';
import KanbanColumn from '../../src/features/tasks/components/KanbanColumn';
import TaskForm from '../../src/features/tasks/components/TaskForm';
import TaskFilters from '../../src/features/tasks/components/TaskFilters';
import '../../src/features/tasks/components/tasks-components.css';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <TasksContent />
    </ProtectedRoute>
  );
}

function TasksContent() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllTasks(filters);
      setTasks(result.tasks || []);
    } catch {
      // Error handled
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Group tasks by status
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  async function handleCreate(data) {
    setIsSubmitting(true);
    try {
      await createTask(data);
      setShowForm(false);
      fetchTasks();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEdit(data) {
    setIsSubmitting(true);
    try {
      await updateTask(editingTask.id, data);
      setEditingTask(null);
      fetchTasks();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleStatusChange(id, status) {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    try {
      await changeTaskStatus(id, status);
    } catch {
      fetchTasks(); // Revert on failure
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteTask(deleteTarget.id);
    setDeleteTarget(null);
    fetchTasks();
  }

  return (
    <div className="kanban-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <a href="/dashboard" className="dashboard-brand-link">
            <div className="dashboard-brand-mark">M</div>
            <span className="dashboard-brand-text">Momentum</span>
          </a>
        </div>
        <div className="dashboard-user-area">
          <span className="dashboard-username">Olá, {user?.name || 'Usuário'}</span>
          <button onClick={logout} className="btn btn-secondary btn-sm">Sair</button>
        </div>
      </header>

      <main className="kanban-content">
        <div className="kanban-page-header">
          <h1 className="kanban-page-title">📋 Tarefas</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nova Tarefa
          </button>
        </div>

        <TaskFilters filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <div className="kanban-board">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-pulse" style={{ height: 400, borderRadius: 12 }} />
            ))}
          </div>
        ) : (
          <div className="kanban-board">
            <KanbanColumn
              status="todo"
              tasks={todoTasks}
              onEdit={(t) => setEditingTask(t)}
              onDelete={(t) => setDeleteTarget(t)}
              onStatusChange={handleStatusChange}
            />
            <KanbanColumn
              status="in_progress"
              tasks={inProgressTasks}
              onEdit={(t) => setEditingTask(t)}
              onDelete={(t) => setDeleteTarget(t)}
              onStatusChange={handleStatusChange}
            />
            <KanbanColumn
              status="done"
              tasks={doneTasks}
              onEdit={(t) => setEditingTask(t)}
              onDelete={(t) => setDeleteTarget(t)}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </main>

      {/* Create Form Modal */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {/* Edit Form Modal */}
      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onSubmit={handleEdit}
          onClose={() => setEditingTask(null)}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="confirm-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-labelledby="confirm-task-title">
            <h3 id="confirm-task-title">Excluir tarefa?</h3>
            <p>Tem certeza que deseja excluir &quot;{deleteTarget.title}&quot;?</p>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>
                Cancelar
              </button>
              <button className="btn btn-primary" style={{ background: 'var(--color-error)' }} onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
