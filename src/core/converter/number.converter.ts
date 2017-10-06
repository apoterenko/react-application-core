import { provideInSingleton } from '../di';
import { isNumber } from '../util';
import { INumberConverter } from './converter.interface';

@provideInSingleton(NumberConverter)
export class NumberConverter implements INumberConverter {

  private defaultFormatter = new Intl.NumberFormat();

  public format(value: string | number): string {
    value = value || 0;
    return this.defaultFormatter.format(
        isNumber(value) ? value as number : parseFloat(value as string)
    );
  }
}
