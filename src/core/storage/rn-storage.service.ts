import { AsyncStorage } from 'react-native';

import { IApplicationStorage, STORAGE_KEY_SEPARATOR } from '../storage';
import { AnyT } from '../definitions.interface';

export class RnStorage implements IApplicationStorage {

  constructor(private prefix: string) {
  }

  public async set(key: string, value: AnyT): Promise<void> {
    return await AsyncStorage.setItem(this.toKey(key), value);
  }

  public async get(key: string): Promise<AnyT> {
    return await AsyncStorage.getItem(this.toKey(key));
  }

  public async remove(key: string, noPrefix?: boolean): Promise<void> {
    if (noPrefix) {
      return await AsyncStorage.removeItem(key);
    } else {
      return await AsyncStorage.removeItem(this.toKey(key));
    }
  }

  private toKey(key: string): string {
    return [this.prefix, key].join(STORAGE_KEY_SEPARATOR);
  }
}
