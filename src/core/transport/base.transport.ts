import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  buildEncodedURI,
  defValuesFilter,
  downloadFileAsBlobUrl,
  join,
  NumberUtils,
  orUndef,
  StringUtils,
} from '../util';
import { AnyT } from '../definitions.interface';
import {
  DefaultEntities,
  IEnvironment,
  INamedEntity,
  IPresetsRawDataLabeledValueEntity,
  IUpdateEntity,
} from '../definition';
import {
  EntityIdT,
  IEntity,
  IKeyValue,
  StringNumberT,
} from '../definitions.interface';
import { INumberConverter } from '../converter';
import { ISettingsEntity } from '../settings';
import {
  IFieldConverter,
  IMultiEntityStorageSetEntity,
  IPlaceEntity,
  IStorage,
  ITransport,
  ITransportRequestEntity,
  MultiFieldSingleValueT,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  SelectValueT,
} from '../definition';
import {
  DI_TYPES,
  getDateConverter,
  getMultiEntityDatabaseStorage,
  lazyInject,
} from '../di';
import {
  asMultiFieldMappedEntitiesIds,
  entitiesAsStorageTasks,
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
   * @stable [16.05.2020]
   * @param {IUpdateEntity<TEntity extends IEntity, TExtraParams>} entity
   * @returns {Promise<TResult>}
   */
  protected doSaveEntity<TEntity extends IEntity = IEntity,
    TResult = TEntity,
    TExtraParams = IKeyValue>(entity: IUpdateEntity<TEntity, TExtraParams>): Promise<TResult> {

    const {
      newEntity,
      entityId,
      diff,
    } = entity.apiEntity;

    return this.transport.request<TResult>({
      params: {
        ...diff as {},
        ...defValuesFilter(entity.extraParams),
        ...defValuesFilter({id: entityId}),
      },
      name: newEntity ? entity.addApi : entity.editApi,
      operation: entity.operation,
    });
  }

  /**
   * @stable [17.05.2020]
   * @param {IPlaceEntity} value
   * @returns {string}
   */
  protected fromPlaceEntityToPlaceParameter = (value: IPlaceEntity): string =>
    this.fieldConverter.fromPlaceEntityToPlaceParameter(value)

  /**
   * @stable [29.08.2020]
   * @param entity
   */
  protected fromMultiFieldValueToEntities =
    <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] =>
      this.fieldConverter.fromMultiFieldValueToEntities(entity)

  /**
   * @stable [01.09.2020]
   * @param value
   */
  protected fromNamedEntityToRawDataLabeledValueEntity = (value: INamedEntity): IPresetsRawDataLabeledValueEntity =>
    this.fieldConverter.fromNamedEntityToRawDataLabeledValueEntity(value)

  /**
   * @stable [23.08.2020]
   * @param entity
   */
  protected fromMultiFieldValueToDefinedEntities =
    <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] =>
      this.fieldConverter.fromMultiFieldValueToDefinedEntities(entity)

  /**
   * @stable [01.09.2020]
   * @param value
   */
  protected fromSelectValueToId = (value: SelectValueT): EntityIdT =>
    this.fieldConverter.fromSelectValueToId(value)

  /**
   * @stable [04.08.2020]
   * @param value
   * @param converter
   */
  protected numberParameter = (value: StringNumberT, converter?: (value: number) => number): number =>
    this.nc.numberParameter(value, converter)

  /**
   * @stable [14.08.2020]
   * @param value
   */
  protected stringParameter = (value: AnyT): AnyT => StringUtils.asStringParameter(value);

  /**
   * @stable [14.08.2020]
   * @param value
   */
  protected queryParameter = (value: string): string => StringUtils.asStringParameter(value, true);

  /**
   * @stable [01.09.2020]
   * @param value
   * @param precision
   */
  protected roundByPrecision = (value: number, precision = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
    NumberUtils.roundByPrecision(value, precision);

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
   * @param {MultiFieldValueOrEntityIdT} value
   * @returns {EntityIdT[]}
   */
  protected prepareMultiEntitiesIdsValue(value: MultiFieldValueT | EntityIdT[]): EntityIdT[] {
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
    ...fieldsValuesResolvers: ((entity: TEntity) => MultiFieldSingleValueT)[]): Promise<IMultiEntityStorageSetEntity[]> {

    return entitiesAsStorageTasks<TEntity>(
      entity,
      fieldsValuesResolvers,
      (fileName, file) => this.multiEntityDatabaseStorage.set(fileName, file)
    );
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
