import { get, post, put, patch, del } from './api';

export function getAllGoals(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.category) params.set('category', filters.category);
  if (filters.period) params.set('period', filters.period);
  const query = params.toString();
  return get(`/goals${query ? `?${query}` : ''}`);
}

export function getGoalSummary() {
  return get('/goals/summary');
}

export function getGoalById(id) {
  return get(`/goals/${id}`);
}

export function createGoal(data) {
  return post('/goals', data);
}

export function updateGoal(id, data) {
  return put(`/goals/${id}`, data);
}

export function updateGoalProgress(id, progress) {
  return patch(`/goals/${id}/progress`, { progress });
}

export function deleteGoal(id) {
  return del(`/goals/${id}`);
}
