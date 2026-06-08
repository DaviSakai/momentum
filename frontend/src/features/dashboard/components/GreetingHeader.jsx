'use client';

/**
 * Greeting header showing user name and formatted date.
 */
export default function GreetingHeader({ name, date }) {
  const formattedDate = formatDate(date);
  const greeting = getGreeting();

  return (
    <div className="dashboard-welcome">
      <span className="dashboard-eyebrow">Dashboard</span>
      <h1>{greeting}, {name || 'Usuário'}</h1>
      <p>{formattedDate}</p>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function formatDate(dateStr) {
  try {
    const date = dateStr ? new Date(dateStr + 'T12:00:00') : new Date();
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return new Date().toLocaleDateString('pt-BR');
  }
}
