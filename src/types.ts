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
  UNKNOWN_COLOR: string;
  DEFAULT_N_GAMES_PER_ROUND: number;
  DEFAULT_N_ROUNDS: number;
  DEFAULT_N_DIVISIONS: number;
  DEFAULT_N_TEAMS_PER_DIVISION: number;
  DEFAULT_N_DIVISIONS_PER_GAME: number;
}

export interface Config {
  backendUrl: string;
  frontendUrl: string;
  vite: ViteConfig;
  openapiSchemaPath: string;
  unknownColor: string;
  defaultNGamesPerRound: number;
  defaultNRounds: number;
  defaultNDivisions: number;
  defaultNTeamsPerDivision: number;
  defaultNDivisionsPerGame: number;
}
