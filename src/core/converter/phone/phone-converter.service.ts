import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  PhoneNumber as PN,
  PhoneNumberFormat as PNF,
  PhoneNumberUtil as PNU,
} from 'google-libphonenumber';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IPhoneConfigEntity,
  IPhoneConverter,
} from '../../definition';
import { ISettingsEntity } from '../../settings';
import {
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
  TypeUtils,
} from '../../util';
import { UNDEF_SYMBOL } from '../../definitions.interface';

@injectable()
export class PhoneConverter implements IPhoneConverter<PNF> {

  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  private readonly phoneUtilInstance = PNU.getInstance();

  /**
   * @stable [19.09.2020]
   * @param config
   */
  public format(config: IPhoneConfigEntity<PNF>): string {
    const {
      value,
      format,
    } = config;
    if (ObjectUtils.isObjectEmpty(value)) {
      return '';
    }

    const phoneNumber = this.parse(config);
    try {
      return this.phoneUtilInstance.isValidNumber(phoneNumber)
        ? this.phoneUtilInstance.format(phoneNumber, format)
        : `${value}`;
    } catch (e) {
      return `${value}`;
    }
  }

  /**
   * @stable [19.09.2020]
   * @param config
   */
  public parse(config: IPhoneConfigEntity<PNF>): PN {
    const {
      countryAbbr,
      value,
    } = config;
    if (R.isNil(value)) {
      return null;
    }

    const $value = TypeUtils.isString(value) ? value as string : String(value);
    try {
      return this.phoneUtilInstance.parse($value, NvlUtils.nvl(countryAbbr, this.region));
    } catch (e) {
      return null;
    }
  }

  /**
   * @stable [19.09.2020]
   * @param config
   */
  public phoneParameter(config: IPhoneConfigEntity<PNF>): string {
    return ConditionUtils.ifNotEmptyThanValue(
      config.value,
      () => (
        this.format({
          format: PNF.INTERNATIONAL,
          ...config,
        }).replace(/\D/g, '')
      ),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [19.09.2020]
   */
  public get countryCodeForRegion(): string {
    return this.phoneUtilInstance.getCountryCodeForRegion(this.region);
  }

  /**
   * @stable [19.09.2020]
   */
  private get region(): string {
    return this.settings.phone.countryAbbr;
  }
}
