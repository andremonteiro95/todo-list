import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../constants';

function getAuthorizationHeaders() {
  const token = Cookies.get('token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function apiDelete(url, useAuth) {
  return axios({
    method: 'DELETE',
    baseURL: API_BASE_URL,
    url,
    headers: useAuth ? getAuthorizationHeaders() : undefined,
  }).then(({ data }) => data);
}

export function apiGet(url, useAuth) {
  return axios({
    baseURL: API_BASE_URL,
    url,
    headers: useAuth ? getAuthorizationHeaders() : undefined,
  }).then(({ data }) => data);
}

export function apiPost(url, data, useAuth) {
  return axios({
    method: 'POST',
    baseURL: API_BASE_URL,
    url,
    headers: useAuth ? getAuthorizationHeaders() : undefined,
    data,
  }).then(({ data }) => data);
}
