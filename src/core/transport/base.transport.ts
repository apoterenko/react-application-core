import { injectable } from 'inversify';

import { defValuesFilter, downloadAnchoredFile, join, buildUrl } from '../util';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationTransport, ITransportRequestParamsEntity } from './transport.interface';
import { IEntity } from '../definitions.interface';
import { IEditableApiEntity } from '../entities-definitions.interface';
import { IApplicationSettings } from '../settings';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Transport) protected transport: IApplicationTransport;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;

  /**
   * @stable [11.09.2018]
   * @param {ITransportRequestParamsEntity} params
   */
  protected downloadAnchoredFile(params: ITransportRequestParamsEntity): void {
    const requestParams = this.transport.toRequestParams(params);
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
