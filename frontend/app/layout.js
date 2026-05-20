import './globals.css';
import AuthProviderWrapper from './AuthProviderWrapper';

export const metadata = {
  title: 'Momentum — Personal Organization Platform',
  description: 'Track your health, productivity, goals, habits, and routine in one modern platform. Build rhythm with clarity.',
  keywords: ['productivity', 'health tracking', 'goals', 'habits', 'kanban', 'personal organization'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
