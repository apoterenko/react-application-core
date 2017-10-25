import * as store from 'store/dist/store.modern';

import { IApplicationStorageService } from '../storage';
import { AnyT } from '../definition.interface';

export class StorageService implements IApplicationStorageService {

  constructor(private prefix: string) {
  }

  set enabled(value: boolean) {
    this.storage.enabled = value;
  }

  get enabled(): boolean {
    return this.storage.enabled;
  }

  set disabled(value: boolean) {
    this.storage.disabled = value;
  }

  get disabled(): boolean {
    return this.storage.disabled;
  }

  public set(key: string, value: AnyT): AnyT {
    return this.storage.set(this.prefix + key, value);
  }

  public get(key: string): AnyT {
    return this.storage.get(this.prefix + key);
  }

  public remove(key: string, noPrefix?: boolean): void {
    if (noPrefix) {
      this.storage.remove(key);
    } else {
      this.storage.remove(this.prefix + key);
    }
  }

  public each(command: (key: string, value: AnyT) => void): void {
    this.storage.each((key: string, value: AnyT) => (command(this.prefix + key, value)));
  }

  private get storage(): IApplicationStorageService {
    return store;
  }
}
