import { get, post, put, patch, del } from './api';

export function getAllTasks(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  if (filters.category) params.set('category', filters.category);
  const query = params.toString();
  return get(`/tasks${query ? `?${query}` : ''}`);
}

export function getTaskSummary() {
  return get('/tasks/summary');
}

export function getTaskById(id) {
  return get(`/tasks/${id}`);
}

export function createTask(data) {
  return post('/tasks', data);
}

export function updateTask(id, data) {
  return put(`/tasks/${id}`, data);
}

export function changeTaskStatus(id, status) {
  return patch(`/tasks/${id}/status`, { status });
}

export function deleteTask(id) {
  return del(`/tasks/${id}`);
}
