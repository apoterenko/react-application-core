import * as moment from 'moment';

import { IKeyValue } from '../../definitions.interface';
import {
  DateTimeLikeTypeT,
  ICalendarConfigEntity,
  ICalendarEntity,
  IDateTimeConfigEntity,
  IDateRangeConfigEntity,
  IDayOfYearEntity,
  IFromToDayOfYearEntity,
} from '../../definition';

export interface IDateConverter<TDate = Date> {
  addDays(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addDaysToUiDate(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addDaysToUiDateAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  addDuration(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addMonths(cfg: IDateTimeConfigEntity): TDate;
  addMonthsAsDate(cfg: IDateTimeConfigEntity): Date;
  asAbsoluteDayOfYear(cfg?: IDateTimeConfigEntity): number;
  asCalendar(cfg?: ICalendarConfigEntity): ICalendarEntity;
  asDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  asDayOfYear(date?: Date): Date;
  asDayOfYearEntity(cfg?: IDateTimeConfigEntity): IDayOfYearEntity;
  asEndUnitOf(cfg: IDateTimeConfigEntity): TDate;
  asFirstDayOfMonth(cfg?: IDateTimeConfigEntity): TDate;
  asFirstDayOfMonthAsDate(cfg?: IDateTimeConfigEntity): Date;
  asFirstDayOfQuarter(cfg?: IDateTimeConfigEntity): TDate;
  asFirstDayOfQuarterAsDate(cfg?: IDateTimeConfigEntity): Date;
  asFirstDayOfWeek(cfg?: IDateTimeConfigEntity): TDate;
  asFirstDayOfWeekAsDate(cfg?: IDateTimeConfigEntity): Date;
  asFirstDayOfYear(cfg?: IDateTimeConfigEntity): TDate;
  asFirstDayOfYearAsDate(cfg?: IDateTimeConfigEntity): Date;
  asFormattedDateTime(cfg: IDateTimeConfigEntity<TDate>): string;
  asLastDayOfMonth(cfg?: IDateTimeConfigEntity): TDate;
  asMomentDate(cfg: IDateTimeConfigEntity<TDate>): TDate;
  asStartUnitOf(cfg: IDateTimeConfigEntity): TDate;
  compare(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): number;
  compareDayOfYearEntity(o1: IDayOfYearEntity, o2: IDayOfYearEntity): number;
  dateAsString(cfg: IDateTimeConfigEntity): string;
  fromDateTimeToPstTime(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateTimeToUiDate(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateTimeToUiDateTime(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateToUiDate(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDayOfYearEntity(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity): TDate;
  fromDayOfYearEntityAsDate(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity): Date;
  fromUiDateTimeToDateTime(cfg: IDateTimeConfigEntity<TDate>): string;
  fromUiDateToDateTime(cfg: IDateTimeConfigEntity<TDate>): string;
  getCurrentDate(): Date;
  getCurrentDateAsUiDate(): string;
  getLocalizedShortestWeekday(cfg: IDateTimeConfigEntity): string;
  getLocalizedShortestWeekdays(cfg?: IDateTimeConfigEntity): string[];
  getShortestWeekday(cfg: IDateTimeConfigEntity): string;
  getShortestWeekdays(cfg?: IDateTimeConfigEntity): string[];
  isDateBelongToDatesRange(cfg: IDateRangeConfigEntity): boolean;
  isDayOfYearBelongToDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): boolean;
  selectDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): IFromToDayOfYearEntity;
  /**/
  getAppOnlineLifeTimeInSeconds(): number;
  getAppOnlineLifeTimeInHours(): number;
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
  fromDateTimeToPstDate(date?: DateTimeLikeTypeT): string;
  fromDateTimeToDate(date: DateTimeLikeTypeT): string;
  fromDateTimeToTime(date: DateTimeLikeTypeT): string;
  fromDateTimeToDateTime(date: DateTimeLikeTypeT): string;
  splitToDateTimeFields<TEntity>(entity: TEntity,
                                 dateFieldName: string,
                                 timeFieldName: string,
                                 dateResolver: (entity: TEntity) => string): IKeyValue;
  tryAddXDurationAsMomentDate(unit: moment.DurationInputArg2,
                              duration: moment.DurationInputArg1,
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
  tryConvertToDate(date: DateTimeLikeTypeT, inputFormat?: string): DateTimeLikeTypeT;
  tryConvertToDateAsTime(date: DateTimeLikeTypeT, inputFormat?: string): number;
  getYesterdayDate(): Date;
  getFirstDayOfMonth(monthsAgo?: number,
                     date?: DateTimeLikeTypeT,
                     inputFormat?: string): Date;
  getLastDayOfMonth(monthsAgo?: number,
                    date?: DateTimeLikeTypeT,
                    inputFormat?: string): Date;
  get30DaysAgo(): Date;
  getXDaysAgo(days: number): Date;
  getLocalizedMonth(index: number): string;
  getLocalizedMonthShort(index: number): string;
  getLocalizedWeekday(index: number): string;
  getLocalizedWeekdayShort(index: number): string;
  getPersonAge(birthday: DateTimeLikeTypeT,
               date?: DateTimeLikeTypeT,
               inputFormat?: string): number;
  isSameMonth(date1: Date, date2: Date): boolean;
  isSameDay(date1: Date, date2: Date): boolean;
  isWeekend(day: number): boolean;
  combine(dateAsString: string, timeAsString: string): string;
}
