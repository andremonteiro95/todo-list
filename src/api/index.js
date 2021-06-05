import axios from 'axios';
import { API_BASE_URL } from '../constants';

export function apiGet(url) {
  return axios({
    baseURL: API_BASE_URL,
    url,
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
