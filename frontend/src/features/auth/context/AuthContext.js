'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser, logoutUser, getMe } from '../../../services/authApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'momentum_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      getMe()
        .then((data) => {
          setUser(data.user);
        })
        .catch(() => {
          // Token invalid or expired
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    const result = await registerUser(data);
    localStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
    router.push('/dashboard');
    return result;
  }, [router]);

  const login = useCallback(async (data) => {
    const result = await loginUser(data);
    localStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
    router.push('/dashboard');
    return result;
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore — logout is client-side
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
