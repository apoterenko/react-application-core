export const DATE_TIME_TYPES = {
  months: 'months',
  seconds: 'seconds',
};

export type DateTimeLikeTypeT = string | Date;

export interface IDateConverter {
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateToUiDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToUiDateTime(date: string, time: string): string;
  fromUiDateTimeToDateTime(date: string, time: string): string;
  fromStartUiDateTimeToDateTime(startUiDate: string, startUiTime?: string): string;
  fromEndUiDateTimeToDateTime(endUiDate: string, endUiTime?: string): string;
  from30DaysAgoUiDateTimeToDateTime(): string;
  formatDate(date: DateTimeLikeTypeT, outputFormat: string): string;
  formatDateFromDateTime(date: DateTimeLikeTypeT): string;
  formatTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDateTime(date?: DateTimeLikeTypeT): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT): string;
  formatPSTDate(date: DateTimeLikeTypeT): string;
  parseDate(date: DateTimeLikeTypeT, inputFormat: string): Date;
  parseDateFromDateTime(date: DateTimeLikeTypeT): Date;
  tryConvertToDate(date: DateTimeLikeTypeT, inputFormat): DateTimeLikeTypeT;
  getCurrentDate(): Date;
  appendToDate(date: DateTimeLikeTypeT, data: Array<Array<number|string>>, inputFormat?: string): Date;
  getFirstDayOfMonth(): Date;
  get30DaysAgo(): Date;
  getXDaysLater(days: number): Date;
  getXDaysAgo(days: number): Date;
  getLocalizedMonth(index: number): string;
  getLocalizedMonthShort(index: number): string;
  getLocalizedWeekday(index: number): string;
  getLocalizedWeekdayShort(index: number): string;
  combine(dateAsString: string, timeAsString: string): string;
}
