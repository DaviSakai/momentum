'use client';

import { useState } from 'react';
import './goals-components.css';

const CATEGORIES = ['Health', 'Productivity', 'Study', 'Fitness', 'Career', 'Personal', 'Financial'];
const PERIODS = ['weekly', 'monthly', 'annual'];
const periodLabels = { weekly: 'Semanal', monthly: 'Mensal', annual: 'Anual' };

/**
 * Goal creation/edit form in modal overlay.
 */
export default function GoalForm({ initialData, onSubmit, onClose, isLoading }) {
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    period: initialData?.period || '',
    target_value: initialData?.target_value ?? '',
    target_date: initialData?.target_date || '',
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Título é obrigatório';
    if (form.title.length > 200) errs.title = 'Máximo 200 caracteres';
    if (!form.category) errs.category = 'Selecione uma categoria';
    if (!form.period) errs.period = 'Selecione um período';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      target_value: form.target_value ? Number(form.target_value) : null,
      target_date: form.target_date || null,
    };

    await onSubmit(data);
  }

  return (
    <div className="goal-form-overlay" onClick={onClose}>
      <div className="goal-form-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="goal-form-title">{isEditing ? '✏️ Editar Meta' : '🎯 Nova Meta'}</h2>
        <form className="goal-form" onSubmit={handleSubmit} noValidate>
          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-title">Título *</label>
            <input
              id="goal-title"
              name="title"
              className="goal-form-input"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Ler 12 livros este ano"
              maxLength={200}
            />
            {errors.title && <span className="goal-form-error">{errors.title}</span>}
          </div>

          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-desc">Descrição</label>
            <textarea
              id="goal-desc"
              name="description"
              className="goal-form-textarea"
              value={form.description}
              onChange={handleChange}
              placeholder="Detalhes sobre sua meta..."
              rows={3}
            />
          </div>

          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-category">Categoria *</label>
            <select
              id="goal-category"
              name="category"
              className="goal-form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="goal-form-error">{errors.category}</span>}
          </div>

          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-period">Período *</label>
            <select
              id="goal-period"
              name="period"
              className="goal-form-select"
              value={form.period}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {PERIODS.map((p) => <option key={p} value={p}>{periodLabels[p]}</option>)}
            </select>
            {errors.period && <span className="goal-form-error">{errors.period}</span>}
          </div>

          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-target">Valor alvo</label>
            <input
              id="goal-target"
              name="target_value"
              type="number"
              className="goal-form-input"
              value={form.target_value}
              onChange={handleChange}
              placeholder="Ex: 12"
              min={0}
            />
          </div>

          <div className="goal-form-field">
            <label className="goal-form-label" htmlFor="goal-date">Data limite</label>
            <input
              id="goal-date"
              name="target_date"
              type="date"
              className="goal-form-input"
              value={form.target_date}
              onChange={handleChange}
            />
          </div>

          <div className="goal-form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar meta'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
