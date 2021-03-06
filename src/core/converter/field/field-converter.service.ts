import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  DatePeriodsEnum,
  DatesRangeValueT,
  DateTimeLikeTypeT,
  FieldConstants,
  FieldConverterTypesEnum,
  IDatesRangeEntity,
  IFieldConverter,
  IFieldConverterConfigEntity,
  IMultiFieldValueMergeConfigEntity,
  INamedEntity,
  IPlaceEntity,
  IPresetsRawDataLabeledValueEntity,
  IReduxUserEntity,
  ISimplePlaceEntity,
  MultiFieldValueT,
  NotMultiFieldValueT,
  PlaceEntityValueT,
  SelectValueT,
  TranslatorT,
} from '../../definition';
import {
  asPlaceEntity,
  ConditionUtils,
  CronEntity,
  FilterUtils,
  Mappers,
  MultiFieldUtils,
  PlaceUtils,
  SelectOptionUtils,
  TypeUtils,
  UuidUtils,
} from '../../util';
import {
  AnyT,
  EntityIdT,
  IEntity,
  StringNumberT,
  UNDEF_SYMBOL,
} from '../../definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';

@injectable()
export class FieldConverter implements IFieldConverter {
  private static readonly logger = LoggerFactory.makeLogger('FieldConverter');

  @lazyInject(DI_TYPES.Translate) protected readonly t: TranslatorT;
  protected readonly converters = new Map<string, (value: unknown) => unknown>();

  /**
   * @stable [09.01.2020]
   */
  constructor() {
    this.fromAutocompletePredictionToSimplePlaceEntity = this.fromAutocompletePredictionToSimplePlaceEntity.bind(this);
    this.fromGeoCodeResultToPlaceEntity = this.fromGeoCodeResultToPlaceEntity.bind(this);
    this.fromNamedEntityToRawDataLabeledValueEntity = this.fromNamedEntityToRawDataLabeledValueEntity.bind(this);
    this.zipCodeEntityAsDisplayValue = this.zipCodeEntityAsDisplayValue.bind(this);

    this.register({
      from: FieldConverterTypesEnum.GEO_CODER_RESULT,
      to: FieldConverterTypesEnum.PLACE_ENTITY,
      converter: this.$fromGeoCodeResultToPlaceEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.AUTOCOMPLETE_PREDICTION,
      to: FieldConverterTypesEnum.SIMPLE_PLACE_ENTITY,
      converter: this.$fromAutocompletePredictionToSimplePlaceEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.$fromPlaceEntityToDisplayValue.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.ZIP_CODE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.zipCodeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.PLACE_PARAMETER,
      converter: this.$fromPlaceEntityToPlaceParameter.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.$fromSelectValueToDisplayValue.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.ID,
      converter: this.$fromSelectValueToId.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      to: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      converter: this.datesRangeEntityAsDatesRangeValue,
    });
    this.register({
      from: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      to: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      converter: this.datesRangeValueAsDatesRangeEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.OAUTH_JWT_DECODED_INFO,
      to: FieldConverterTypesEnum.USER_ENTITY,
      converter: this.$fromOAuthJwtDecodedInfoToUserEntity.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.CRON_EXPRESSION,
      to: FieldConverterTypesEnum.CRON_PARAMETER,
      converter: this.$fromCronExpressionToCronParameter.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.NAMED_ENTITY,
      to: FieldConverterTypesEnum.RAW_DATA_LABELED_VALUE_ENTITY,
      converter: this.$fromNamedEntityToRawDataLabeledValueEntity.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.ENTITIES,
      converter: this.$fromMultiFieldValueToEntities.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.EDIT_ENTITIES,
      converter: this.$fromMultiFieldValueToEditEntities.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.DEFINED_ENTITIES,
      converter: this.$fromMultiFieldValueToDefinedEntities.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.TRUE_ENTITIES_OBJECT,
      converter: this.$fromMultiFieldValueToTrueEntitiesObject.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.RAW_VALUE,
      converter: this.$fromSelectValueToRawValue.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.NOT_MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.ENTITIES,
      converter: this.$fromNotMultiFieldValueToEntities.bind(this),
    });
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   */
  public register(config: IFieldConverterConfigEntity): void {
    this.converters.set(this.asKey(config), config.converter);

    FieldConverter.logger.debug(`[$FieldConverter][register] The converter has been registered successfully:`, config);
  }

  /**
   * @stable [13.12.2020]
   * @param config
   */
  public convert(config: IFieldConverterConfigEntity): AnyT {
    const {
      value,
    } = config;
    const converter = this.converter(config);

    if (!TypeUtils.isFn(converter)) {
      throw new Error(`The converter is not registered! A config ${JSON.stringify(config)}:`);
    }
    return converter(value);
  }

  /**
   * @stable [09.01.2020]
   * @param config
   */
  public converter(config: IFieldConverterConfigEntity): (value: AnyT) => AnyT {
    return this.converters.get(this.asKey(config));
  }

  /**
   * @stable [21.04.2021]
   * @param value
   */
  public fromSelectValueToId<TResult = EntityIdT>(value: SelectValueT): TResult {
    return this.convert({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.ID,
      value,
    });
  }

  /**
   * @stable [07.12.2020]
   * @param value
   */
  public fromSelectValueToPositiveOrNegativeNumberLikeId(value: SelectValueT): EntityIdT {
    return ConditionUtils.ifNotNilThanValue(
      this.fromSelectValueToId(value),
      (result) => ConditionUtils.orUndef(
        TypeUtils.isPositiveOrNegativeNumberLike(result),
        result
      ),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [28.10.2020]
   * @param value
   */
  public fromSelectValueToRawValue<TRawData = IEntity, TValue = EntityIdT>(value: SelectValueT<TRawData, TValue>): TRawData {
    return this.convert({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.RAW_VALUE,
      value,
    });
  }

  /**
   * @stable [18.05.2020]
   * @param {SelectValueT} value
   * @returns {StringNumberT}
   */
  public fromSelectValueToDisplayValue(value: SelectValueT): StringNumberT {
    return this.convert({
      from: FieldConverterTypesEnum.SELECT_VALUE,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      value,
    });
  }

  /**
   * @stable [17.05.2020]
   * @param {PlaceEntityValueT} value
   * @returns {string}
   */
  public fromPlaceEntityToDisplayValue(value: PlaceEntityValueT): string {
    return this.convert({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      value,
    });
  }

  /**
   * @stable [17.05.2020]
   * @param {PlaceEntityValueT} value
   * @returns {string}
   */
  public fromPlaceEntityToPlaceParameter(value: PlaceEntityValueT): string {
    return this.convert({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.PLACE_PARAMETER,
      value,
    });
  }

  /**
   * @stable [14.03.2020]
   * @param {TValue} value
   * @returns {IReduxUserEntity}
   */
  public fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IReduxUserEntity {
    return this.convert({
      from: FieldConverterTypesEnum.OAUTH_JWT_DECODED_INFO,
      to: FieldConverterTypesEnum.USER_ENTITY,
      value,
    });
  }

  /**
   * @stable [08.07.2020]
   * @param {INamedEntity} value
   * @returns {IPresetsRawDataLabeledValueEntity}
   */
  public fromNamedEntityToRawDataLabeledValueEntity(value: INamedEntity): IPresetsRawDataLabeledValueEntity {
    return this.convert({
      from: FieldConverterTypesEnum.NAMED_ENTITY,
      to: FieldConverterTypesEnum.RAW_DATA_LABELED_VALUE_ENTITY,
      value,
    });
  }

  /**
   * @stable [13.04.2020]
   * @nullable
   * @param {string} value
   * @returns {string}
   */
  public fromCronExpressionToCronParameter(value: string): string {
    return this.convert({
      from: FieldConverterTypesEnum.CRON_EXPRESSION,
      to: FieldConverterTypesEnum.CRON_PARAMETER,
      value,
    });
  }

  /**
   * @stable [16.05.2020]
   * @param value
   */
  public fromMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.ENTITIES,
      value,
    });
  }

  /**
   * @stable [13.12.2020]
   * @param value
   */
  public fromNotMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(value: NotMultiFieldValueT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.NOT_MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.ENTITIES,
      value,
    });
  }

  /**
   * @stable [28.03.2021]
   * @param value
   */
  public fromGeoCodeResultToPlaceEntity(value: google.maps.GeocoderResult | google.maps.places.PlaceResult): IPlaceEntity {
    return this.convert({
      from: FieldConverterTypesEnum.GEO_CODER_RESULT,
      to: FieldConverterTypesEnum.PLACE_ENTITY,
      value,
    });
  }

  /**
   * @stable [28.03.2021]
   * @param value
   */
  public fromAutocompletePredictionToSimplePlaceEntity(value: google.maps.places.AutocompletePrediction): ISimplePlaceEntity {
    return this.convert({
      from: FieldConverterTypesEnum.AUTOCOMPLETE_PREDICTION,
      to: FieldConverterTypesEnum.SIMPLE_PLACE_ENTITY,
      value,
    });
  }

  /**
   * @stable [04.09.2020]
   * @param value
   */
  public fromMultiFieldValueToTrueEntitiesObject<TEntity extends IEntity = IEntity>(
    value: IMultiFieldValueMergeConfigEntity<TEntity>): Record<EntityIdT, boolean> {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.TRUE_ENTITIES_OBJECT,
      value,
    });
  }

  /**
   * @stable [03.09.2020]
   * @param value
   */
  public fromMultiFieldValueToEditEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.EDIT_ENTITIES,
      value,
    });
  }

  /**
   * @stable [16.05.2020]
   * @param {MultiFieldValueT<TEntity extends IEntity>} value
   * @returns {TEntity[]}
   */
  public fromMultiFieldValueToDefinedEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_VALUE,
      to: FieldConverterTypesEnum.DEFINED_ENTITIES,
      value,
    });
  }

  /**
   * @stable [28.01.2020]
   * @param {PlaceEntityValueT} placeEntity
   * @returns {string}
   */
  protected zipCodeEntityAsDisplayValue(placeEntity: PlaceEntityValueT): string {
    if (R.isNil(placeEntity)) {
      return placeEntity;
    }
    if (TypeUtils.isPrimitive(placeEntity)) {
      return placeEntity as string;
    }
    const placeEntityAsObject = placeEntity as IPlaceEntity;
    return placeEntityAsObject.zipCode || FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [18.05.2020]
   * @param {SelectValueT} option
   * @returns {StringNumberT}
   */
  protected $fromSelectValueToDisplayValue(option: SelectValueT): StringNumberT {
    return SelectOptionUtils.fromSelectValueToDisplayValue(option);
  }

  /**
   * @stable [07.03.2020]
   * @param {IDatesRangeEntity} entity
   * @returns {DatesRangeValueT}
   */
  protected datesRangeEntityAsDatesRangeValue(entity: IDatesRangeEntity): DatesRangeValueT {
    if (R.isNil(entity)) {
      return entity;
    }
    return FilterUtils.notNilValuesArrayFilter<DateTimeLikeTypeT | DatePeriodsEnum>(
      entity.from,
      entity.to,
      entity.periodMode
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {DatesRangeValueT} value
   * @returns {IDatesRangeEntity}
   */
  protected datesRangeValueAsDatesRangeEntity(value: DatesRangeValueT): IDatesRangeEntity {
    if (R.isNil(value)) {
      return value;
    }
    return {
      from: value[0] as DateTimeLikeTypeT,
      to: value[1] as DateTimeLikeTypeT,
      periodMode: value[2] as DatePeriodsEnum,
    };
  }

  /**
   * @stable [14.03.2020]
   * @param {TValue} value
   * @returns {IReduxUserEntity}
   */
  private $fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IReduxUserEntity {
    return {id: -1, name: 'Anonymous'};
  }

  /**
   * @stable [13.04.2020]
   * @nullable
   * @param {string} value
   * @returns {string}
   */
  private $fromCronExpressionToCronParameter(value: string): string {
    return ConditionUtils.ifNotNilThanValue(
      value,
      () => CronEntity.newInstance().fromExpression(value).toExpression(),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [08.07.2020]
   * @param {INamedEntity} value
   * @returns {IPresetsRawDataLabeledValueEntity}
   */
  private $fromNamedEntityToRawDataLabeledValueEntity(value: INamedEntity): IPresetsRawDataLabeledValueEntity {
    return Mappers.namedEntityAsRawDataLabeledValueEntity(value);
  }

  /**
   * @stable [17.05.2020]
   * @param {PlaceEntityValueT} placeEntity
   * @returns {string}
   */
  private $fromPlaceEntityToDisplayValue(placeEntity: PlaceEntityValueT): string {
    return PlaceUtils.fromPlaceEntityToDisplayValue(placeEntity);
  }

  // TODO
  private $fromGeoCodeResultToPlaceEntity(placeEntity: google.maps.GeocoderResult | google.maps.places.PlaceResult): IPlaceEntity {
    return asPlaceEntity(placeEntity);
  }

  // TODO
  private $fromAutocompletePredictionToSimplePlaceEntity(value: google.maps.places.AutocompletePrediction): ISimplePlaceEntity {
    return {
      id: value.place_id || UuidUtils.uuid(),
      name: value.description,
    };
  }

  /**
   * @stable [17.05.2020]
   * @param {PlaceEntityValueT} placeEntity
   * @returns {string}
   */
  private $fromPlaceEntityToPlaceParameter(placeEntity: PlaceEntityValueT): string {
    return PlaceUtils.fromPlaceEntityToDisplayValue(placeEntity);
  }

  /**
   * @stable [29.08.2020]
   * @param value
   * @private
   */
  private $fromMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return MultiFieldUtils.multiFieldValueAsEntities(value);
  }

  /**
   * @stable [13.12.2020]
   * @param value
   */
  public $fromNotMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(value: NotMultiFieldValueT<TEntity>): TEntity[] {
    return MultiFieldUtils.notMultiFieldValueAsEntities(value);
  }

  /**
   * @stable [03.09.2020]
   * @param value
   * @private
   */
  private $fromMultiFieldValueToEditEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return MultiFieldUtils.multiFieldValueAsEditEntities(value);
  }

  /**
   * @stable [21.01.2021]
   * @param value
   */
  private $fromMultiFieldValueToDefinedEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[] {
    return MultiFieldUtils.multiFieldValueAsDefinedEntities(value);
  }

  /**
   * @stable [04.09.2020]
   * @param value
   * @private
   */
  private $fromMultiFieldValueToTrueEntitiesObject<TEntity extends IEntity = IEntity>(
    value: IMultiFieldValueMergeConfigEntity<TEntity>): Record<EntityIdT, boolean> {
    return MultiFieldUtils.multiFieldValueAsTrueEntitiesObject(value);
  }

  /**
   * @stable [18.05.2020]
   * @param value
   * @private
   */
  private $fromSelectValueToId(value: SelectValueT): EntityIdT {
    return SelectOptionUtils.fromSelectValueToId(value);
  }

  /**
   * @stable [28.10.2020]
   * @param value
   * @private
   */
  private $fromSelectValueToRawValue<TEntity = IEntity>(value: SelectValueT): TEntity {
    return SelectOptionUtils.fromSelectValueToRawValue(value);
  }

  /**
   * @stable [16.05.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {string}
   */
  private asKey(config: IFieldConverterConfigEntity): string {
    return `${config.from}->${config.to}`;
  }
}
