import * as moment from 'moment';

import { IKeyValue } from '../../definitions.interface';
import {
  DateTimeLikeTypeT,
  IMomentConfigEntity,
  MomentT,
} from '../../definition';

export interface IDateConverter {
  asMomentDate(cfg: IMomentConfigEntity): MomentT;
  fromDateToUiDate(cfg: IMomentConfigEntity): string;
  /**/
  getAppOnlineLifeTimeInSeconds(): number;
  getAppOnlineLifeTimeInHours(): number;
  compare(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): number;
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT): string;
  fromDateTimeToPstTime(date?: DateTimeLikeTypeT): string;
  fromDateTimeToDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToTime(date: DateTimeLikeTypeT): string;
  fromDateTimeToDateTime(date: DateTimeLikeTypeT): string;
  fromUiDateTimeToDateTime(date: string, time: string): string;
  fromUiDateToDateTime(date: DateTimeLikeTypeT): string;
  fromUiDateToDate(date: DateTimeLikeTypeT): string;
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
  tryGetWeekdayNumber(date?: DateTimeLikeTypeT,
                      inputFormat?: string): number;
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
  isDateBelongsToCurrentWeek(date?: DateTimeLikeTypeT, inputFormat?: string): boolean;
  tryGetFirstDayOfMonth(duration?: moment.DurationInputArg1,
                        date?: DateTimeLikeTypeT,
                        inputFormat?: string): Date;
  tryGetFirstDayOfQuarter(duration?: moment.DurationInputArg1,
                          date?: DateTimeLikeTypeT,
                          inputFormat?: string): Date;
  tryGetFirstDayOfYear(duration?: moment.DurationInputArg1,
                       date?: DateTimeLikeTypeT,
                       inputFormat?: string): Date;
  toMomentDate(date: DateTimeLikeTypeT, inputFormat?: string, strict?: boolean): moment.Moment;
  toDate(date: DateTimeLikeTypeT, inputFormat?: string): Date;
  fromDateTimeToUiDate(date: DateTimeLikeTypeT): string;
  formatDate(date: DateTimeLikeTypeT, outputFormat: string): string;
  formatTimeFromDateTime(date: DateTimeLikeTypeT): string;
  formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string;
  tryConvertToDate(date: DateTimeLikeTypeT, inputFormat?: string): DateTimeLikeTypeT;
  tryConvertToDateAsTime(date: DateTimeLikeTypeT, inputFormat?: string): number;
  getCurrentDate(): Date;
  getCurrentTime(): Date;
  getStartOfCurrentDate(): Date;
  getYesterdayDate(): Date;
  getFirstDayOfMonth(monthsAgo?: number,
                     date?: DateTimeLikeTypeT,
                     inputFormat?: string): Date;
  getLastDayOfMonth(monthsAgo?: number,
                    date?: DateTimeLikeTypeT,
                    inputFormat?: string): Date;
  get30DaysAgo(): Date;
  getXDaysLater(days: number): Date;
  getXDaysAgo(days: number): Date;
  addXDays(date: Date, days: number): Date;
  getLocalizedMonth(index: number): string;
  getLocalizedMonthShort(index: number): string;
  getLocalizedWeekday(index: number): string;
  getLocalizedWeekdayShort(index: number): string;
  getLocalizedWeekdayShortest(index: number): string;
  getPersonAge(birthday: DateTimeLikeTypeT,
               date?: DateTimeLikeTypeT,
               inputFormat?: string): number;
  isSameMonth(date1: Date, date2: Date): boolean;
  isSameDay(date1: Date, date2: Date): boolean;
  isWeekend(day: number): boolean;
  combine(dateAsString: string, timeAsString: string): string;
  shrinkDate(dateTime: DateTimeLikeTypeT, separator?: string): DateTimeLikeTypeT;
}
