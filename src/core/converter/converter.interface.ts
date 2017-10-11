export type DateTimeLikeTypeT = string | Date;

export interface IDateConverter {
  formatDateTime(date: DateTimeLikeTypeT, outputFormat?: string, inputFormat?: string): string;
  convertToDate(date: DateTimeLikeTypeT, inputFormat: string): DateTimeLikeTypeT;
  getDateRangeFromDate(date: Date): Date[];
  getCurrentDate(date?: Date): Date;
  isDate(date: DateTimeLikeTypeT): boolean;
  join(dateAsString: string, timeAsString: string): string;
}

export interface INumberConverter {
  format(value: number | string): string;
}
