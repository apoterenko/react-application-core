export type DateTimeLikeTypeT = string | Date;

export interface IDateConverter {
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  formatUiDate(date?: DateTimeLikeTypeT): string;
  formatUiDateTime(date?: DateTimeLikeTypeT): string;
  toDate(date: DateTimeLikeTypeT, inputFormat: string): DateTimeLikeTypeT;
  getDateRangeFromDate(date: Date): Date[];
  getCurrentDate(date?: Date): Date;
  getFirstDayOfMonth(): Date;
  combine(dateAsString: string, timeAsString: string): string;
}

export interface INumberConverter {
  format(value: number | string): string;
  currency(value: number | string): string;
  id(value: number | string): string;
}
