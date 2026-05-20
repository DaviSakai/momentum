import { post, get } from './api';

export function registerUser(data) {
  return post('/auth/register', data);
}

export function loginUser(data) {
  return post('/auth/login', data);
}

export function logoutUser() {
  return post('/auth/logout');
}

export function getMe() {
  return get('/auth/me');
}
