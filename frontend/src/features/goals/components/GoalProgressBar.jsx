'use client';

import './goals-components.css';

/**
 * Visual progress bar with aria attributes.
 */
export default function GoalProgressBar({ progress = 0 }) {
  const isComplete = progress >= 100;

  return (
    <div>
      <div
        className="goal-progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso: ${progress}%`}
      >
        <div
          className={`goal-progress-fill ${isComplete ? 'complete' : ''}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className="goal-progress-label">{progress}%</span>
    </div>
  );
}
