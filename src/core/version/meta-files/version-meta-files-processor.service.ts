import { injectable } from 'inversify';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, lazyInject } from '../../di';
import { ISettings } from '../../settings';
import { isObjectNotEmpty, nvl } from '../../util';
import {
  IStorage,
  ITransport,
  IVersionMetaFilesEntity,
  IVersionProcessor,
  STORAGE_APP_UUID_KEY,
  TransportMethodsEnum,
} from '../../definition';

@injectable()
export class VersionMetaFilesProcessor implements IVersionProcessor {
  private static readonly logger = LoggerFactory.makeLogger('VersionMetaFilesProcessor');

  @lazyInject(DI_TYPES.NotVersionedSessionStorage) protected readonly notVersionedSessionStorage: IStorage;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettings;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;

  /**
   * @stable [16.09.2019]
   * @param {boolean} isApplicationAuthorized
   * @returns {Promise<boolean>}
   */
  public async hasBeenUpdated(isApplicationAuthorized: boolean): Promise<boolean> {
    const metaFilesUrl = this.settings.metaFilesUrl;
    if (!isObjectNotEmpty(metaFilesUrl)) {
      VersionMetaFilesProcessor.logger.warn('[$VersionMetaFilesProcessor][needToBeUpdated] The setting url is empty!');
      return false;
    }
    const storage = this.getStorage();

    let data;
    try {
      data = await Promise.all([
        storage.get(STORAGE_APP_UUID_KEY),
        this.transport.request({url: metaFilesUrl, method: TransportMethodsEnum.GET, noAuth: true})
      ]);
    } catch (e) {
      VersionMetaFilesProcessor.logger.error('[$VersionMetaFilesProcessor][needToBeUpdated] Error:', e);
      return false;
    }

    const localAppUuid: string = data[0];
    const remoteMetaData: IVersionMetaFilesEntity = data[1];
    const remoteAppUuid = remoteMetaData.uuid;

    if (R.isNil(nvl(localAppUuid, remoteAppUuid))) {
      if (R.isNil(remoteAppUuid)) {
        VersionMetaFilesProcessor.logger.warn('[$VersionMetaFilesProcessor][needToBeUpdated] Remote app uuid is empty!');
      }
      return false;
    }

    // Set remote app uuid to the local storage
    await storage.set(STORAGE_APP_UUID_KEY, remoteAppUuid);

    if (!isApplicationAuthorized) {
      return false;
    }

    if (isObjectNotEmpty(localAppUuid)
      && isObjectNotEmpty(remoteAppUuid)
      && !R.equals(localAppUuid, remoteAppUuid)) {

      // After F5, to exclude the inconsistent state of App - need redirect to initial path

      VersionMetaFilesProcessor.logger.debug(
        '[$VersionMetaFilesProcessor][$needToBeUpdated] Need redirect to the initial path because of a new release.'
      );
      return true;
    } else {
      VersionMetaFilesProcessor.logger.debug(
        '[$VersionMetaFilesProcessor][$needToBeUpdated] No new app version has been revealed.'
      );
    }
    return false;
  }

  /**
   * @stable [16.09.2019]
   * @returns {IStorage}
   */
  protected getStorage(): IStorage {
    return this.notVersionedSessionStorage;
  }
}
