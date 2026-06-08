'use client';

import { useState } from 'react';
import MetricInput from './MetricInput';
import './checkin-components.css';

const moodLabels = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const energyLabels = { 1: '🪫', 2: '😴', 3: '⚡', 4: '🔥', 5: '⚡⚡' };
const focusLabels = { 1: '🌫️', 2: '😶‍🌫️', 3: '🎯', 4: '🧠', 5: '💎' };

/**
 * Check-in form with grouped sections: Wellness, Activity, Productivity.
 * Handles both create and edit (pre-filled) modes.
 */
export default function CheckInForm({ initialData, onSubmit, isLoading }) {
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    sleep_hours: initialData?.sleep_hours ?? null,
    mood: initialData?.mood ?? null,
    energy: initialData?.energy ?? null,
    focus: initialData?.focus ?? null,
    hydration: initialData?.hydration ?? null,
    study_hours: initialData?.study_hours ?? null,
    training_done: initialData?.training_done ?? 0,
    productivity_score: initialData?.productivity_score ?? null,
    notes: initialData?.notes ?? '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    setSuccess(false);
  }

  function validate() {
    const errs = {};

    if (form.mood === null) errs.mood = 'Selecione seu humor';
    if (form.energy === null) errs.energy = 'Selecione seu nível de energia';
    if (form.focus === null) errs.focus = 'Selecione seu nível de foco';

    if (form.sleep_hours !== null && (form.sleep_hours < 0 || form.sleep_hours > 24)) {
      errs.sleep_hours = 'Horas de sono deve ser entre 0 e 24';
    }

    if (form.hydration !== null && (form.hydration < 0 || form.hydration > 20)) {
      errs.hydration = 'Hidratação deve ser entre 0 e 20 litros';
    }

    if (form.productivity_score !== null && (form.productivity_score < 1 || form.productivity_score > 10)) {
      errs.productivity_score = 'Score deve ser entre 1 e 10';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);

    if (!validate()) return;

    try {
      await onSubmit(form);
      setSuccess(true);
    } catch (err) {
      setServerError(err.message || 'Erro ao salvar check-in');
    }
  }

  return (
    <form className="checkin-form" onSubmit={handleSubmit} noValidate>
      {/* Wellness Section */}
      <fieldset className="checkin-section">
        <legend className="checkin-section-title">🧘 Bem-estar</legend>

        <MetricInput
          label="Humor"
          name="mood"
          type="rating"
          value={form.mood}
          onChange={handleChange}
          min={1}
          max={5}
          ratingLabels={moodLabels}
          error={errors.mood}
          hint="Como você se sente hoje?"
        />

        <MetricInput
          label="Energia"
          name="energy"
          type="rating"
          value={form.energy}
          onChange={handleChange}
          min={1}
          max={5}
          ratingLabels={energyLabels}
          error={errors.energy}
          hint="Seu nível de energia agora"
        />

        <MetricInput
          label="Foco"
          name="focus"
          type="rating"
          value={form.focus}
          onChange={handleChange}
          min={1}
          max={5}
          ratingLabels={focusLabels}
          error={errors.focus}
          hint="Sua capacidade de concentração"
        />

        <MetricInput
          label="Horas de sono"
          name="sleep_hours"
          type="number"
          value={form.sleep_hours}
          onChange={handleChange}
          min={0}
          max={24}
          step={0.5}
          error={errors.sleep_hours}
          hint="Quantas horas dormiu na noite passada"
        />

        <MetricInput
          label="Hidratação (litros)"
          name="hydration"
          type="number"
          value={form.hydration}
          onChange={handleChange}
          min={0}
          max={20}
          step={0.25}
          error={errors.hydration}
          hint="Litros de água consumidos hoje"
        />
      </fieldset>

      {/* Activity Section */}
      <fieldset className="checkin-section">
        <legend className="checkin-section-title">🏃 Atividade</legend>

        <MetricInput
          label="Horas de estudo"
          name="study_hours"
          type="number"
          value={form.study_hours}
          onChange={handleChange}
          min={0}
          max={24}
          step={0.5}
          error={errors.study_hours}
          hint="Horas dedicadas a estudos/aprendizado"
        />

        <MetricInput
          label="Treinou hoje?"
          name="training_done"
          type="toggle"
          value={form.training_done}
          onChange={handleChange}
        />
      </fieldset>

      {/* Productivity Section */}
      <fieldset className="checkin-section">
        <legend className="checkin-section-title">📊 Produtividade</legend>

        <MetricInput
          label="Score de produtividade"
          name="productivity_score"
          type="rating"
          value={form.productivity_score}
          onChange={handleChange}
          min={1}
          max={10}
          error={errors.productivity_score}
          hint="De 1 a 10, quão produtivo foi seu dia?"
        />

        <MetricInput
          label="Notas do dia"
          name="notes"
          type="textarea"
          value={form.notes}
          onChange={handleChange}
        />
      </fieldset>

      {serverError && (
        <div className="checkin-error-banner" role="alert">{serverError}</div>
      )}

      <div className="checkin-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Salvando...' : isEditing ? 'Atualizar check-in' : 'Salvar check-in'}
        </button>

        {success && (
          <span className="checkin-success" role="status">
            ✅ Check-in salvo!
          </span>
        )}
      </div>
    </form>
  );
}
