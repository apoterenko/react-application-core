import * as moment from 'moment';

import { IKeyValue } from '../../definitions.interface';
import {
  DateTimeLikeTypeT,
  ICalendarConfigEntity,
  ICalendarEntity,
  ICalendarWeekEntity,
  IDateGenericConverter,
  IDateTimeConfigEntity,
  IDateTimeIndexConfigEntity,
  IDayOfYearEntity,
  IFromToDayOfYearEntity,
  IMinMaxDatesRangeConfigEntity,
  IPersonAgeConfigEntity,
  IWeekConfigEntity,
} from '../../definition';

export interface IDateConverter<TDate = Date> extends IDateGenericConverter<TDate> {
  appOnlineLifeTimeInHours: number;
  appOnlineLifeTimeInSeconds: number;
  currentDate: Date;
  uiDateFormat: string;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysShortest: string[];
  addDays(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addDaysAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  addDaysToUiDate(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addDuration(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addMonths(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addMonthsAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  addQuarters(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addQuartersAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  addWeeks(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addWeeksAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  addYears(cfg: IDateTimeConfigEntity<TDate>): TDate;
  addYearsAsDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  asAbsoluteDayOfYear(cfg?: IDateTimeConfigEntity<TDate>): number;
  asCalendar(cfg?: ICalendarConfigEntity): ICalendarEntity;
  asCalendarWeekEntity(cfg?: ICalendarConfigEntity<TDate>): ICalendarEntity;
  asCronDay(cfg?: IDateTimeConfigEntity<TDate>): number;
  asDate(cfg: IDateTimeConfigEntity<TDate>): Date;
  asDayOfYear(date?: Date): Date;
  asDayOfYearEntity(cfg?: IDateTimeConfigEntity<TDate>): IDayOfYearEntity;
  asDaysOfMonth(cfg: IDateTimeConfigEntity<TDate>): TDate[];
  asDaysOfMonthAsDates(cfg: IDateTimeConfigEntity<TDate>): Date[];
  asEndUnitOf(cfg: IDateTimeConfigEntity<TDate>): TDate;
  asFirstDayOfMonth(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asFirstDayOfMonthAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asFirstDayOfQuarter(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asFirstDayOfQuarterAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asFirstDayOfWeek(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asFirstDayOfWeekAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asFirstDayOfYear(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asFirstDayOfYearAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asLastDayOfMonth(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asLastDayOfMonthAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asLastDayOfQuarter(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asLastDayOfQuarterAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asLastDayOfWeek(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asLastDayOfWeekAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asLastDayOfYear(cfg?: IDateTimeConfigEntity<TDate>): TDate;
  asLastDayOfYearAsDate(cfg?: IDateTimeConfigEntity<TDate>): Date;
  asMomentDate(cfg: IDateTimeConfigEntity<TDate>): TDate;
  asPersonAge(cfg: IPersonAgeConfigEntity<TDate>): number;
  asStartUnitOf(cfg: IDateTimeConfigEntity<TDate>): TDate;
  asWeekdayNumber(cfg?: IDateTimeConfigEntity<TDate>): number;
  compare(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): number;
  compareDayOfYearEntity(o1: IDayOfYearEntity, o2: IDayOfYearEntity): number;
  currentDateAsUiDateString(cfg?: IDateTimeConfigEntity<TDate>): string;
  dateAsDateString(cfg: IDateTimeConfigEntity<TDate>): string;
  dateAsDateTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  dateAsPstDateString(cfg: IDateTimeConfigEntity<TDate>): string;
  dateAsPstTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  dateAsTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  dateAsUiDateString(cfg: IDateTimeConfigEntity<TDate>): string;
  equal(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): boolean;
  fromDateTimeToPstTimeString(cfg: IDateTimeConfigEntity<TDate>): string;                               // @stable [13.03.2021]
  fromDateTimeToString(cfg: IDateTimeConfigEntity<TDate>): string;                                      // @stable [13.03.2021]
  fromDateTimeToUiDateString(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateTimeToUiDateTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateToUiDateString(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDayOfYearEntity(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity<TDate>): TDate;
  fromDayOfYearEntityAsDate(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity<TDate>): Date;
  fromUiDateTimeToDateTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  fromUiDateToDateTimeString(cfg: IDateTimeConfigEntity<TDate>): string;
  getCalendarWeekEntity(cfg?: IDateTimeConfigEntity<TDate>): ICalendarWeekEntity;
  getCurrentDate(): Date;
  getWeekday(cfg: IDateTimeConfigEntity<TDate>): string;
  getWeekdays(cfg?: IWeekConfigEntity): string[];
  getWeekdayShort(cfg: IDateTimeConfigEntity<TDate>): string;
  getWeekdayShortest(cfg: IDateTimeConfigEntity<TDate>): string;
  getWeekdaysShort(cfg?: IWeekConfigEntity): string[];
  getWeekdaysShortest(cfg?: IWeekConfigEntity): string[];
  isDateBelongToDatesRange(cfg: IMinMaxDatesRangeConfigEntity): boolean;
  isDateValid(cfg: IDateTimeConfigEntity<TDate>): boolean;
  isDayOfYearBelongToDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): boolean;
  isDayOfYearEqualOtherDayOfYear(entity1: IDayOfYearEntity, entity2: IDayOfYearEntity): boolean;
  isFuture(date1: DateTimeLikeTypeT, date2?: DateTimeLikeTypeT): boolean;
  isoWeekDayAsOrdinaryDay(cfg: IDateTimeIndexConfigEntity): number;
  isPast(date1: DateTimeLikeTypeT, date2?: DateTimeLikeTypeT): boolean;
  selectDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): IFromToDayOfYearEntity;
  /**/
  format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string;
  fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string;
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
  tryAddXDuration(unit: moment.DurationInputArg2,
                  duration: moment.DurationInputArg1,
                  date?: DateTimeLikeTypeT,
                  inputFormat?: string): Date;
  tryAddXDays(duration: moment.DurationInputArg1,
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
  tryGetFirstDayOfWeekAsMomentDate(duration?: moment.DurationInputArg1,
                                   date?: DateTimeLikeTypeT,
                                   inputFormat?: string): moment.Moment;
  tryGetFirstDayOfWeek(duration?: moment.DurationInputArg1,
                       date?: DateTimeLikeTypeT,
                       inputFormat?: string): Date;
  isDateBelongsToCurrentWeek(date?: DateTimeLikeTypeT, inputFormat?: string): boolean;
  toMomentDate(date: DateTimeLikeTypeT, inputFormat?: string, strict?: boolean): moment.Moment;
  toDate(date: DateTimeLikeTypeT, inputFormat?: string): Date;
  get30DaysAgo(): Date;
  getXDaysAgo(days: number): Date;
}
