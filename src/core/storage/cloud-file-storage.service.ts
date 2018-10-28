import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../di';
import { IBlobEntity } from '../definitions.interface';
import { IMultiEntity } from '../entities-definitions.interface';
import { toBlobEntities } from '../util';
import {
  ISetFileResult,
  IRemoveFileResult,
  ISetFilesResult,
  IApplicationStorage,
} from './storage.interface';

@injectable()
export class CloudFileStorage implements IApplicationStorage {
  @lazyInject(DI_TYPES.CloudStorage) private cloudStorage: IApplicationStorage;

  public set(key: string, value: IMultiEntity): Promise<ISetFilesResult> {
    return this.process(value);
  }

  private process(entity: IMultiEntity): Promise<ISetFilesResult> {
    return toBlobEntities(...entity.add.map((entity0) => entity0.id as string))
      .then((entities) =>
        Promise.all<ISetFileResult[], IRemoveFileResult[]>([
          this.upload(entities),
          this.clear(entity)
        ]).then((result) => ({
          setFilesResults: result[0],
          removeFilesResults: result[1],
        }))
      );
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
