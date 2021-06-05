export const API_BASE_URL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost/api' : '/api';

export const API_ENDPOINTS = {
  login: '/auth/login',
  signup: '/auth/signup',
};
