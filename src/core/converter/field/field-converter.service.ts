import { injectable } from 'inversify';

import {
  FieldConverterTypesEnum,
  IFieldConverter,
  IFieldConverterConfigEntity,
  IPhoneConfigEntity,
} from '../../definition';
import {
  asPlaceEntity,
  isFn,
  asPlaceEntityFormattedName,
} from '../../util';
import { AnyT } from '../../definitions.interface';

@injectable()
export class FieldConverter implements IFieldConverter {

  private readonly converters = new Map<string, (value: AnyT) => AnyT>();

  /**
   * @stable [09.01.2020]
   */
  constructor() {
    this.register({
      from: FieldConverterTypesEnum.GEO_CODER_RESULT,
      to: FieldConverterTypesEnum.PLACE_ENTITY,
      converter: asPlaceEntity,
    });
    this.register({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.STRING,
      converter: asPlaceEntityFormattedName,
    });
  }

  /**
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   */
  public register(config: IFieldConverterConfigEntity): void {
    this.converters.set(this.asKey(config), config.converter);
  }

  /**
   * @stable [24.12.2019]
   * @param {IPhoneConfigEntity<libphonenumber.PhoneNumberFormat>} config
   * @returns {string}
   */
  public convert(config: IFieldConverterConfigEntity): AnyT {
    const {value} = config;
    const converter = this.converters.get(this.asKey(config));
    if (!isFn(converter)) {
      throw new Error(`The converter is not registered! A config ${JSON.stringify(config)}:`);
    }
    return converter(value);
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
