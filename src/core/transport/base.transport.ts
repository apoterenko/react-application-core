import { injectable } from 'inversify';

import { defValuesFilter, downloadAnchoredFile, join, buildUrl } from '../util';
import { lazyInject, DI_TYPES } from '../di';
import { ITransport } from './transport.interface';
import { IEntity } from '../definitions.interface';
import { IEditableApiEntity } from '../entities-definitions.interface';
import { ISettings } from '../settings';
import { IKeyValue } from '../definitions.interface';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Transport) protected transport: ITransport;
  @lazyInject(DI_TYPES.Settings) protected settings: ISettings;

  /**
   * @stable [11.09.2018]
   * @param {ITransportRequestPayloadDataEntity} params
   */
  protected downloadAnchoredFile(params: IKeyValue): void {
    const requestParams = this.transport.makeRequestPayloadData(params);
    downloadAnchoredFile(join([this.settings.downloadUrl, buildUrl(requestParams)]));
  }

  /**
   * @stable - 12.04.2018
   * @param {IEditableApiEntity<TEntity extends IEntity>} entity
   * @returns {Promise<TEntity extends IEntity>}
   */
  protected doSaveEntity<TEntity extends IEntity>(entity: IEditableApiEntity<TEntity>): Promise<TEntity> {
    const apiEntity = entity.apiEntity;
    return this.transport.request<TEntity>({
      params: {
        ...apiEntity.changes as {},
        ...defValuesFilter(entity.extraParams),
        ...defValuesFilter({ id: apiEntity.id }),
      },
      name: apiEntity.isNew ? entity.addApi : entity.editApi,
      operation: apiEntity.operation,
    });
  }
}
