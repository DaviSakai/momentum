import { get } from './api';

/**
 * Fetch dashboard summary for a given date.
 * @param {string} [date] - ISO date string (YYYY-MM-DD). Defaults to today.
 */
export function getSummary(date) {
  const params = date ? `?date=${date}` : '';
  return get(`/dashboard/summary${params}`);
}
