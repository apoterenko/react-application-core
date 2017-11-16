import { PhoneNumberFormat as PNF, PhoneNumberUtil as PNU } from 'google-libphonenumber';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { isNumber } from '../util';
import { IApplicationSettings } from '../settings';
import { INumberConverter } from './converter.interface';

@provideInSingleton(NumberConverter)
export class NumberConverter implements INumberConverter {

  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;
  private defaultFormatter = new Intl.NumberFormat();
  private defaultCurrencyFormatOptions = {
    style: 'currency',
    currency: this.settings.currency.uiCurrency,
  };
  private currencyFormatter = new Intl.NumberFormat(
      this.settings.currency.uiLocale, this.defaultCurrencyFormatOptions
  );
  private phoneUtilInstance = PNU.getInstance();

  constructor() {
    this.format = this.format.bind(this);
    this.currency = this.currency.bind(this);
    this.id = this.id.bind(this);
  }

  public format(value: string | number, formatter: { format(...args): string} = this.defaultFormatter): string {
    value = value || 0;
    return formatter.format(
        isNumber(value) ? value as number : parseFloat(value as string)
    );
  }

  public currency(value: number | string, options?: Intl.NumberFormatOptions): string {
    if (options) {
      const currencyFormatter0 = new Intl.NumberFormat(
          this.settings.currency.uiLocale,
          {...this.defaultCurrencyFormatOptions, ...options}
      );
      return this.format(value, currencyFormatter0);
    }
    return this.format(value, this.currencyFormatter);
  }

  public id(value: number | string): string {
    return `#${value}`;
  }

  public phone(value: number | string, phoneNumberFormat: PNF = PNF.INTERNATIONAL): string {
    const v = String(value);
    const phoneNumber = this.phoneUtilInstance.parse(
        v, this.settings.phoneSettings.uiCountryAbbreviation
    );
    return this.phoneUtilInstance.isValidNumber(phoneNumber)
        ? this.phoneUtilInstance.format(phoneNumber, phoneNumberFormat)
        : v;
  }
}
