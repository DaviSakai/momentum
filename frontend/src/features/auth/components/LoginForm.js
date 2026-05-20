'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  }

  function validate() {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      await login(formData);
    } catch (error) {
      setServerError(error.message || 'Email ou senha inválidos.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <a href="/" className="auth-brand">
            <div className="auth-brand-mark">M</div>
            <span className="auth-brand-text">Momentum</span>
          </a>
          <h1>Entrar no Momentum</h1>
          <p>Acesse sua conta para continuar.</p>
        </div>

        <div className="auth-form card">
          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="auth-error-banner" role="alert">{serverError}</div>
            )}

            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && <span id="login-email-error" className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">Senha</label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                autoComplete="current-password"
              />
              {errors.password && <span id="login-password-error" className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          Não tem uma conta? <a href="/register">Criar conta</a>
        </div>
      </div>
    </div>
  );
}
