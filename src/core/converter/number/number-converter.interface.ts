import { PhoneNumberFormat as PNF } from 'google-libphonenumber';
import { StringNumberT } from '../../definitions.interface';

export interface INumberConverter {
  number(value: StringNumberT, stringResult?: boolean): StringNumberT;
  integer(value: StringNumberT, radix?: number): StringNumberT;
  format(value: StringNumberT): string;
  currency(value: StringNumberT, options?: Intl.NumberFormatOptions): string;
  phone(value: StringNumberT, phoneNumberFormat?: PNF): string;
  id(value: StringNumberT): string;
  internalId(value: StringNumberT): string;
}
