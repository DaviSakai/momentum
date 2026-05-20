const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Base API client for Momentum frontend.
 * All backend requests go through this module.
 */

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Attach auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('momentum_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData?.error?.message || `Request failed: ${response.status}`);
    error.status = response.status;
    error.code = errorData?.error?.code || 'UNKNOWN_ERROR';
    error.details = errorData?.error?.details || null;
    throw error;
  }

  return response.json();
}

export function get(endpoint) {
  return request(endpoint, { method: 'GET' });
}

export function post(endpoint, data) {
  return request(endpoint, { method: 'POST', body: JSON.stringify(data) });
}

export function put(endpoint, data) {
  return request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
}

export function patch(endpoint, data) {
  return request(endpoint, { method: 'PATCH', body: JSON.stringify(data) });
}

export function del(endpoint) {
  return request(endpoint, { method: 'DELETE' });
}

export default { get, post, put, patch, del };
