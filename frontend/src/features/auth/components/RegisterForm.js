'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Digite um email válido';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
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
      await register(formData);
    } catch (error) {
      setServerError(error.message || 'Erro ao criar conta. Tente novamente.');
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
          <h1>Crie sua conta</h1>
          <p>Comece a organizar sua rotina e evolução pessoal.</p>
        </div>

        <div className="auth-form card">
          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="auth-error-banner" role="alert">{serverError}</div>
            )}

            <div className="form-group">
              <label htmlFor="register-name" className="form-label">Nome</label>
              <input
                id="register-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="register-email" className="form-label">Email</label>
              <input
                id="register-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="register-password" className="form-label">Senha</label>
              <input
                id="register-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                autoComplete="new-password"
              />
              {errors.password && <span id="password-error" className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          Já tem uma conta? <a href="/login">Entrar</a>
        </div>
      </div>
    </div>
  );
}
