import { paths, operations, components } from './openapi_schema';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type GetElementTypeFromArray<T extends any[]> = T extends (infer U)[]
  ? U
  : never;

export type FirstKey<T> = keyof {
  [K in keyof T as K extends string ? K : never]: T[K];
} extends infer O
  ? keyof O
  : never;

export type NonNeverKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

export type OpenApiOperation = operations[keyof operations];
export type IsOpenApiOperation<T> = T extends OpenApiOperation ? true : false;

export type OperationKeys<T> = {
  [K in keyof T]: IsOpenApiOperation<T[K]> extends true ? K : never;
}[keyof T];

export type PathsWithOperations = {
  [P in keyof paths]: OperationKeys<paths[P]> extends never ? never : P;
}[keyof paths];

export type OperationMethodsForPath<TPath extends PathsWithOperations> =
  OperationKeys<paths[TPath]>;

export type RequestContentType<TOperation extends OpenApiOperation> = [
  TOperation['requestBody']
] extends [never]
  ? never
  : TOperation['requestBody'] extends { content: infer ContentTypes }
  ? keyof ContentTypes
  : TOperation['requestBody'] extends { content?: infer ContentTypes }
  ? keyof ContentTypes
  : never;

export type ResponseContentType<TOperation extends OpenApiOperation> =
  TOperation extends {
    responses: infer Responses;
  }
    ? {
        [StatusCode in keyof Responses]: Responses[StatusCode] extends {
          content: infer ContentTypes;
        }
          ? keyof ContentTypes
          : never;
      }[keyof Responses]
    : never;

export type ResponseStatusCode<TOperation extends OpenApiOperation> =
  TOperation extends {
    responses: infer Responses;
  }
    ? keyof Responses
    : never;

export type ResponseDataTypeByStatusCode<
  TOperation extends OpenApiOperation,
  TResponseContentType extends ResponseContentType<TOperation> = ResponseContentType<TOperation>,
  TResponseStatusCode extends ResponseStatusCode<TOperation> = ResponseStatusCode<TOperation>
> = TOperation extends {
  responses: infer Responses;
}
  ? {
      [K in keyof Responses]: K extends TResponseStatusCode
        ? Responses[K] extends {
            content: infer ContentTypes;
          }
          ? TResponseContentType extends keyof ContentTypes
            ? ContentTypes[TResponseContentType]
            : never
          : never
        : never;
    }
  : never;

export type ResponseDataType<
  TOperation extends OpenApiOperation,
  TResponseContentType extends ResponseContentType<TOperation> = ResponseContentType<TOperation>,
  TResponseStatusCode extends ResponseStatusCode<TOperation> = ResponseStatusCode<TOperation>,
  TResponseDataByStatus = ResponseDataTypeByStatusCode<
    TOperation,
    TResponseContentType,
    TResponseStatusCode
  >
> = TResponseDataByStatus[keyof TResponseDataByStatus];

export type RequestDataTypeProp<
  TOperation extends OpenApiOperation,
  TRequestContentType extends RequestContentType<TOperation> = RequestContentType<TOperation>
> = TOperation extends {
  requestBody: infer RequestBody;
}
  ? RequestBody extends { content: infer ContentTypes }
    ? { data: ContentTypes[keyof ContentTypes & TRequestContentType] }
    : RequestBody extends { content?: infer ContentTypes }
    ? { data?: ContentTypes[keyof ContentTypes & TRequestContentType] }
    : { data?: never }
  : TOperation extends { requestBody?: infer RequestBody }
  ? RequestBody extends
      | { content: infer ContentTypes }
      | { content?: infer ContentTypes }
    ? { data?: ContentTypes[keyof ContentTypes & TRequestContentType] }
    : { data?: never }
  : { data?: never };

export type RequestDataType<
  TOperation extends OpenApiOperation,
  TRequestContentType extends RequestContentType<TOperation> = RequestContentType<TOperation>
> = RequestDataTypeProp<TOperation, TRequestContentType>['data'];

export type RequestParamsTypeProp<TOperation> = TOperation extends {
  parameters: infer Params;
}
  ? Params extends { query: infer U }
    ? { params: U }
    : Params extends { query?: infer U }
    ? { params?: U }
    : { params?: never }
  : // whenever the generic isn't set
    { params?: never };

export type RequestParamsType<TOperation extends OpenApiOperation> =
  RequestParamsTypeProp<TOperation>['params'];

export type RequestPathParamsTypeProp<TOperation extends OpenApiOperation> =
  TOperation extends {
    parameters: infer Params;
  }
    ? Params extends { path: infer U }
      ? { pathParams: U }
      : Params extends { path?: infer U }
      ? { pathParams?: U }
      : { pathParams?: never }
    : // whenever the generic isn't set
      { pathParams?: never };

export type RequestPathParamsType<TOperation extends OpenApiOperation> =
  RequestPathParamsTypeProp<TOperation>['pathParams'];

// Extract the parameters type for the ApiService function
export type ApiServiceCallParams<
  TPath extends PathsWithOperations,
  TMethod extends OperationMethodsForPath<TPath>,
  TRequestContentType extends RequestContentType<paths[TPath][TMethod]>,
  TRequestData
> = Omit<
  CallApiOptions<TRequestData>,
  'url' | 'method' | 'data' | 'params' | 'pathParams'
> &
  RequestDataTypeProp<paths[TPath][TMethod], TRequestContentType> &
  RequestParamsTypeProp<paths[TPath][TMethod]> &
  RequestPathParamsTypeProp<paths[TPath][TMethod]>;

export type ApiService<
  TPath extends PathsWithOperations,
  TMethod extends OperationMethodsForPath<TPath>,
  TResponseContentType extends ResponseContentType<paths[TPath][TMethod]>,
  TResponseStatusCode extends ResponseStatusCode<paths[TPath][TMethod]>,
  TResponseDataByStatus extends ResponseDataTypeByStatusCode<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >,
  TResponseDataType extends ResponseDataType<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >,
  TRequestContentType extends RequestContentType<paths[TPath][TMethod]>,
  TRequestDataType extends RequestDataType<
    paths[TPath][TMethod],
    TRequestContentType
  >
> = {
  call: (
    options: ApiServiceCallParams<
      TPath,
      TMethod,
      TRequestContentType,
      TRequestDataType
    >
  ) => Promise<AxiosResponse<TResponseDataType>>;
  responses: TResponseDataByStatus;
};

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

export interface OpenapiSchema {
  paths: paths;
  components: components;
}

export interface Config {
  backendUrl: string;
  frontendUrl: string;
  vite: ViteConfig;
  unknownColor: string;
  defaultNGamesPerRound: number;
  defaultNRounds: number;
  defaultNDivisions: number;
  defaultNTeamsPerDivision: number;
  defaultNDivisionsPerGame: number;
  openapiSchemaPath: string;
  openapiSchema: OpenapiSchema;
}
