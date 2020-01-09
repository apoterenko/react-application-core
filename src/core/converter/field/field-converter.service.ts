import { injectable } from 'inversify';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  FieldConverterTypesEnum,
  IFieldConverter,
  IFieldConverterConfigEntity,
  IPhoneConfigEntity,
} from '../../definition';
import {
  asPlaceEntity,
  asPlaceEntityFormattedName,
  isFn,
} from '../../util';
import { AnyT } from '../../definitions.interface';

@injectable()
export class FieldConverter implements IFieldConverter {
  private static readonly logger = LoggerFactory.makeLogger('FieldConverter');

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
   * @stable [09.01.2020]
   * @param {IFieldConverterConfigEntity} config
   * @returns {string}
   */
  private asKey(config: IFieldConverterConfigEntity): string {
    return `${config.from}-${config.to}`;
  }
}
