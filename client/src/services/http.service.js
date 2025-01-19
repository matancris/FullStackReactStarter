import axios from 'axios';

export const CANCELLED_ERROR_CODE = 'ERR_CANCELED'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultOptions = {
  method: 'get',
  data: null,
  params: {},
  headers: {
    'Content-Type': 'application/json'
  },
  withToken: true,
  fullUrl: '',
  isCancellable: false,
  responseType: 'json'
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const httpService = {
  async get(endpoint, options = {}) {
    return ajax(endpoint, { method: 'GET', ...options });
  },

  async post(endpoint, options = {}) {
    return ajax(endpoint, { method: 'POST', ...options });
  },

  async put(endpoint, options = {}) {
    return ajax(endpoint, { method: 'PUT', ...options });
  },

  async delete(endpoint, options = {}) {
    return ajax(endpoint, { method: 'DELETE', ...options });
  },

  async patch(endpoint, options = {}) {
    return ajax(endpoint, { method: 'PATCH', ...options });
  }
};

async function ajax(endpoint, options = {}) {
  options = { ...defaultOptions, ...options };
  const { method, data, params, headers, withToken, fullUrl, responseType } = options;

  try {
    const url = fullUrl || endpoint;
    const authHeaders = withToken ? await getAuthHeader() : {};
    
    const res = await axiosInstance({
      url,
      method,
      data,
      params,
      headers: { ...authHeaders, ...headers },
      responseType
    });

    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
    }

    return res.data;
  } catch (err) {
    console.error('HTTP Service Error:', err);
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
    throw errorMessage;
  }
}
