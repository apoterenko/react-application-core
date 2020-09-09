import { StringNumberT } from '../../definitions.interface';

export interface INumberConverter {
  asNumber(value: StringNumberT): number;
  format(value: StringNumberT, formatter?: Intl.NumberFormat, options?: Intl.NumberFormatOptions): string;
  formatFractional(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  formatFractionalCurrency(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  formatInteger(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  formatIntegerCurrency(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  id(value: StringNumberT): string;
  integer(value: StringNumberT, radix?: number): StringNumberT;
  internalId(value: StringNumberT): string;
  number(value: StringNumberT, returnString?: boolean): StringNumberT;
  numberParameter(value: StringNumberT, converter?: (value: number) => number): number;
}
