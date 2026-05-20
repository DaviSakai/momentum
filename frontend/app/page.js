import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <header className={styles['landing-header']}>
        <div className={styles['landing-brand']}>
          <div className={styles['landing-brand-mark']}>M</div>
          <span className={styles['landing-brand-text']}>Momentum</span>
        </div>
        <nav className={styles['landing-nav']}>
          <a href="/login" className="btn btn-secondary">Entrar</a>
          <a href="/register" className="btn btn-accent">Criar conta</a>
        </nav>
      </header>

      <main className={styles['landing-hero']}>
        <span className={styles['hero-eyebrow']}>Organização pessoal inteligente</span>
        <h1 className={styles['hero-title']}>
          Construa ritmo com clareza.
        </h1>
        <p className={styles['hero-subtitle']}>
          Acompanhe saúde, produtividade, metas, hábitos e tarefas em uma única plataforma moderna.
          Entenda seus padrões. Evolua com dados.
        </p>
        <div className={styles['hero-actions']}>
          <a href="/register" className="btn btn-accent">Começar agora</a>
          <a href="#features" className="btn btn-secondary">Ver funcionalidades</a>
        </div>
      </main>

      <section id="features" className={styles['landing-features']}>
        <div className={styles['features-heading']}>
          <h2>Tudo em um só lugar</h2>
          <p>Momentum integra as áreas mais importantes da sua rotina.</p>
        </div>

        <div className={styles['features-grid']}>
          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>📊</div>
            <h3>Dashboard</h3>
            <p>Visão geral do seu dia: saúde, produtividade, metas e tarefas em uma tela.</p>
          </article>

          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>💚</div>
            <h3>Check-in Diário</h3>
            <p>Registre sono, humor, energia, foco e hidratação para entender seus padrões.</p>
          </article>

          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>🎯</div>
            <h3>Metas</h3>
            <p>Defina objetivos semanais, mensais e anuais. Acompanhe seu progresso.</p>
          </article>

          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>📋</div>
            <h3>Kanban</h3>
            <p>Gerencie tarefas visualmente com um quadro Kanban simples e eficiente.</p>
          </article>

          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>🔐</div>
            <h3>Segurança</h3>
            <p>Seus dados são privados. Autenticação segura com JWT e senhas criptografadas.</p>
          </article>

          <article className={`card ${styles['feature-card']}`}>
            <div className={styles['feature-icon']}>📱</div>
            <h3>Responsivo</h3>
            <p>Use em qualquer dispositivo. Desktop, tablet ou celular — sempre funcional.</p>
          </article>
        </div>
      </section>

      <footer className={styles['landing-footer']}>
        <p>Momentum — Construído com propósito. © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
