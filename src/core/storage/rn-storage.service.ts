import { AsyncStorage } from 'react-native';

import { IStorage, STORAGE_KEY_SEPARATOR } from '../storage';
import { AnyT } from '../definitions.interface';

// TODO Encryption/Decryption
export class RnStorage implements IStorage {

  constructor(private prefix: string) {
  }

  public set(key: string, value: AnyT): Promise<void> {
    return AsyncStorage.setItem(this.toKey(key), value);
  }

  public get(key: string): Promise<AnyT> {
    return AsyncStorage.getItem(this.toKey(key));
  }

  public remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(this.toKey(key));
  }

  private toKey(key: string): string {
    return [this.prefix, key].join(STORAGE_KEY_SEPARATOR);
  }
}
