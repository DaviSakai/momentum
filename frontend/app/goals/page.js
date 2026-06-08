'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../src/features/auth/context/AuthContext';
import { getAllGoals, createGoal, updateGoal, updateGoalProgress, deleteGoal } from '../../src/services/goalApi';
import GoalCard from '../../src/features/goals/components/GoalCard';
import GoalForm from '../../src/features/goals/components/GoalForm';
import GoalFilters from '../../src/features/goals/components/GoalFilters';
import '../../src/features/goals/components/goals-components.css';

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <GoalsContent />
    </ProtectedRoute>
  );
}

function GoalsContent() {
  const { user, logout } = useAuth();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllGoals(filters);
      setGoals(result.goals || []);
    } catch {
      // Error handled
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  async function handleCreate(data) {
    setIsSubmitting(true);
    try {
      await createGoal(data);
      setShowForm(false);
      fetchGoals();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEdit(data) {
    setIsSubmitting(true);
    try {
      await updateGoal(editingGoal.id, data);
      setEditingGoal(null);
      fetchGoals();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProgressUpdate(id, progress) {
    await updateGoalProgress(id, progress);
    fetchGoals();
  }

  async function handleStatusChange(id, status) {
    await updateGoal(id, { status });
    fetchGoals();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteGoal(deleteTarget.id);
    setDeleteTarget(null);
    fetchGoals();
  }

  return (
    <div className="goals-page">
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

      <main className="goals-content">
        <div className="goals-page-header">
          <h1 className="goals-page-title">🎯 Metas</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nova Meta
          </button>
        </div>

        <GoalFilters filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <div className="goal-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-pulse" style={{ height: 200, borderRadius: 12 }} />
            ))}
          </div>
        ) : goals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>🎯</div>
            <h3>Nenhuma meta encontrada</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              {Object.values(filters).some(Boolean)
                ? 'Nenhuma meta corresponde aos filtros selecionados.'
                : 'Defina objetivos claros e acompanhe seu progresso ao longo do tempo.'}
            </p>
            {!Object.values(filters).some(Boolean) && (
              <button className="btn btn-accent" onClick={() => setShowForm(true)}>
                Criar primeira meta
              </button>
            )}
          </div>
        ) : (
          <div className="goal-list">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={(g) => setEditingGoal(g)}
                onDelete={(g) => setDeleteTarget(g)}
                onProgressUpdate={handleProgressUpdate}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Form Modal */}
      {showForm && (
        <GoalForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {/* Edit Form Modal */}
      {editingGoal && (
        <GoalForm
          initialData={editingGoal}
          onSubmit={handleEdit}
          onClose={() => setEditingGoal(null)}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="confirm-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-labelledby="confirm-title">
            <h3 id="confirm-title">Excluir meta?</h3>
            <p>Tem certeza que deseja excluir &quot;{deleteTarget.title}&quot;? Esta ação não pode ser desfeita.</p>
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
