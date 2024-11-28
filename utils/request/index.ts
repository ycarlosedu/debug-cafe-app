import axios, { AxiosRequestHeaders } from 'axios';
import { Alert } from 'react-native';

import { secureStore } from '../secureStore';

import { API_URL, ERROR } from '@/constants';
import useAuthStore from '@/stores/useAuthStore';

const isAuthError = (status: string | number): boolean => {
  return status == 401;
};

export const request = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

request.interceptors.request.use((request) => {
  const { url, headers, method, timeout, baseURL, data } = request;
  console.log('Starting Request', {
    url: `${baseURL}${url}`,
    data,
    method,
    headers,
    timeout,
  });
  return request;
});

request.interceptors.request.use(
  (config) => {
    const headers = getHeaders();
    Object.keys(headers).forEach((key) => {
      config.headers.set(key, headers[key]);
    });
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    if (error?.message) {
      return Promise.reject(error);
    }

    return Promise.reject(new Error(ERROR.GENERIC));
  }
);

request.interceptors.response.use(
  async (response) => {
    console.log('Request response:', response.data);
    return response.data;
  },
  (error: any) => {
    console.log('Response error:', JSON.stringify(error, null, 2));
    const { response } = error;
    console.log('Response data:', response?.data);

    if (isAuthError(response?.status)) {
      useAuthStore.getState().handleLogout();
      Alert.alert('Atenção!', 'Sua sessão foi expirada. Por favor, faça login novamente!');
    }

    if (response?.data?.message) {
      return Promise.reject(response?.data);
    }

    return Promise.reject(new Error(ERROR.GENERIC));
  }
);

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + secureStore.getToken(),
  } as AxiosRequestHeaders;
}
