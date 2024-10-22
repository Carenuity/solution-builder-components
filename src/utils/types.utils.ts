export type ListApiResponse<Item> = {
  data: {
    items: Item[];
  };
};

export type IotShieldCategory = 'sensor' | 'microcontroller' | 'actuator';

export type Avatar = {
  id: string;
  url: string;
};

/**
 * Legacy Types
 */

type IErrorResponseObject = {
  response?: IErrorResponseObject;
  message?: string | string[];
  details?: string | string[];
};

export type IApiErrorResponse = {
  statusCode: number;
  response: IErrorResponseObject;
};
