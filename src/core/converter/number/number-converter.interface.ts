import { PhoneNumberFormat as PNF } from 'google-libphonenumber';

import { StringNumberT } from '../../definitions.interface';

export interface INumberConverter {
  asNumber(value: StringNumberT): number;
  currency(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  format(value: StringNumberT): string;
  fractionalFormat(value: StringNumberT): string;
  id(value: StringNumberT): string;
  integer(value: StringNumberT, radix?: number): StringNumberT;
  integerCurrency(value: StringNumberT): string;
  integerFormat(value: StringNumberT): string;
  internalId(value: StringNumberT): string;
  number(value: StringNumberT, returnString?: boolean): StringNumberT;
  numberParameter(value: StringNumberT, converter?: (value: number) => number): number;
  phone(value: StringNumberT, phoneNumberFormat?: PNF): string;
}
