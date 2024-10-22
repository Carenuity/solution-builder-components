import axios from 'axios';
import { IApiErrorResponse } from './types.utils';

const getApiError = (
  message: string | string[],
  errorCallback: (msg: string) => void
) => {
  if (typeof message === 'string') {
    errorCallback(message);
  } else {
    errorCallback(message[0]);
  }
};

export const processAxiosError = (
  error: unknown,
  errorCallback: (msg: string) => void
) => {
  if (axios.isAxiosError(error)) {
    const response = error?.response;
    if (response) {
      const errorObject: IApiErrorResponse = response.data?.error;
      if (errorObject) {
        const firstResponse = errorObject.response;
        if (firstResponse.response) {
          const secondResponse = firstResponse.response;
          if (secondResponse.message) {
            return getApiError(secondResponse.message, errorCallback);
          } else if (secondResponse.details) {
            return getApiError(secondResponse.details, errorCallback);
          }
        } else if (firstResponse.message) {
          return getApiError(firstResponse.message, errorCallback);
        } else if (firstResponse.details) {
          return getApiError(firstResponse.details, errorCallback);
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;
  return errorCallback(err.message);
};
