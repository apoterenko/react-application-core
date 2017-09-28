import { AnyT } from '../definition.interface';

export interface IDateConverter {
  localeSpecificConstants: IDateLocaleSpecificConstants;
  formatDate(date: AnyT, format?: string): string;
  tryConvertToDate(date: AnyT, format?: string): AnyT;
  getDateRangeFromDate(date: Date): Date[];
  getCurrentDate(date?: Date): Date;
  isDate(date: AnyT): boolean;
}

export interface IDateLocaleSpecificConstants {
  datePattern: string;
  dateFormat: string;
  dateMask: Array<string | RegExp>;
}

export interface IDateLocaleSpecificConstantsRepo {
  [locale: string]: IDateLocaleSpecificConstants;
}
