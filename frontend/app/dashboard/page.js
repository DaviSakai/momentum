'use client';

import ProtectedRoute from '../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../src/features/auth/context/AuthContext';
import './dashboard.css';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">M</div>
          <span className="dashboard-brand-text">Momentum</span>
        </div>
        <div className="dashboard-user-area">
          <span className="dashboard-username">Olá, {user?.name || 'Usuário'}</span>
          <button onClick={logout} className="btn btn-secondary btn-sm">
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <span className="dashboard-eyebrow">Dashboard</span>
          <h1>Bem-vindo ao Momentum</h1>
          <p>Seu painel pessoal está pronto. As funcionalidades estão sendo construídas.</p>
        </div>

        <section className="dashboard-cards" aria-label="Resumo">
          <article className="card dashboard-card">
            <div className="dashboard-card-icon">💚</div>
            <h3>Check-in Diário</h3>
            <p className="dashboard-card-status">Em breve</p>
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-icon">🎯</div>
            <h3>Metas</h3>
            <p className="dashboard-card-status">Em breve</p>
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-icon">📋</div>
            <h3>Tarefas</h3>
            <p className="dashboard-card-status">Em breve</p>
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-icon">📊</div>
            <h3>Produtividade</h3>
            <p className="dashboard-card-status">Em breve</p>
          </article>
        </section>
      </main>
    </div>
  );
}
