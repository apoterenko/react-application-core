import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  FieldConverterTypesEnum,
  IFieldConverter,
  IFieldConverterConfigEntity,
  IPhoneConfigEntity,
  IPlaceEntity,
  ISelectOptionEntity,
  TranslatorT,
} from '../../definition';
import {
  asPlaceEntity,
  isFn,
  isPrimitive,
  join,
} from '../../util';
import {
  AnyT,
  EntityIdT,
  StringNumberT,
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
      [
        join([placeEntityAsObject.streetNumber, placeEntityAsObject.street], ' '),
        placeEntityAsObject.city,
        placeEntityAsObject.region,
        placeEntityAsObject.country
      ],
      ', '
    ) || placeEntityAsObject.formattedName;
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
    return placeEntityAsObject.zipCode;
  }

  /**
   * @stable [28.01.2020]
   * @param {ISelectOptionEntity | StringNumberT} option
   * @returns {StringNumberT}
   */
  protected selectOptionEntityAsDisplayValue(option: ISelectOptionEntity | StringNumberT): StringNumberT {
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
   * @param {ISelectOptionEntity | StringNumberT} option
   * @returns {EntityIdT}
   */
  protected selectOptionEntityAsId(option: ISelectOptionEntity | StringNumberT): EntityIdT {
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
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {string}
   */
  private asKey(config: IFieldConverterConfigEntity): string {
    return `${config.from}-${config.to}`;
  }
}
