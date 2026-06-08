'use client';

import { useState } from 'react';
import './tasks-components.css';

export default function TaskForm({ initialData, onSubmit, onClose, isLoading }) {
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    category: initialData?.category || '',
    due_date: initialData?.due_date || '',
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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      ...form,
      due_date: form.due_date || null,
      category: form.category || null,
    });
  }

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="task-form-title">{isEditing ? '✏️ Editar Tarefa' : '📝 Nova Tarefa'}</h2>
        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="task-form-field">
            <label className="task-form-label" htmlFor="task-title">Título *</label>
            <input
              id="task-title"
              name="title"
              className="task-form-input"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Estudar React Hooks"
              maxLength={200}
            />
            {errors.title && <span className="task-form-error">{errors.title}</span>}
          </div>

          <div className="task-form-field">
            <label className="task-form-label" htmlFor="task-desc">Descrição</label>
            <textarea
              id="task-desc"
              name="description"
              className="task-form-textarea"
              value={form.description}
              onChange={handleChange}
              placeholder="Detalhes da tarefa..."
              rows={3}
            />
          </div>

          <div className="task-form-field">
            <label className="task-form-label" htmlFor="task-priority">Prioridade</label>
            <select
              id="task-priority"
              name="priority"
              className="task-form-select"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="task-form-field">
            <label className="task-form-label" htmlFor="task-category">Categoria</label>
            <input
              id="task-category"
              name="category"
              className="task-form-input"
              value={form.category}
              onChange={handleChange}
              placeholder="Ex: Estudo, Trabalho, Pessoal"
            />
          </div>

          <div className="task-form-field">
            <label className="task-form-label" htmlFor="task-due">Data limite</label>
            <input
              id="task-due"
              name="due_date"
              type="date"
              className="task-form-input"
              value={form.due_date}
              onChange={handleChange}
            />
          </div>

          <div className="task-form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar tarefa'}
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
