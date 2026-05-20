'use client';

import { AuthProvider } from '../src/features/auth/context/AuthContext';

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
