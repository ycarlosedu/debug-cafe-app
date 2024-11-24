import axios, { AxiosRequestHeaders } from 'axios';
import { Alert } from 'react-native';

import { secureStore } from '../secureStore';

import { API_URL } from '@/constants';
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
    Promise.reject(error);
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

    return Promise.reject(response.data);
  }
);

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + secureStore.getToken(),
  } as AxiosRequestHeaders;
}

export type EndpointUtils = {
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
};

export async function get(uri: string, { onError, onSuccess }: EndpointUtils): Promise<any> {
  try {
    const response = await request.get(uri);
    onSuccess && onSuccess(response.data);
    return response.data;
  } catch (error: any) {
    onError && !isAuthError(error?.status) && onError(error);
    throw new Error(error);
  }
}

export async function post(
  uri: string,
  body: any,
  { onError, onSuccess }: EndpointUtils
): Promise<any> {
  try {
    const response = await request.post(uri, body);
    onSuccess && onSuccess(response.data);
    return response.data;
  } catch (error: any) {
    onError && !isAuthError(error?.status) && onError(error);
    throw new Error(error);
  }
}

export async function put(
  uri: string,
  body: any,
  { onError, onSuccess }: EndpointUtils
): Promise<any> {
  try {
    const response = await request.put(uri, body);
    onSuccess && onSuccess(response.data);
    return response.data;
  } catch (error: any) {
    onError && !isAuthError(error?.status) && onError(error);
    throw new Error(error);
  }
}
