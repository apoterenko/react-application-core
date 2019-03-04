import * as moment from 'moment';

import { IKeyValue } from '../../definitions.interface';

export const DATE_TIME_TYPES = {
  months: 'months',
  seconds: 'seconds',
};

/**
 * @stable [07.01.2019]
 */
export type DateTimeLikeTypeT = string | Date;

export interface IDateConverter {
  compare(date1: Date, date2: Date): boolean;
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDateTime(date?: DateTimeLikeTypeT): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT): string;
  fromDateTimeToPstTime(date?: DateTimeLikeTypeT): string;
  fromDateTimeToDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToTime(date: DateTimeLikeTypeT): string;
  fromDateTimeToDateTime(date: DateTimeLikeTypeT): string;
  fromUiDateTimeToDateTime(date: string, time: string): string;
  fromUiDateTimeToPstDate(date: string, time: string): string;
  fromDateToYear(date?: DateTimeLikeTypeT): number;
  splitToDateTimeFields<TEntity>(entity: TEntity,
                                 dateFieldName: string,
                                 timeFieldName: string,
                                 dateResolver: (entity: TEntity) => string): IKeyValue;
  tryAddXDurationAsMomentDate(unit: moment.DurationInputArg2,
                              duration: moment.DurationInputArg1,
                              date?: DateTimeLikeTypeT,
                              inputFormat?: string): moment.Moment | DateTimeLikeTypeT;
  tryAddXDaysAsMomentDate(duration: moment.DurationInputArg1,
                          date?: DateTimeLikeTypeT,
                          inputFormat?: string): moment.Moment | DateTimeLikeTypeT;
  tryAddXDuration(unit: moment.DurationInputArg2,
                  duration: moment.DurationInputArg1,
                  date?: DateTimeLikeTypeT,
                  inputFormat?: string): Date;
  tryAddXDays(duration: moment.DurationInputArg1,
              date?: DateTimeLikeTypeT,
              inputFormat?: string): Date;
  tryAddXWeeks(duration: moment.DurationInputArg1,
               date?: DateTimeLikeTypeT,
               inputFormat?: string): Date;
  tryAddXMonths(duration: moment.DurationInputArg1,
                date?: DateTimeLikeTypeT,
                inputFormat?: string): Date;
  tryAddXQuarters(duration: moment.DurationInputArg1,
                  date?: DateTimeLikeTypeT,
                  inputFormat?: string): Date;
  tryAddXYears(duration: moment.DurationInputArg1,
               date?: DateTimeLikeTypeT,
               inputFormat?: string): Date;
  tryGetFirstDayOfXAsMomentDate(unit: moment.DurationInputArg2,
                                startOf: moment.unitOfTime.StartOf,
                                duration: moment.DurationInputArg1,
                                date: DateTimeLikeTypeT,
                                inputFormat?: string): moment.Moment;
  tryGetFirstDayOfWeekAsMomentDate(duration?: moment.DurationInputArg1,
                                   date?: DateTimeLikeTypeT,
                                   inputFormat?: string): moment.Moment;
  tryGetFirstDayOfMonthAsMomentDate(duration?: moment.DurationInputArg1,
                                    date?: DateTimeLikeTypeT,
                                    inputFormat?: string): moment.Moment;
  tryGetFirstDayOfQuarterAsMomentDate(duration?: moment.DurationInputArg1,
                                      date?: DateTimeLikeTypeT,
                                      inputFormat?: string): moment.Moment;
  tryGetFirstDayOfYearAsMomentDate(duration?: moment.DurationInputArg1,
                                   date?: DateTimeLikeTypeT,
                                   inputFormat?: string): moment.Moment;
  tryGetFirstDayOfWeek(duration?: moment.DurationInputArg1,
                       date?: DateTimeLikeTypeT,
                       inputFormat?: string): Date;
  tryGetFirstDayOfMonth(duration?: moment.DurationInputArg1,
                        date?: DateTimeLikeTypeT,
                        inputFormat?: string): Date;
  tryGetFirstDayOfQuarter(duration?: moment.DurationInputArg1,
                          date?: DateTimeLikeTypeT,
                          inputFormat?: string): Date;
  tryGetFirstDayOfYear(duration?: moment.DurationInputArg1,
                       date?: DateTimeLikeTypeT,
                       inputFormat?: string): Date;
  fromDateToUiDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToUiDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToUiDateTime(date: DateTimeLikeTypeT): string;
  fromStartUiDateTimeToDateTime(startUiDate: string, startUiTime?: string): string;
  fromEndUiDateTimeToDateTime(endUiDate: string, endUiTime?: string): string;
  from30DaysAgoUiDateTimeToDateTime(): string;
  formatDate(date: DateTimeLikeTypeT, outputFormat: string): string;
  formatDateTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string;
  formatPSTDate(date: DateTimeLikeTypeT): string;
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
