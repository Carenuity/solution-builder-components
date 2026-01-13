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
    // if (boardName.includes('D1')) {
    //   return 'ESP8266';
    // } else if (boardName.includes('C3')) {
    //   return 'ESP32-C3';
    // } else if (boardName.trim() === 'ESP32' || boardName.includes('ESP32')) {
    //   return 'ESP32';
    // }
    switch (true) {
      case boardName.includes('C2'):
        return 'ESP32-C2';

      case boardName.includes('C3'):
        return 'ESP32-C3';

      case boardName.includes('C6'):
        return 'ESP32-C6';

      case boardName.includes('H2'):
        return 'ESP32-H2';

      case boardName.includes('S2'):
        return 'ESP32-S2';

      case boardName.includes('S3'):
        return 'ESP32-S3';

      case boardName.includes('D1'):
        return 'ESP8266';

      case boardName.includes('CAM') || boardName.trim() === 'ESP32':
        return 'ESP32';
    }
  }
  return undefined;
};
