import { AsyncStorage } from 'react-native';

import { IApplicationStorage, STORAGE_KEY_SEPARATOR } from '../storage';
import { AnyT } from '../definitions.interface';

// TODO Encryption/Decryption
export class RnStorage implements IApplicationStorage {

  constructor(private prefix: string) {
  }

  public async set(key: string, value: AnyT): Promise<void> {
    return await AsyncStorage.setItem(this.toKey(key), value);
  }

  public async get(key: string): Promise<AnyT> {
    return await AsyncStorage.getItem(this.toKey(key));
  }

  public async remove(key: string): Promise<void> {
    return await AsyncStorage.removeItem(key);
  }

  private toKey(key: string): string {
    return [this.prefix, key].join(STORAGE_KEY_SEPARATOR);
  }
}
