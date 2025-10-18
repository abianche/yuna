const prefix = 'yuna-';

const STORAGE_KEYS = {
  THEME: `${prefix}theme`,
};

export const getStorageKey = (key: keyof typeof STORAGE_KEYS): string => STORAGE_KEYS[key];
