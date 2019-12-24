import * as R from 'ramda';
import { injectable } from 'inversify';
import { PhoneNumberFormat as PNF, PhoneNumberUtil as PNU } from 'google-libphonenumber';

import { lazyInject, DI_TYPES } from '../../di';
import { isNumber, isString, isFn, isUndef } from '../../util';
import { ISettingsEntity } from '../../settings';
import { INumberConverter } from './number-converter.interface';
import { EntityIdT, StringNumberT, UNDEF } from '../../definitions.interface';

@injectable()
export class NumberConverter implements INumberConverter {

  @lazyInject(DI_TYPES.Settings) private settings: ISettingsEntity;
  private defaultFormatter = new Intl.NumberFormat();
  private phoneUtilInstance = PNU.getInstance();

  /**
   * @stable [22.10.2018]
   */
  private defaultCurrencyFormatOptions = {style: 'currency', currency: this.settings.currency.uiCurrency};
  private currencyFormatter = new Intl.NumberFormat(this.uiLocale, this.defaultCurrencyFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  private defaultIntegerFormatOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };
  private integerFormatter = new Intl.NumberFormat(this.uiLocale, this.defaultIntegerFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  private defaultFractionalFormatOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };
  private fractionalFormatter = new Intl.NumberFormat(this.uiLocale, this.defaultFractionalFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  private defaultIntegerCurrencyFormatOptions: Intl.NumberFormatOptions = {
    ...this.defaultCurrencyFormatOptions,
    ...this.defaultIntegerFormatOptions,
  };
  private integerCurrencyFormatter = new Intl.NumberFormat(this.uiLocale, this.defaultIntegerCurrencyFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  constructor() {
    this.id = this.id.bind(this);
    this.format = this.format.bind(this);
    this.currency = this.currency.bind(this);
    this.integerCurrency = this.integerCurrency.bind(this);
    this.integerFormat = this.integerFormat.bind(this);
    this.fractionalFormat = this.fractionalFormat.bind(this);
  }

  /**
   * @stable [28.09.2018]
   * @param {StringNumberT} value
   * @param {number} radix
   * @returns {StringNumberT}
   */
  public integer(value: StringNumberT, radix = 10): StringNumberT {
    if (isNumber(value)) {
      return value;
    }
    const valueAsString = value as string;
    const result = parseInt(valueAsString, radix);
    return isNaN(result) ? value : result;
  }

  /**
   * @stable [19.12.2019]
   * @param {StringNumberT} value
   * @param {boolean} returnString
   * @returns {StringNumberT}
   */
  public number(value: StringNumberT, returnString = true): StringNumberT {
    if (isNumber(value)) {
      return value;
    }
    const vAsString = value as string;
    if (R.isNil(vAsString)) {
      return value;
    }
    const normalizedValue = vAsString.startsWith('.') ? `0${vAsString}` : vAsString;
    const result = parseFloat(normalizedValue);

    return (isNaN(result) || (!R.equals(String(result), normalizedValue) && returnString))
      ? normalizedValue
      : result;
  }

  /**
   * @stable [29.08.2019]
   * @param {StringNumberT} value
   * @param {(value: number) => number} converter
   * @returns {number}
   */
  public numberParameter(value: StringNumberT, converter?: (value: number) => number): number {
    if (isUndef(value)) {
      return UNDEF;
    }
    if (value === null) {
      return null;
    }
    if (isString(value) && R.isEmpty((value as string).trim())) {
      return null;
    }
    const v = this.number(value, false) as number;
    return isFn(converter) ? converter(v) : v;
  }

  public format(value: string | number, formatter: {format(...args): string} = this.defaultFormatter): string {
    return formatter.format(this.number(value));
  }

  public integerCurrency(value: StringNumberT): string {
    return this.integerCurrencyFormatter.format(this.number(value) as number);
  }

  /**
   * @stable [22.10.2018]
   * @param {StringNumberT} value
   * @returns {string}
   */
  public integerFormat(value: StringNumberT): string {
    return this.integerFormatter.format(this.number(value, false) as number);
  }

  /**
   * @stable [22.10.2018]
   * @param {StringNumberT} value
   * @returns {string}
   */
  public fractionalFormat(value: StringNumberT): string {
    return this.fractionalFormatter.format(this.number(value, false) as number);
  }

  public currency(value: number | string, options?: Intl.NumberFormatOptions): string {
    if (options) {
      const currencyFormatter0 = new Intl.NumberFormat(
          this.uiLocale,
          {...this.defaultCurrencyFormatOptions, ...options}
      );
      return this.format(value, currencyFormatter0);
    }
    return this.format(value, this.currencyFormatter);
  }

  /**
   * @stable [01.09.2018]
   * @param {EntityIdT} value
   * @returns {string}
   */
  public id(value: EntityIdT): string {
    return `#${value}`;
  }

  /**
   * @stable [01.09.2018]
   * @param {EntityIdT} value
   * @returns {string}
   */
  public internalId(value: EntityIdT): string {
    return `(#${value})`;
  }

  public phone(value: number | string, phoneNumberFormat: PNF = PNF.INTERNATIONAL): string {
    if (!value) {
      return '';
    }
    const v = isString(value) ? value as string : String(value);
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtilInstance.parse(v, this.settings.phone.countryAbbr);
    } catch (e) {
      return v;
    }
    return this.phoneUtilInstance.isValidNumber(phoneNumber)
        ? this.phoneUtilInstance.format(phoneNumber, phoneNumberFormat)
        : v;
  }

  /**
   * @stable [22.10.2018]
   * @returns {string}
   */
  private get uiLocale(): string {
    return this.settings.currency.uiLocale;
  }
}
