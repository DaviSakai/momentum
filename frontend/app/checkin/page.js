'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../src/features/auth/context/AuthContext';
import { getToday, createCheckin, updateCheckin } from '../../src/services/checkinApi';
import CheckInForm from '../../src/features/checkin/components/CheckInForm';
import '../../src/features/checkin/components/checkin-components.css';

export default function CheckinPage() {
  return (
    <ProtectedRoute>
      <CheckinContent />
    </ProtectedRoute>
  );
}

function CheckinContent() {
  const { user, logout } = useAuth();
  const [existing, setExisting] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchToday = useCallback(async () => {
    setIsPageLoading(true);
    try {
      const result = await getToday();
      setExisting(result.checkin || null);
    } catch {
      // No existing check-in
    } finally {
      setIsPageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    try {
      if (existing?.id) {
        const result = await updateCheckin(existing.id, formData);
        setExisting(result.checkin);
      } else {
        const result = await createCheckin(formData);
        setExisting(result.checkin);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <h1 className="checkin-page-title">
          {existing ? '✏️ Editar Check-in' : '💚 Check-in Diário'}
        </h1>
        <p className="checkin-page-subtitle">
          {existing
            ? 'Atualize como você está se sentindo hoje.'
            : 'Registre como você está hoje — sono, humor, energia e mais.'}
        </p>

        {isPageLoading ? (
          <div className="checkin-form">
            <div className="skeleton-pulse" style={{ height: 200, borderRadius: 12 }} />
            <div className="skeleton-pulse" style={{ height: 150, borderRadius: 12 }} />
            <div className="skeleton-pulse" style={{ height: 120, borderRadius: 12 }} />
          </div>
        ) : (
          <CheckInForm
            initialData={existing}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        )}

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <a href="/checkin/history" className="btn btn-secondary btn-sm">
            Ver histórico de check-ins
          </a>
        </div>
      </main>
    </div>
  );
}
