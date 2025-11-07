export type ListApiResponse<Item> = {
  data: {
    offset?: string;
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

export type ChipFamily = 'ESP8266' | 'ESP32-C3' | 'ESP32';
export type BinaryFileId = 'boot' | 'bootloader' | 'partitions' | 'main';
export type BinaryFormat = 'merged' | 'arduino_parts';

export type TableParams = {
  total: number;
  currentPage?: number;
};

export type NextPageOffset = {
  [key: number]: string | undefined;
};
