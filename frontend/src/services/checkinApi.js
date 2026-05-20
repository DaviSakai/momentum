import { get, post, put } from './api';

export function getToday() {
  return get('/checkins/today');
}

export function getAllCheckins(page = 1) {
  return get(`/checkins?page=${page}`);
}

export function createCheckin(data) {
  return post('/checkins', data);
}

export function updateCheckin(id, data) {
  return put(`/checkins/${id}`, data);
}
