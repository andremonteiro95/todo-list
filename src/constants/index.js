export const API_BASE_URL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost/api' : '/api';

export const API_ENDPOINTS = {
  login: '/auth/login',
  signup: '/auth/signup',
  projects: '/projects',
  tasks: (projectId) => `/projects/${projectId}/tasks`,
};

export const VALIDATION_REGEXS = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
  noWhitespaceAtBeginning: /^[^-\s].*$/,
};
