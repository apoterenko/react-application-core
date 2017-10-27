import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { isNumber } from '../util';
import { IApplicationSettings } from '../settings';
import { INumberConverter } from './converter.interface';

@provideInSingleton(NumberConverter)
export class NumberConverter implements INumberConverter {

  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;
  private defaultFormatter = new Intl.NumberFormat();
  private currencyFormatter = new Intl.NumberFormat(
      this.settings.currency.uiLocale,
      {style: 'currency', currency: this.settings.currency.uiCurrency}
  );

  public format(value: string | number, formatter: { format(...args): string} = this.defaultFormatter): string {
    value = value || 0;
    return formatter.format(
        isNumber(value) ? value as number : parseFloat(value as string)
    );
  }

  public currency(value: number | string): string {
    return `${this.format(value, this.currencyFormatter)}`;
  }

  public id(value: number | string): string {
    return `#${value}`;
  }
}
