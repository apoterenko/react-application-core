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
  private readonly integerCurrencyFormatter: Intl.NumberFormat;
  private readonly fractionalCurrencyFormatter: Intl.NumberFormat;
  private readonly integerFormatter = new Intl.NumberFormat(this.locale, this.integerFormatOptions);
  private readonly fractionalFormatter = new Intl.NumberFormat(this.locale, this.fractionalFormatOptions);

  /**
   * @stable [22.10.2018]
   */
  constructor() {
    this.format = this.format.bind(this);
    this.formatFractional = this.formatFractional.bind(this);
    this.formatFractionalCurrency = this.formatFractionalCurrency.bind(this);
    this.formatInteger = this.formatInteger.bind(this);
    this.formatIntegerCurrency = this.formatIntegerCurrency.bind(this);
    this.id = this.id.bind(this);

    /* @stable [09.09.2020] */
    this.integerCurrencyFormatter = new Intl.NumberFormat(this.locale, {
      ...this.currencyFormatOptions,
      ...this.integerFormatOptions,
    });

    /* @stable [09.09.2020] */
    this.fractionalCurrencyFormatter = new Intl.NumberFormat(this.locale, {
      ...this.currencyFormatOptions,
      ...this.fractionalFormatOptions,
    });
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

  /**
   * @stable [09.09.2020]
   * @param value
   * @param formatter
   * @param options
   */
  public format(value: string | number, formatter = this.defaultFormatter, options?: Intl.NumberFormatOptions): string {
    return this.doFormat(value, formatter, options);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param options
   */
  public formatInteger(value: StringNumberT, options?: Intl.NumberFormatOptions): string {
    return this.doFormat(value, this.integerFormatter, options);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param options
   */
  public formatFractional(value: StringNumberT, options?: Intl.NumberFormatOptions): string {
    return this.doFormat(value, this.fractionalFormatter, options);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param options
   */
  public formatIntegerCurrency(value: StringNumberT, options?: Intl.NumberFormatOptions): string {
    return this.doFormat(value, this.integerCurrencyFormatter, options);
  }

  /**
   * @stable [09.09.2020]
   * @param value
   * @param options
   */
  public formatFractionalCurrency(value: StringNumberT, options?: Intl.NumberFormatOptions): string {
    return this.doFormat(value, this.fractionalCurrencyFormatter, options);
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
   * @param options
   * @private
   */
  private doFormat(value: StringNumberT,
                   formatter: Intl.NumberFormat,
                   options?: Intl.NumberFormatOptions): string {
    return R.isNil(value) || !TypeUtils.isPositiveOrNegativeNumberLike(value)
      ? this.settings.numberConverter.na
      : (
        R.isNil(options)
          ? formatter.format(this.asNumber(value))
          : (
            new Intl.NumberFormat(this.locale, {
              ...formatter.resolvedOptions(),
              ...options,
            }).format(this.asNumber(value))
          )
      );
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
