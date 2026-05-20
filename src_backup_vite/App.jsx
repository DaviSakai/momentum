import DayPlanPanel from './components/DayPlanPanel.jsx';
import HabitsPanel from './components/HabitsPanel.jsx';
import MetricCard from './components/MetricCard.jsx';
import Sidebar from './components/Sidebar.jsx';
import { habits, metrics, timeline } from './data/dashboardData.js';

function App() {
  return (
    <main className="app-shell">
      <Sidebar />

      <section className="dashboard" id="dashboard">
        <header className="hero">
          <div>
            <span className="eyebrow">Hoje</span>
            <h1>Construa ritmo com clareza.</h1>
            <p>
              Acompanhe energia, foco, estudos e hábitos em uma visão simples
              da sua evolução diária.
            </p>
          </div>
          <button type="button">Novo registro</button>
        </header>

        <section className="metrics-grid" aria-label="Métricas principais">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              status={metric.status}
            />
          ))}
        </section>

        <section className="content-grid">
          <HabitsPanel habits={habits} />
          <DayPlanPanel timeline={timeline} />
        </section>
      </section>
    </main>
  );
}

export default App;
