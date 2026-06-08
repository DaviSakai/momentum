'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '../../src/features/auth/components/ProtectedRoute';
import { useAuth } from '../../src/features/auth/context/AuthContext';
import { getSummary } from '../../src/services/dashboardApi';
import GreetingHeader from '../../src/features/dashboard/components/GreetingHeader';
import DashboardLayout from '../../src/features/dashboard/components/DashboardLayout';
import HealthSummaryCard from '../../src/features/dashboard/components/HealthSummaryCard';
import TaskSummaryCard from '../../src/features/dashboard/components/TaskSummaryCard';
import GoalSummaryCard from '../../src/features/dashboard/components/GoalSummaryCard';
import ProductivityCard from '../../src/features/dashboard/components/ProductivityCard';
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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSummary();
      setData(result);
    } catch (err) {
      if (err.status === 401) {
        // Auth error — will be handled by ProtectedRoute
        return;
      }
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

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
        <GreetingHeader
          name={user?.name}
          date={data?.greeting?.date}
        />

        <DashboardLayout>
          <HealthSummaryCard
            data={data?.checkin}
            isLoading={isLoading}
            error={error}
            onRetry={fetchDashboard}
          />
          <TaskSummaryCard
            data={data?.tasks}
            isLoading={isLoading}
            error={error}
            onRetry={fetchDashboard}
          />
          <GoalSummaryCard
            data={data?.goals}
            isLoading={isLoading}
            error={error}
            onRetry={fetchDashboard}
          />
          <ProductivityCard
            data={data?.productivity}
            isLoading={isLoading}
            error={error}
            onRetry={fetchDashboard}
          />
        </DashboardLayout>
      </main>
    </div>
  );
}
