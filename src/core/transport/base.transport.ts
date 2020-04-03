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
  IMultiEntityStorageSetEntity,
  IPlaceEntity,
  IStorage,
  ITransport,
  ITransportRequestEntity,
  MultiFieldEntityT,
  MultiFieldSingleValueT,
} from '../definition';
import {
  DI_TYPES,
  getDateConverter,
  getMultiEntityDatabaseStorage,
  lazyInject,
} from '../di';
import {
  asMultiFieldMappedEntitiesIds,
  asValidCronExpression,
  entitiesAsStorageTasks,
  toStringParameter,
} from '../util';
import { IDateConverter } from '../converter';

@injectable()
export class BaseTransport {
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.FieldConverter) protected readonly fieldConverter: IFieldConverter;
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
   * @stable [03.04.2020]
   * @param {TEntity} entity
   * @param {Array<(entity: TEntity) => MultiFieldSingleValueT>} fieldsValuesResolvers
   * @returns {Promise<IMultiEntityStorageSetEntity[]>}
   */
  protected doSaveMultiEntities<TEntity>(
    entity: TEntity,
    ...fieldsValuesResolvers: Array<(entity: TEntity) => MultiFieldSingleValueT>): Promise<IMultiEntityStorageSetEntity[]> {

    return entitiesAsStorageTasks<TEntity>(
      entity,
      fieldsValuesResolvers,
      (fileName, file) => this.multiEntityDatabaseStorage.set(fileName, file)
    );
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

  /**
   * @lazy
   * @stable [03.04.2020]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return getDateConverter();
  }

  /**
   * @lazy
   * @stable [03.04.2020]
   * @returns {IStorage}
   */
  private get multiEntityDatabaseStorage(): IStorage {
    return getMultiEntityDatabaseStorage();
  }
}
