// axios-instance.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { keycloak } from '@/infra/user/keycloakClient';

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*export const AXIOS_INSTANCE = axios.create({
  baseURL: '/api/proxy/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});*/

// Axios interceptor to automatically inject Bearer token from Keycloak
AXIOS_INSTANCE.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    
    const token = keycloak.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Only set Content-Type if not already set and if it's a POST/PUT/PATCH request
    // GET requests don't need Content-Type, and multipart/form-data should be set explicitly
    if (!config.headers['Content-Type'] && config.method && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
      // Check if it's FormData
      if (config.data instanceof FormData) {
        // Don't set Content-Type for FormData - browser will set it with boundary
        delete config.headers['Content-Type'];
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// cliente compatível com a assinatura do customInstance
export const axiosFetcher = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      // Token is now automatically injected by the interceptor
    },
    cancelToken: source.token,
  }).then(({ data }) => data as T);

  // permite cancelar (igual ao customInstance)
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// Tipos extras para compatibilidade
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
