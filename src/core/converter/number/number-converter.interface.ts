import { PhoneNumberFormat as PNF } from 'google-libphonenumber';

import { StringNumberT } from '../../definitions.interface';

export interface INumberConverter {
  currency(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  format(value: StringNumberT): string;
  fractionalFormat(value: StringNumberT): string;
  id(value: StringNumberT): string;
  integer(value: StringNumberT, radix?: number): StringNumberT;
  integerCurrency(value: StringNumberT): string;
  integerFormat(value: StringNumberT): string;
  internalId(value: StringNumberT): string;
  number(value: StringNumberT, stringResult?: boolean): StringNumberT;
  phone(value: StringNumberT, phoneNumberFormat?: PNF): string;
}
