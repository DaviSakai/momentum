'use client';

/**
 * Dashboard grid layout wrapper with responsive CSS Grid.
 */
export default function DashboardLayout({ children }) {
  return (
    <section className="dashboard-cards" aria-label="Resumo do dia">
      {children}
    </section>
  );
}
