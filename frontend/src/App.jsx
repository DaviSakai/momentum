const metrics = [
  {
    label: 'Sono',
    value: '7h 40m',
    detail: 'Meta: 8h',
    status: 'Estável',
  },
  {
    label: 'Hidratação',
    value: '1.8L',
    detail: 'Meta: 2.5L',
    status: 'Em progresso',
  },
  {
    label: 'Foco',
    value: '82%',
    detail: '4 ciclos concluídos',
    status: 'Forte',
  },
  {
    label: 'Estudos',
    value: '2h 15m',
    detail: 'Frontend Development',
    status: 'Ativo',
  },
];

const habits = [
  { name: 'Beber água pela manhã', completed: true },
  { name: 'Revisar JavaScript', completed: true },
  { name: 'Treino leve', completed: false },
  { name: 'Planejar o dia seguinte', completed: false },
];

const timeline = [
  'Registrar sono e energia',
  'Estudar React por 60 minutos',
  'Pausa ativa no meio da tarde',
  'Revisar progresso do dia',
];

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <div className="brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>Momentum</strong>
            <span>Personal OS</span>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#habitos">Hábitos</a>
          <a href="#estudos">Estudos</a>
          <a href="#saude">Saúde</a>
        </nav>
      </aside>

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
            <article className="metric-card" key={metric.label}>
              <div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
              <p>{metric.detail}</p>
              <small>{metric.status}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading">
              <h2>Hábitos de hoje</h2>
              <span>{habits.filter((habit) => habit.completed).length}/4</span>
            </div>

            <ul className="habit-list">
              {habits.map((habit) => (
                <li key={habit.name}>
                  <span className={habit.completed ? 'check done' : 'check'} />
                  <p>{habit.name}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <h2>Plano do dia</h2>
              <span>4 blocos</span>
            </div>

            <ol className="timeline">
              {timeline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
