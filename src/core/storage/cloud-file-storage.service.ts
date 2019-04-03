import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../di';
import { IMultiEntity, IBlobEntity } from '../entities-definitions.interface';
import { toBlobEntities } from '../util';
import {
  ISetFileResult,
  IRemoveFileResult,
  ISetFilesResult,
  IStorage,
} from './storage.interface';

@injectable()
export class CloudFileStorage implements IStorage {
  @lazyInject(DI_TYPES.CloudStorage) private cloudStorage: IStorage;

  public async set(key: string, entity: IMultiEntity): Promise<ISetFilesResult> {
    const blobs = await toBlobEntities(...entity.add.map((entity0) => entity0.id as string));
    const result = await Promise.all<ISetFileResult[], IRemoveFileResult[]>([
      this.upload(blobs),
      this.clear(entity)
    ]);
    return {
      setFilesResults: result[0],
      removeFilesResults: result[1],
    };
  }

  private upload(entities: IBlobEntity[]): Promise<ISetFileResult[]> {
    const uploadTasks = entities.map<Promise<ISetFileResult>>(
      (entity) => this.cloudStorage.set(entity.id, entity.blob)
    );
    return Promise.all<ISetFileResult>(uploadTasks);
  }

  private clear(entity: IMultiEntity): Promise<IRemoveFileResult[]> {
    const clearTasks = entity.remove.map<Promise<IRemoveFileResult>>(
      (entity0) => this.cloudStorage.remove(entity0.id as string)
    );
    return Promise.all<IRemoveFileResult>(clearTasks);
  }
}
