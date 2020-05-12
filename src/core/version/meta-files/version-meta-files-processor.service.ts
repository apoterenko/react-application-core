import { injectable } from 'inversify';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import { ISettingsEntity } from '../../settings';
import { isObjectNotEmpty } from '../../util';
import { VERSION_PROCESSOR_LOADING_INFO_OPERATION } from '../../operation';
import {
  IStorage,
  ITransport,
  IVersionMetaFilesEntity,
  IVersionProcessor,
  TransportMethodsEnum,
} from '../../definition';

@injectable()
export class VersionMetaFilesProcessor implements IVersionProcessor {
  private static readonly logger = LoggerFactory.makeLogger('VersionMetaFilesProcessor');

  @lazyInject(DI_TYPES.NotVersionedSessionStorage) protected readonly notVersionedSessionStorage: IStorage;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;

  /**
   * @stable [16.09.2019]
   * @returns {Promise<boolean>}
   */
  public async processNewVersionUuidAndGetResult(): Promise<boolean> {
    const metaFilesUrl = this.settings.metaFilesUrl;
    if (!isObjectNotEmpty(metaFilesUrl)) {
      VersionMetaFilesProcessor.logger.warn(
        '[$VersionMetaFilesProcessor][processNewVersionUuidAndGetResult] The setting url is empty!'
      );
      return false;
    }
    const storage = this.getStorage();

    let data;
    try {
      data = await Promise.all([
        storage.get(this.versionUuidKeyName),

        // TODO Move to core Api package
        this.transport.request({
          url: metaFilesUrl,
          method: TransportMethodsEnum.GET,
          noAuth: true,
          operation: VERSION_PROCESSOR_LOADING_INFO_OPERATION,
        })
      ]);
    } catch (e) {
      VersionMetaFilesProcessor.logger.error(
        '[$VersionMetaFilesProcessor][processNewVersionUuidAndGetResult] Error:', e
      );
      return false;
    }

    const localAppUuid: string = data[0];
    const remoteMetaData: IVersionMetaFilesEntity = data[1];
    const remoteAppUuid = remoteMetaData.uuid;

    if (!isObjectNotEmpty(remoteAppUuid)) {
      // The server is unavailable
      VersionMetaFilesProcessor.logger.warn(
        '[$VersionMetaFilesProcessor][processNewVersionUuidAndGetResult] The remote app uuid is empty!'
      );
      return false;
    }

    // Apply remote app uuid to local storage
    await storage.set(this.versionUuidKeyName, remoteAppUuid);

    if (isObjectNotEmpty(localAppUuid) && !R.equals(localAppUuid, remoteAppUuid)) {

      // After F5, to exclude the inconsistent state of App - need redirect to initial path
      VersionMetaFilesProcessor.logger.debug(
        '[$VersionMetaFilesProcessor][$processNewVersionUuidAndGetResult] Need redirect to the initial ' +
        'path because of a new release.'
      );
      return true;
    } else {
      VersionMetaFilesProcessor.logger.debug(
        '[$VersionMetaFilesProcessor][$processNewVersionUuidAndGetResult] No new app version has been revealed.'
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

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  protected get versionUuidKeyName(): string {
    return this.settings.storage.versionUuidKeyName;
  }
}
