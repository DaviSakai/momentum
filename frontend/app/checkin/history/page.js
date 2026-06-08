'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '../../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../../src/features/auth/context/AuthContext';
import { getAllCheckins } from '../../../src/services/checkinApi';
import CheckInHistoryItem from '../../../src/features/checkin/components/CheckInHistoryItem';
import '../../../src/features/checkin/components/checkin-components.css';

export default function CheckinHistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryContent />
    </ProtectedRoute>
  );
}

function HistoryContent() {
  const { user, logout } = useAuth();
  const [checkins, setCheckins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllCheckins(page);
      setCheckins(result.items || []);
      setTotal(result.total || 0);
    } catch {
      // Error handled gracefully
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="checkin-page">
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

      <main className="checkin-content">
        <h1 className="checkin-page-title">📅 Histórico de Check-ins</h1>
        <p className="checkin-page-subtitle">
          Veja como você tem se sentido ao longo do tempo.
        </p>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <a href="/checkin" className="btn btn-accent btn-sm">← Fazer check-in de hoje</a>
        </div>

        {isLoading ? (
          <div className="checkin-history-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-pulse" style={{ height: 120, borderRadius: 12 }} />
            ))}
          </div>
        ) : checkins.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
              Nenhum check-in registrado ainda.
            </p>
            <a href="/checkin" className="btn btn-accent" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
              Fazer seu primeiro check-in
            </a>
          </div>
        ) : (
          <>
            <div className="checkin-history-list">
              {checkins.map((checkin) => (
                <CheckInHistoryItem key={checkin.id} checkin={checkin} />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Anterior
                </button>
                <span style={{ alignSelf: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Página {page} de {totalPages}
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
