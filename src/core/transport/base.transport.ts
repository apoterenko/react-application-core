import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  buildUrl,
  defValuesFilter,
  downloadFileAsBlobUrl,
  ifNotNilThanValue,
  join,
  orNull,
  orUndef,
} from '../util';
import { AnyT } from '../definitions.interface';
import { IEditableApiEntity } from '../definition';
import { IEntity, StringNumberT, UNDEF_SYMBOL } from '../definitions.interface';
import { INumberConverter } from '../converter';
import { ISettings } from '../settings';
import { isString } from '../util';
import { ITransport, ITransportRequestEntity } from './transport.interface';
import { lazyInject, DI_TYPES } from '../di';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettings;
  @lazyInject(DI_TYPES.NumberConverter) protected readonly nc: INumberConverter;

  /**
   * @stable [29.08.2019]
   * @param {StringNumberT} value
   * @param {(value: number) => number} converter
   * @returns {number}
   */
  protected prepareNumberValue = (value: StringNumberT, converter?: (value: number) => number): number =>
    this.nc.numberParameter(value, converter)

  /**
   * @stable [10.08.2019]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected prepareStringValue = (value: AnyT): AnyT =>
    ifNotNilThanValue(value, () => {
      let resultValue = value;
      if (isString(value)) {
        resultValue = (value as string).trim();
      }
      return orNull(!R.isEmpty(resultValue), () => resultValue);
    }, UNDEF_SYMBOL)

  /**
   * @stable [25.07.2019]
   * @param {string} value
   * @returns {string}
   */
  protected preparePhoneValue(value: string): string {
    return orUndef(!R.isNil(value), () => value.replace(/\D/g, ''));
  }

  /**
   * @stable [31.08.2019]
   * @param {ITransportRequestEntity} params
   */
  protected downloadFile(params: ITransportRequestEntity): void {
    const requestParams = this.transport.makeRequestPayloadData(params);
    downloadFileAsBlobUrl(join([this.settings.downloadUrl, buildUrl(requestParams)]));
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
