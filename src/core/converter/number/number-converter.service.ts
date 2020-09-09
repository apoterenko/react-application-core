import * as R from 'ramda';
import { injectable } from 'inversify';

import {
  lazyInject,
  DI_TYPES,
} from '../../di';
import { TypeUtils } from '../../util';
import { ISettingsEntity } from '../../settings';
import { INumberConverter } from './number-converter.interface';
import {
  EntityIdT,
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';

@injectable()
export class NumberConverter implements INumberConverter {

  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  private readonly defaultFormatter = new Intl.NumberFormat();
  private readonly currencyFormatter: Intl.NumberFormat;
  private readonly integerCurrencyFormatter: Intl.NumberFormat;

  /**
   * @stable [22.10.2018]
   */
  private readonly defaultCurrencyFormatOptions: Intl.NumberFormatOptions;

  private integerFormatter = new Intl.NumberFormat(this.locale, this.integerFormatOptions);
  private fractionalFormatter = new Intl.NumberFormat(this.locale, this.fractionalFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  private readonly defaultIntegerCurrencyFormatOptions: Intl.NumberFormatOptions;

  /**
   * @stable [22.10.2018]
   */
  constructor() {
    this.currency = this.currency.bind(this);
    this.format = this.format.bind(this);
    this.fractionalFormat = this.fractionalFormat.bind(this);
    this.id = this.id.bind(this);
    this.integerCurrency = this.integerCurrency.bind(this);
    this.integerFormat = this.integerFormat.bind(this);

    this.defaultCurrencyFormatOptions = {style: 'currency', currency: this.settings.currency.currency};
    this.currencyFormatter = new Intl.NumberFormat(this.locale, this.defaultCurrencyFormatOptions);
    this.defaultIntegerCurrencyFormatOptions = {
      ...this.defaultCurrencyFormatOptions,
      ...this.integerFormatOptions,
    };
    this.integerCurrencyFormatter = new Intl.NumberFormat(this.locale, this.defaultIntegerCurrencyFormatOptions);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param radix
   */
  public integer(value: StringNumberT, radix = 10): StringNumberT {
    if (TypeUtils.isNumber(value)) {
      return value;
    }
    const vAsString = value as string;
    if (R.isNil(vAsString)) {
      return value;
    }
    const result = parseInt(vAsString, radix);
    return isNaN(result) ? value : result;
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param returnString
   */
  public number(value: StringNumberT, returnString = true): StringNumberT {
    if (TypeUtils.isNumber(value)) {
      return value;
    }
    const vAsString = value as string;
    if (R.isNil(vAsString)) {
      return value;
    }
    const normalizedValue = vAsString.startsWith('-.')
      ? `-0${vAsString.substring(1, vAsString.length)}`
      : (
        vAsString.startsWith('.')
          ? `0${vAsString}`
          : vAsString
      );
    const result = parseFloat(normalizedValue);

    return (isNaN(result) || (!R.equals(String(result), normalizedValue) && returnString))
      ? normalizedValue
      : result;
  }

  /**
   * @stable [09.09.2020]
   * @param value
   */
  public asNumber(value: StringNumberT): number {
    return this.number(value, false) as number;
  }

  /**
   * @stable [29.08.2019]
   * @param {StringNumberT} value
   * @param {(value: number) => number} converter
   * @returns {number}
   */
  public numberParameter(value: StringNumberT, converter?: (value: number) => number): number {
    if (TypeUtils.isUndef(value)) {
      return UNDEF;
    }
    if (value === null) {
      return null;
    }
    if (TypeUtils.isString(value) && R.isEmpty((value as string).trim())) {
      return null;
    }
    const v = this.asNumber(value);
    return TypeUtils.isFn(converter) ? converter(v) : v;
  }

  public format(value: string | number, formatter: {format(...args): string} = this.defaultFormatter): string {
    return formatter.format(this.number(value));
  }

  public integerCurrency(value: StringNumberT): string {
    return this.integerCurrencyFormatter.format(this.number(value) as number);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   */
  public integerFormat(value: StringNumberT): string {
    return this.doFormat(value, this.integerFormatter);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   */
  public fractionalFormat(value: StringNumberT): string {
    return this.doFormat(value, this.fractionalFormatter);
  }

  public currency(value: number | string, options?: Intl.NumberFormatOptions): string {
    if (options) {
      const currencyFormatter0 = new Intl.NumberFormat(
          this.locale,
          {...this.defaultCurrencyFormatOptions, ...options}
      );
      return this.format(value, currencyFormatter0);
    }
    return this.format(value, this.currencyFormatter);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   */
  public id(value: EntityIdT): string {
    return `#${value}`;
  }

  /**
   * @stable [09.09.2020]
   * @param value
   */
  public internalId(value: EntityIdT): string {
    return `(#${value})`;
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param formatter
   * @private
   */
  private doFormat(value: StringNumberT, formatter: Intl.NumberFormat): string {
    return R.isNil(value) || !TypeUtils.isPositiveOrNegativeNumberLike(value)
      ? this.settings.numberConverter.na
      : formatter.format(this.asNumber(value));
  }

  /**
   * @stable [09.09.2020]
   * @private
   */
  private get currencyFormatOptions(): Intl.NumberFormatOptions {
    return {style: 'currency', currency: this.settings.currency.currency};
  }

  /**
   * @stable [09.09.2020]
   * @private
   */
  private get integerFormatOptions(): Intl.NumberFormatOptions {
    return this.settings.currency.integerFormatOptions;
  }

  /**
   * @stable [09.09.2020]
   * @private
   */
  private get fractionalFormatOptions(): Intl.NumberFormatOptions {
    return this.settings.currency.fractionalFormatOptions;
  }

  /**
   * @stable [09.09.2020]
   * @private
   */
  private get locale(): string {
    return this.settings.currency.locale;
  }
}
