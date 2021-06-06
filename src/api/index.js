import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../constants';

function getAuthorizationHeaders() {
  const token = Cookies.get('token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function apiGet(url, useAuth = false) {
  return axios({
    baseURL: API_BASE_URL,
    url,
    headers: useAuth ? getAuthorizationHeaders() : undefined,
  }).then(({ data }) => data);
}

export function apiPost(url, data) {
  return axios({
    method: 'POST',
    baseURL: API_BASE_URL,
    url,
    data,
  }).then(({ data }) => data);
}
