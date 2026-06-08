'use client';

import './checkin-components.css';

/**
 * Reusable metric input component for ratings and numbers.
 * Supports type: 'rating' (1-5 buttons), 'number' (input), 'toggle' (yes/no), 'textarea'
 */
export default function MetricInput({
  label,
  name,
  type = 'number',
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  error,
  hint,
  ratingLabels,
}) {
  const handleChange = (newValue) => {
    onChange({ target: { name, value: newValue } });
  };

  if (type === 'rating') {
    return (
      <div className="metric-input">
        <label className="metric-label">{label}</label>
        {hint && <span className="metric-hint">{hint}</span>}
        <div className="metric-rating-group" role="radiogroup" aria-label={label}>
          {Array.from({ length: (max || 5) - (min || 1) + 1 }, (_, i) => {
            const val = (min || 1) + i;
            const isSelected = value === val;
            return (
              <button
                key={val}
                type="button"
                className={`metric-rating-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleChange(val)}
                aria-pressed={isSelected}
                aria-label={ratingLabels?.[val] || `${val}`}
              >
                {ratingLabels?.[val] || val}
              </button>
            );
          })}
        </div>
        {error && <span className="metric-error">{error}</span>}
      </div>
    );
  }

  if (type === 'toggle') {
    const isOn = value === 1 || value === true;
    return (
      <div className="metric-input">
        <label className="metric-label">{label}</label>
        {hint && <span className="metric-hint">{hint}</span>}
        <div className="metric-toggle-group">
          <button
            type="button"
            className={`metric-toggle-btn ${!isOn ? 'selected' : ''}`}
            onClick={() => handleChange(0)}
          >
            Não
          </button>
          <button
            type="button"
            className={`metric-toggle-btn ${isOn ? 'selected' : ''}`}
            onClick={() => handleChange(1)}
          >
            Sim
          </button>
        </div>
        {error && <span className="metric-error">{error}</span>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="metric-input">
        <label className="metric-label" htmlFor={name}>{label}</label>
        {hint && <span className="metric-hint">{hint}</span>}
        <textarea
          id={name}
          name={name}
          className="metric-textarea"
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="Como foi seu dia?"
        />
        {error && <span className="metric-error">{error}</span>}
      </div>
    );
  }

  // Default: number input
  return (
    <div className="metric-input">
      <label className="metric-label" htmlFor={name}>{label}</label>
      {hint && <span className="metric-hint">{hint}</span>}
      <input
        id={name}
        name={name}
        type="number"
        className="metric-number"
        value={value ?? ''}
        onChange={(e) => handleChange(e.target.value === '' ? null : Number(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
      {error && <span className="metric-error">{error}</span>}
    </div>
  );
}
