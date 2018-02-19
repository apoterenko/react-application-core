import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../di';
import { IBlobEntity } from '../definition.interface';
import { IMultiEntity } from '../component/field';
import { toBlobEntities } from '../util';
import {
  IUploadFileResponse,
  IClearFileResponse,
  IProcessFilesResponse,
  IApplicationStorage,
} from './storage.interface';

@injectable()
export class CloudFileStorage implements IApplicationStorage {
  @lazyInject(DI_TYPES.CloudStorage) private cloudStorage: IApplicationStorage;

  public set(key: string, value: IMultiEntity): Promise<IProcessFilesResponse> {
    return this.process(value);
  }

  private process(entity: IMultiEntity): Promise<IProcessFilesResponse> {
    return toBlobEntities(entity.add.map((entity0) => entity0.id as string))
      .then((entities) =>
        Promise.all<IUploadFileResponse[], IClearFileResponse[]>([
          this.upload(entities),
          this.clear(entity)
        ]).then((result) => ({
          uploadResponses: result[0],
          clearResponses: result[1],
        }))
      );
  }

  private upload(entities: IBlobEntity[]): Promise<IUploadFileResponse[]> {
    const uploadTasks = entities.map<Promise<IUploadFileResponse>>(
      (entity) => this.cloudStorage.set(entity.id, entity.blob)
    );
    return Promise.all<IUploadFileResponse>(uploadTasks);
  }

  private clear(entity: IMultiEntity): Promise<IClearFileResponse[]> {
    const clearTasks = entity.remove.map<Promise<IClearFileResponse>>(
      (entity0) => this.cloudStorage.remove(entity0.id as string)
    );
    return Promise.all<IClearFileResponse>(clearTasks);
  }
}
