import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  buildUrl,
  defValuesFilter,
  downloadAnchoredFile,
  ifNotNilThanValue,
  join,
  orUndef,
} from '../util';
import { lazyInject, DI_TYPES } from '../di';
import { ITransport } from './transport.interface';
import { IEntity, StringNumberT, UNDEF } from '../definitions.interface';
import { IEditableApiEntity } from '../definition';
import { ISettings } from '../settings';
import { IKeyValue } from '../definitions.interface';
import { INumberConverter } from '../converter';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettings;
  @lazyInject(DI_TYPES.NumberConverter) protected readonly nc: INumberConverter;

  /**
   * @stable [13.06.2019]
   * @param {StringNumberT} value
   * @returns {number}
   */
  protected prepareNumberValue(value: StringNumberT): number {
    return orUndef(!R.isNil(value), () => this.nc.number(value, false)) as number;
  }

  /**
   * @stable [11.09.2018]
   * @param {ITransportRequestPayloadDataEntity} params
   */
  protected downloadAnchoredFile(params: IKeyValue): void {
    const requestParams = this.transport.makeRequestPayloadData(params);
    downloadAnchoredFile(join([this.settings.downloadUrl, buildUrl(requestParams)]));
  }

  /**
   * @stable [26.02.2019]
   * @param {IEditableApiEntity<TEntity extends IEntity>} entity
   * @returns {Promise<TEntity extends IEntity>}
   */
  protected doSaveEntity<TEntity extends IEntity, TResult = TEntity>(entity: IEditableApiEntity<TEntity>): Promise<TResult> {
    const apiEntity = entity.apiEntity;
    return this.transport.request<TResult>({
      params: {
        ...apiEntity.changes as {},
        ...defValuesFilter(entity.extraParams),
        ...defValuesFilter({ id: apiEntity.entityId }),
      },
      name: apiEntity.newEntity ? entity.addApi : entity.editApi,
      operation: entity.operation,
    });
  }
}
