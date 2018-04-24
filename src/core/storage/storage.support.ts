import { STORAGE_KEY_SEPARATOR } from './storage.interface';

export const joinStorageKeyPrefix = (...parts: string[]) => parts.filter((v) => !!v).join(STORAGE_KEY_SEPARATOR);
