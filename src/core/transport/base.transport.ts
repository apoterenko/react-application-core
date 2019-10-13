import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  buildEncodedURI,
  defValuesFilter,
  downloadFileAsBlobUrl,
  join,
  orUndef,
} from '../util';
import { AnyT } from '../definitions.interface';
import {
  IEditableApiEntity,
  IEnvironment,
} from '../definition';
import { IEntity, StringNumberT } from '../definitions.interface';
import { INumberConverter } from '../converter';
import { ISettingsEntity } from '../settings';
import { ITransportRequestEntity, ITransport } from '../definition';
import { lazyInject, DI_TYPES } from '../di';
import { toStringParameter } from '../util';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.NumberConverter) protected readonly nc: INumberConverter;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;

  /**
   * @stable [29.08.2019]
   * @param {StringNumberT} value
   * @param {(value: number) => number} converter
   * @returns {number}
   */
  protected prepareNumberValue = (value: StringNumberT, converter?: (value: number) => number): number =>
    this.nc.numberParameter(value, converter)

  /**
   * @stable [13.10.2019]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected prepareStringValue = (value: AnyT): AnyT => toStringParameter(value);

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
    const requestParams = this.transport.makeRequestData(params);
    downloadFileAsBlobUrl(join([this.settings.downloadUrl, buildEncodedURI(requestParams)]));
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
