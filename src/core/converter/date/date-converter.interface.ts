import { IKeyValue } from '../../definitions.interface';

export const DATE_TIME_TYPES = {
  months: 'months',
  seconds: 'seconds',
};

export type DateTimeLikeTypeT = string | Date;

export interface IDateConverter {
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDateTime(date?: DateTimeLikeTypeT): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT): string;
  fromDateTimeToDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToTime(date: DateTimeLikeTypeT): string;
  fromDateTimeToDateTime(date: DateTimeLikeTypeT): string;
  fromUiDateTimeToDateTime(date: string, time: string): string;
  fromUiDateTimeToPstDate(date: string, time: string): string;
  splitToDateTimeFields<TEntity>(entity: TEntity,
                                 dateFieldName: string,
                                 timeFieldName: string,
                                 dateResolver: (entity: TEntity) => string): IKeyValue;
  fromDateToUiDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToUiDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToUiDateTime(date: DateTimeLikeTypeT): string;
  fromStartUiDateTimeToDateTime(startUiDate: string, startUiTime?: string): string;
  fromEndUiDateTimeToDateTime(endUiDate: string, endUiTime?: string): string;
  from30DaysAgoUiDateTimeToDateTime(): string;
  formatDate(date: DateTimeLikeTypeT, outputFormat: string): string;
  formatDateTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatPstTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT, input?: string): string;
  fromDateTimeToPstTime(date?: DateTimeLikeTypeT, input?: string): string;
  formatPSTDate(date: DateTimeLikeTypeT): string;
  parseDate(date: DateTimeLikeTypeT, inputFormat: string): Date;
  parseDateFromDateTime(date: DateTimeLikeTypeT): Date;
  tryConvertToDate(date: DateTimeLikeTypeT, inputFormat?: string): DateTimeLikeTypeT;
  getCurrentDate(): Date;
  appendToDate(date: DateTimeLikeTypeT, data: Array<Array<number|string>>, inputFormat?: string): Date;
  getFirstDayOfMonth(monthsAgo?: number): Date;
  getLastDayOfMonth(monthsAgo?: number): Date;
  get30DaysAgo(): Date;
  getXDaysLater(days: number): Date;
  getXDaysAgo(days: number): Date;
  addXDays(date: Date, days: number): Date;
  getLocalizedMonth(index: number): string;
  getLocalizedMonthShort(index: number): string;
  getLocalizedWeekday(index: number): string;
  getLocalizedWeekdayShort(index: number): string;
  combine(dateAsString: string, timeAsString: string): string;
  shrinkDate(dateTime: DateTimeLikeTypeT, separator?: string): DateTimeLikeTypeT;
}
