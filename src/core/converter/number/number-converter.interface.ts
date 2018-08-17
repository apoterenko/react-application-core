import { PhoneNumberFormat as PNF } from 'google-libphonenumber';

export interface INumberConverter {
  number(value: string | number, stringResult?: boolean): string | number;
  format(value: number | string): string;
  currency(value: number | string, options?: Intl.NumberFormatOptions): string;
  phone(value: number | string, phoneNumberFormat?: PNF): string;
  id(value: number | string): string;
  internalId(value: number | string): string;
}
