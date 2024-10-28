import { ChipFamily } from '../../../utils/types.utils';

export const sanitizeTag = (value: string) => {
  if (value) {
    let cleaned = value.trim();
    cleaned = cleaned.replaceAll(' ', '-');
    cleaned = cleaned.replace(/[^a-zA-Z0-9-]/gi, '');
    return cleaned;
  }
  return undefined;
};

export const getBoardChipFamily = (
  boardName?: string
): ChipFamily | undefined => {
  if (boardName) {
    if (boardName.includes('D1')) {
      return 'ESP8266';
    } else if (boardName.includes('C3')) {
      return 'ESP32-C3';
    } else if (boardName.trim() === 'ESP32' || boardName.includes('ESP32')) {
      return 'ESP32';
    }
  }
  return undefined;
};
