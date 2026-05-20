function Sidebar() {
  return (
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
  );
}

export default Sidebar;
