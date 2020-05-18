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
  isObjectNotEmpty,
  nvl,
  TypeUtils,
} from '../../util';

@injectable()
export class PhoneConverter implements IPhoneConverter<PNF> {

  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  private readonly phoneUtilInstance = PNU.getInstance();

  /**
   * @stable [24.12.2019]
   * @param {IPhoneConfigEntity<libphonenumber.PhoneNumberFormat>} config
   * @returns {string}
   */
  public format(config: IPhoneConfigEntity<PNF>): string {
    const {value, format} = config;
    if (!isObjectNotEmpty(value)) {
      return '';
    }
    const phoneNumber = this.parse(config);
    const valueAsString = TypeUtils.isString(value) ? value as string : String(value);
    try {
      return this.phoneUtilInstance.isValidNumber(phoneNumber)
        ? this.phoneUtilInstance.format(phoneNumber, format)
        : valueAsString;
    } catch (e) {
      return valueAsString;
    }
  }

  /**
   * @stable [24.12.2019]
   * @param {IPhoneConfigEntity<libphonenumber.PhoneNumberFormat>} config
   * @returns {libphonenumber.PhoneNumber}
   */
  public parse(config: IPhoneConfigEntity<PNF>): PN {
    const {value, countryAbbr} = config;
    if (R.isNil(value)) {
      return null;
    }
    const v = TypeUtils.isString(value) ? value as string : String(value);
    try {
      return this.phoneUtilInstance.parse(v, nvl(countryAbbr, this.settings.phone.countryAbbr));
    } catch (e) {
      return null;
    }
  }
}
