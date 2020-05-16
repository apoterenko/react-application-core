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
  FIELD_DISPLAY_EMPTY_VALUE,
  FieldConverterTypesEnum,
  IDatesRangeEntity,
  IExtendedLabeledValueEntity,
  IFieldConverter,
  IFieldConverterConfigEntity,
  INamedEntity,
  IPhoneConfigEntity,
  IPlaceEntity,
  ISelectOptionEntity,
  IUserEntity,
  MultiFieldEntityT,
  SelectValueT,
  TranslatorT,
} from '../../definition';
import {
  asPlaceEntity,
  CronEntity,
  FieldUtils,
  ifNotNilThanValue,
  isFn,
  isPrimitive,
  join,
  mapExtendedLabeledValueEntity,
  notEmptyValuesArrayFilter,
  notNilValuesArrayFilter,
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
  protected readonly converters = new Map<string, (value: AnyT) => AnyT>();

  /**
   * @stable [09.01.2020]
   */
  constructor() {
    this.placeEntityAsDisplayValue = this.placeEntityAsDisplayValue.bind(this);
    this.selectOptionEntityAsDisplayValue = this.selectOptionEntityAsDisplayValue.bind(this);
    this.selectOptionEntityAsId = this.selectOptionEntityAsId.bind(this);
    this.zipCodeEntityAsDisplayValue = this.zipCodeEntityAsDisplayValue.bind(this);

    this.register({
      from: FieldConverterTypesEnum.GEO_CODER_RESULT,
      to: FieldConverterTypesEnum.PLACE_ENTITY,
      converter: asPlaceEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.placeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.ZIP_CODE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.zipCodeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.PLACE_PARAMETER,
      converter: this.placeEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      converter: this.selectOptionEntityAsDisplayValue,
    });
    this.register({
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.ID,
      converter: this.selectOptionEntityAsId,
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
      to: FieldConverterTypesEnum.EXTENDED_LABELED_VALUE_ENTITY,
      converter: this.$fromNamedEntityToExtendedLabeledValueEntity.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_ENTITY,
      to: FieldConverterTypesEnum.ENTITIES,
      converter: this.$fromMultiFieldEntityToEntities.bind(this),
    });
    this.register({
      from: FieldConverterTypesEnum.MULTI_FIELD_ENTITY,
      to: FieldConverterTypesEnum.DEFINED_ENTITIES,
      converter: this.$fromMultiFieldEntityToDefinedEntities.bind(this),
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
   * @stable [24.12.2019]
   * @param {IPhoneConfigEntity<libphonenumber.PhoneNumberFormat>} config
   * @returns {string}
   */
  public convert(config: IFieldConverterConfigEntity): AnyT {
    const {value} = config;
    const converter = this.converter(config);
    if (!isFn(converter)) {
      throw new Error(`The converter is not registered! A config ${JSON.stringify(config)}:`);
    }
    return converter(value);
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {(value: AnyT) => AnyT}
   */
  public converter(config: IFieldConverterConfigEntity): (value: AnyT) => AnyT {
    return this.converters.get(this.asKey(config));
  }

  /**
   * @stable [14.03.2020]
   * @param {TValue} value
   * @returns {IUserEntity}
   */
  public fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IUserEntity {
    return this.convert({
      from: FieldConverterTypesEnum.OAUTH_JWT_DECODED_INFO,
      to: FieldConverterTypesEnum.USER_ENTITY,
      value,
    });
  }

  /**
   * @stable [22.04.2020]
   * @param {INamedEntity} value
   * @returns {IExtendedLabeledValueEntity}
   */
  public fromNamedEntityToExtendedLabeledValueEntity(value: INamedEntity): IExtendedLabeledValueEntity {
    return this.convert({
      from: FieldConverterTypesEnum.NAMED_ENTITY,
      to: FieldConverterTypesEnum.EXTENDED_LABELED_VALUE_ENTITY,
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
   * @param {MultiFieldEntityT<TEntity extends IEntity>} value
   * @returns {TEntity[]}
   */
  public fromMultiFieldEntityToEntities<TEntity extends IEntity = IEntity>(value: MultiFieldEntityT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_ENTITY,
      to: FieldConverterTypesEnum.ENTITIES,
      value,
    });
  }

  /**
   * @stable [16.05.2020]
   * @param {MultiFieldEntityT<TEntity extends IEntity>} value
   * @returns {TEntity[]}
   */
  public fromMultiFieldEntityToDefinedEntities<TEntity extends IEntity = IEntity>(value: MultiFieldEntityT<TEntity>): TEntity[] {
    return this.convert({
      from: FieldConverterTypesEnum.MULTI_FIELD_ENTITY,
      to: FieldConverterTypesEnum.DEFINED_ENTITIES,
      value,
    });
  }

  /**
   * @stable [28.01.2020]
   * @param {IPlaceEntity | string} placeEntity
   * @returns {string}
   */
  protected placeEntityAsDisplayValue(placeEntity: IPlaceEntity | string): string {
    if (R.isNil(placeEntity)) {
      return placeEntity;
    }
    if (isPrimitive(placeEntity)) {
      return placeEntity as string;
    }
    const placeEntityAsObject = placeEntity as IPlaceEntity;

    return join(
      notEmptyValuesArrayFilter(
        ...[
          `${placeEntityAsObject.streetNumber || ''} ${placeEntityAsObject.street || ''}`,
          placeEntityAsObject.city,
          placeEntityAsObject.region,
          placeEntityAsObject.country
        ].map((v) => (v || '').trim())
      ),
      ', '
    ) || placeEntityAsObject.formattedName || FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [28.01.2020]
   * @param {IPlaceEntity | string} placeEntity
   * @returns {string}
   */
  protected zipCodeEntityAsDisplayValue(placeEntity: IPlaceEntity | string): string {
    if (R.isNil(placeEntity)) {
      return placeEntity;
    }
    if (isPrimitive(placeEntity)) {
      return placeEntity as string;
    }
    const placeEntityAsObject = placeEntity as IPlaceEntity;
    return placeEntityAsObject.zipCode || FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [28.01.2020]
   * @param {SelectValueT} option
   * @returns {StringNumberT}
   */
  protected selectOptionEntityAsDisplayValue(option: SelectValueT): StringNumberT {
    if (R.isNil(option)) {
      return option;
    }
    if (isPrimitive(option)) {
      return option as StringNumberT;
    }
    const optionAsObject = option as ISelectOptionEntity;
    return R.isNil(optionAsObject.label)
      ? optionAsObject.value
      : this.t(optionAsObject.label, option);
  }

  /**
   * @stable [28.01.2020]
   * @param {SelectValueT} option
   * @returns {EntityIdT}
   */
  protected selectOptionEntityAsId(option: SelectValueT): EntityIdT {
    if (R.isNil(option)) {
      return option;
    }
    if (isPrimitive(option)) {
      return option as StringNumberT;
    }
    const optionAsObject = option as ISelectOptionEntity;
    return optionAsObject.value;
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
    return notNilValuesArrayFilter<DateTimeLikeTypeT | DatePeriodsEnum>(
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
   * @returns {IUserEntity}
   */
  private $fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IUserEntity {
    return {id: -1, name: 'Anonymous'};
  }

  /**
   * @stable [13.04.2020]
   * @nullable
   * @param {string} value
   * @returns {string}
   */
  private $fromCronExpressionToCronParameter(value: string): string {
    return ifNotNilThanValue(
      value,
      () => CronEntity.newInstance().fromExpression(value).toExpression(),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [22.04.2020]
   * @param {INamedEntity} value
   * @returns {IExtendedLabeledValueEntity}
   */
  private $fromNamedEntityToExtendedLabeledValueEntity(value: INamedEntity): IExtendedLabeledValueEntity {
    return ifNotNilThanValue(
      value,
      () => mapExtendedLabeledValueEntity(value),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [16.05.2020]
   * @param {MultiFieldEntityT<TEntity extends IEntity>} value
   * @returns {TEntity[]}
   */
  private $fromMultiFieldEntityToEntities<TEntity extends IEntity = IEntity>(value: MultiFieldEntityT<TEntity>): TEntity[] {
    return FieldUtils.asMultiFieldEntities(value);
  }

  /**
   * @stable [16.05.2020]
   * @param {MultiFieldEntityT<TEntity extends IEntity>} value
   * @returns {TEntity[]}
   */
  private $fromMultiFieldEntityToDefinedEntities<TEntity extends IEntity = IEntity>(value: MultiFieldEntityT<TEntity>): TEntity[] {
    return FieldUtils.asMultiFieldDefinedEntities(value);
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
