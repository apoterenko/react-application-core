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
  IEnvironment,
  ISelectOptionEntity,
  IUpdateEntityPayloadEntity,
} from '../definition';
import {
  EntityIdT,
  IEntity,
  StringNumberT,
} from '../definitions.interface';
import { INumberConverter } from '../converter';
import { ISettingsEntity } from '../settings';
import {
  FieldConverterTypesEnum,
  IFieldConverter,
  IPlaceEntity,
  ITransport,
  ITransportRequestEntity,
  MultiFieldEntityT,
} from '../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../di';
import {
  asMultiFieldMappedEntitiesIds,
  asValidCronExpression,
  toStringParameter,
} from '../util';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.NumberConverter) protected readonly nc: INumberConverter;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;
  @lazyInject(DI_TYPES.FieldConverter) protected readonly fieldConverter: IFieldConverter;

  /**
   * @stable [29.08.2019]
   * @param {StringNumberT} value
   * @param {(value: number) => number} converter
   * @returns {number}
   */
  protected prepareNumberValue = (value: StringNumberT, converter?: (value: number) => number): number =>
    this.nc.numberParameter(value, converter)

  /**
   * @stable [10.01.2020]
   * @param {IPlaceEntity} value
   * @returns {string}
   */
  protected preparePlaceParameterValue = (value: IPlaceEntity): string =>
    this.fieldConverter.convert({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.PLACE_PARAMETER,
      value,
    })

  /**
   * @stable [30.01.2020]
   * @param {ISelectOptionEntity | EntityIdT} value
   * @returns {string}
   */
  protected prepareSelectOptionEntityAsId = (value: ISelectOptionEntity | EntityIdT): string =>
    this.fieldConverter.convert({
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.ID,
      value,
    })

  /**
   * @stable [16.12.2019]
   * @param {string} value
   * @returns {string}
   */
  protected prepareCronValue = (value: string): string => asValidCronExpression(value);

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
   * @stable [26.12.2019]
   * @param {MultiFieldEntityT | EntityIdT[]} value
   * @returns {EntityIdT[]}
   */
  protected prepareMultiEntitiesIdsValue(value: MultiFieldEntityT | EntityIdT[]): EntityIdT[] {
    return asMultiFieldMappedEntitiesIds(value);
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
   * @stable [23.12.2019]
   * @param {IUpdateEntityPayloadEntity<TEntity extends IEntity>} entity
   * @returns {Promise<TResult>}
   */
  protected doSaveEntity<TEntity extends IEntity, TResult = TEntity>(entity: IUpdateEntityPayloadEntity<TEntity>): Promise<TResult> {
    const apiEntity = entity.apiEntity;
    return this.transport.request<TResult>({
      params: {
        ...(entity.alwaysSendChanges ? apiEntity.changes : apiEntity.diff) as {},
        ...defValuesFilter(entity.extraParams),
        ...defValuesFilter({id: apiEntity.entityId}),
      },
      name: apiEntity.newEntity ? entity.addApi : entity.editApi,
      operation: entity.operation,
    });
  }
}
