import { paths, operations, components } from './openapi_schema';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CallApiOptions<TRequestData>
  extends AxiosRequestConfig<TRequestData> {
  url: AxiosRequestConfig<TRequestData>['url'];
  method: AxiosRequestConfig<TRequestData>['method'];
}

export interface UseApiCallReturn<T> extends AxiosResponse<T> {
  loading: boolean;
  refetch: () => void;
}
export interface DarkModeContextData {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface SharedConfig {
  BACKEND_URL: string;
  FRONTEND_URL: string;
}

interface ViteConfig {
  server: {
    port: number;
    host: boolean;
  };
}

export interface FrontendConfig {
  VITE: ViteConfig;
  OPENAPI_SCHEMA_PATH: string;
}

export interface Config {
  backendUrl: string;
  frontendUrl: string;
  vite: ViteConfig;
  openapiSchemaPath: string;
}
