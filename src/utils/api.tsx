import axios from 'axios';
import queryString from 'query-string';

import { getStoredAuthToken, removeStoredAuthToken } from '../utils/authToken';

export const queryStringToObject = (str: string, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  });

export const objectToQueryString = (obj: any, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  });

const defaults = {
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection.',
    status: 503,
    data: {},
  },
};

const api = (method: string, url: string, variables: object) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          if (error.response.data.error.code === 'INVALID_TOKEN') {
            removeStoredAuthToken();
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });

export default {
  get: (url: string, variables: object) => api('get', url, variables),
  post: (url: string, variables: object) => api('post', url, variables),
  put: (url: string, variables: object) => api('put', url, variables),
  patch: (url: string, variables: object) => api('patch', url, variables),
  delete: (url: string, variables: object) => api('delete', url, variables),
};