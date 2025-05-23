import { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from './apiClient';
import {
  CallApiOptions,
  UseApiCallReturn,
  ResponseContentType,
  ResponseStatusCode,
  ResponseDataTypeByStatusCode,
  ResponseDataType,
  ApiService,
  RequestContentType,
  RequestDataType,
  OperationMethodsForPath,
  PathsWithOperations,
  ApiServiceCallParams,
} from '../types';
import { paths, operations } from '../openapi_schema';
import { config } from '../config/config';

export async function callApi<TResponseData, TRequestData = any>({
  url,
  method,
  ...rest
}: CallApiOptions<TRequestData>): Promise<AxiosResponse<TResponseData>> {
  try {
    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      ...rest,
    };

    console.log(method, url);
    const response = await apiClient.request<TResponseData>(requestConfig);
    console.log('Response headers:', response.headers);

    return response;
  } catch (error) {
    throw error;
  }
}

export function createApiService<
  TPath extends PathsWithOperations,
  TMethod extends OperationMethodsForPath<TPath>,
  TResponseContentType extends ResponseContentType<
    paths[TPath][TMethod]
  > = ResponseContentType<paths[TPath][TMethod]>,
  TResponseStatusCode extends ResponseStatusCode<
    paths[TPath][TMethod]
  > = ResponseStatusCode<paths[TPath][TMethod]>,
  TResponseDataByStatus extends ResponseDataTypeByStatusCode<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  > = ResponseDataTypeByStatusCode<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >,
  TResponseData extends ResponseDataType<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  > = ResponseDataType<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >,
  TRequestContentType extends RequestContentType<
    paths[TPath][TMethod]
  > = RequestContentType<paths[TPath][TMethod]>,
  TRequestData extends RequestDataType<
    paths[TPath][TMethod],
    TRequestContentType
  > = RequestDataType<paths[TPath][TMethod], TRequestContentType>
>(
  path: TPath,
  method: TMethod,
  requestContentType?: TRequestContentType | null,
  responseContentType?: TResponseContentType | null
): ApiService<
  TPath,
  TMethod,
  TResponseContentType,
  TResponseStatusCode,
  TResponseDataByStatus,
  TResponseData,
  TRequestContentType,
  TRequestData
> {
  // default to find the content type from the first request content
  if (!requestContentType) {
    let operation = config.openapiSchema.paths[path][
      method
    ] as operations[keyof operations];

    requestContentType = operation?.requestBody?.content
      ? (Object.keys(operation.requestBody.content)[0] as TRequestContentType)
      : null;
  }

  if (!requestContentType) {
    requestContentType = openapi_schema.paths[path][method]?.requestBody
      ?.content
      ? (Object.keys(
          openapi_schema.paths[path][method].requestBody.content
        )[0] as TRequestContentType)
      : null;
  }

  // default to find the content type from the first request content
  if (!responseContentType) {
    responseContentType = openapi_schema.paths[path][method as string]
      .responses[
      Object.keys(openapi_schema.paths[path][method as string].responses)[0]
    ]?.content
      ? (Object.keys(
          openapi_schema.paths[path][method as string].responses[
            Object.keys(
              openapi_schema.paths[path][method as string].responses
            )[0]
          ].content
        )[0] as TResponseContentType)
      : null;
  }

  const call = async ({
    pathParams,
    headers = {},
    ...rest
  }: ApiServiceCallParams<
    TPath,
    TMethod,
    TRequestContentType,
    TRequestData
  >) => {
    let url: CallApiOptions<TRequestData>['url'] = path;
    if (pathParams && typeof pathParams === 'object') {
      for (const key in pathParams) {
        url = url.replace(`{${key}}`, pathParams[key]);
      }
    }

    const r = await callApi<TResponseData, TRequestData>({
      url,
      method,
      headers: {
        ...(requestContentType ? { 'Content-Type': requestContentType } : {}),
        ...(responseContentType ? { Accept: responseContentType } : {}),
        ...headers,
      },
      ...rest,
    });
    return r;
  };

  return {
    call,
    responses: null,
  };
}

export function useApiCall<
  TPath extends PathsWithOperations,
  TMethod extends OperationMethodsForPath<TPath>,
  TResponseContentType extends ResponseContentType<paths[TPath][TMethod]>,
  TRequestContentType extends RequestContentType<paths[TPath][TMethod]>,
  TResponseStatusCode extends ResponseStatusCode<paths[TPath][TMethod]>,
  TRequestData extends RequestDataType<
    paths[TPath][TMethod],
    TRequestContentType
  >,
  TResponseData extends ResponseDataType<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >,
  TResponseDataByStatus extends ResponseDataTypeByStatusCode<
    paths[TPath][TMethod],
    TResponseContentType,
    TResponseStatusCode
  >
>(
  apiService: ApiService<
    TPath,
    TMethod,
    TResponseContentType,
    TResponseStatusCode,
    TResponseDataByStatus,
    TResponseData,
    TRequestContentType,
    TRequestData
  >,
  apiServiceOptions: ApiServiceCallParams<
    TPath,
    TMethod,
    TRequestContentType,
    TResponseData
  >,
  dependencies: any[] = []
): UseApiCallReturn<TResponseData> {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<AxiosResponse<TResponseData>>(null);

  async function refetch() {
    setLoading(true);
    const b = await apiService.call(apiServiceOptions);
    setResponse(b);
    setLoading(false);
  }

  useEffect(() => {
    refetch();
  }, dependencies);

  return { ...response, loading, refetch };
}
