import { injectable } from 'inversify';
import * as R from 'ramda';
import * as moment from 'moment';
import 'moment-timezone';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IKeyValue,
} from '../../definitions.interface';
import {
  defValuesFilter,
  ifNotNilThanValue,
  isObjectNotEmpty,
  nvl,
  orNull,
  orUndef,
} from '../../util';
import { IDateTimeSettings, ISettingsEntity, StartDayOfWeekT } from '../../settings';
import { IDateConverter } from './date-converter.interface';
import {
  DateTimeLikeTypeT,
  ICalendarConfigEntity,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarWeekEntity,
  IDateTimeConfigEntity,
  IDayOfYearEntity,
  IFromToDayOfYearEntity,
  MomentT,
} from '../../definition';

const APP_STARTING_DATE = Date.now();

@injectable()
export class DateConverter implements IDateConverter<MomentT> {
  private static MONTHS = moment.months();
  private static MONTHS_SHORT = moment.monthsShort();
  private static WEEKDAYS_SHORT = moment.weekdaysShort()
      .slice(1, 7)
      .concat(moment.weekdaysShort()[0]);
  private static WEEKDAYS = moment.weekdays()
      .slice(1, 7)
      .concat(moment.weekdays()[0]);

  private static DEFAULT_SHORTEST_ISO_WEEKDAYS = ['M', 'T', 'W', 'TH', 'F', 'SA', 'SU'];
  private static DEFAULT_SHORTEST_WEEKDAYS = [
    DateConverter.DEFAULT_SHORTEST_ISO_WEEKDAYS[6],
    ...DateConverter.DEFAULT_SHORTEST_ISO_WEEKDAYS.slice(0, 6)
  ];

  @lazyInject(DI_TYPES.Settings) private settings: ISettingsEntity;

  /**
   * @stable [16.10.2019]
   * @returns {number}
   */
  public getAppOnlineLifeTimeInSeconds(): number {
    return Math.round(Date.now() - APP_STARTING_DATE) / (1000 * 60);
  }

  /**
   * @stable [16.10.2019]
   * @returns {number}
   */
  public getAppOnlineLifeTimeInHours(): number {
    return Math.round(this.getAppOnlineLifeTimeInSeconds() / 60);
  }

  /**
   * @stable [08.08.2019]
   * @param {DateTimeLikeTypeT} date1
   * @param {DateTimeLikeTypeT} date2
   * @returns {number}
   */
  public compare(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): number {
    const date1$ = date1 as Date;
    const date2$ = date2 as Date;

    return R.equals(date1, date2)
      ? 0
      : (
        date1$ instanceof Date && date2$ instanceof Date
          ? date1$ === date2$ ? 0 : (date1$ > date2$ ? 1 : -1)
          : NaN
      );
  }

  /**
   * @stable [11.08.2018]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @param {string} outputFormat
   * @returns {string}
   */
  public format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string {
    if (R.isNil(date) || R.isEmpty(date)) {
      return '';
    } else {
      const momentDate = this.toMomentDate(date, inputFormat);
      return momentDate.isValid()
          ? momentDate.format(outputFormat)
          : String(date);
    }
  }

  /**
   * @stable [22.12.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsString(cfg: IDateTimeConfigEntity): string {
    const {
      date,
      outputFormat,
    } = cfg;
    if (date instanceof Date || isObjectNotEmpty(date)) {
      const momentDate = this.asMomentDate(cfg);
      return momentDate.isValid()
        ? momentDate.format(outputFormat)
        : String(date);
    } else {
      return '';
    }
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asStartUnitOf(cfg: IDateTimeConfigEntity): MomentT {
    return this.processValidMomentDate({
      date: this.getCurrentDate(),
      ...cfg,
    }, (mDate) => mDate.startOf(cfg.unit as moment.unitOfTime.StartOf));
  }

  /**
   * @stable [07.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {IDayOfYearEntity}
   */
  public asDayOfYearEntity(cfg?: IDateTimeConfigEntity): IDayOfYearEntity {
    return this.processValidMomentDate(cfg,
      (mDate) => ({day: mDate.date(), month: mDate.month(), year: mDate.year()}));
  }

  /**
   * @stable [03.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asEndUnitOf(cfg: IDateTimeConfigEntity): MomentT {
    return this.processValidMomentDate({
      date: this.getCurrentDate(),
      ...cfg,
    }, (mDate) => mDate.endOf(cfg.unit as moment.unitOfTime.StartOf));
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asFirstDayOfMonth(cfg?: IDateTimeConfigEntity): MomentT {
    return this.asStartUnitOf({...cfg, unit: 'month'});
  }

  /**
   * @stable [06.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asFirstDayOfMonthAsDate(cfg?: IDateTimeConfigEntity): Date {
    return ifNotNilThanValue(this.asFirstDayOfMonth(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asLastDayOfMonth(cfg?: IDateTimeConfigEntity): MomentT {
    return this.asEndUnitOf({...cfg, unit: 'month'});
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addDuration(cfg: IDateTimeConfigEntity): MomentT {
    return this.processValidMomentDate(
      cfg,
      (mDate) => mDate.add(cfg.duration as moment.DurationInputArg1, cfg.unit as moment.DurationInputArg2)
    );
  }

  /**
   * @stable [06.01.2020]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {number}
   */
  public asAbsoluteDayOfYear(cfg?: IDateTimeConfigEntity): number {
    return this.processValidMomentDate({
      date: this.getCurrentDate(),
      ...cfg,
    }, (mDate) => mDate.dayOfYear());
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {moment.Moment}
   */
  public addDays(cfg: IDateTimeConfigEntity): moment.Moment {
    return this.addDuration({...cfg, unit: 'days'});
  }

  /**
   * @stable [03.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addMonths(cfg: IDateTimeConfigEntity): MomentT {
    return this.addDuration({...cfg, unit: 'months'});
  }

  /**
   * @stable [06.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addMonthsAsDate(cfg: IDateTimeConfigEntity): Date {
    return ifNotNilThanValue(this.addMonths(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addDaysToUiDate(cfg: IDateTimeConfigEntity): MomentT {
    return this.addDays({...cfg, inputFormat: this.uiDateFormat});
  }

  /**
   * @stable [02.01.2019]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addDaysToUiDateAsDate(cfg: IDateTimeConfigEntity): Date {
    return ifNotNilThanValue(this.addDaysToUiDate(cfg), (momentDate) => momentDate.toDate());
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date
   * @param {string} outputFormat
   * @returns {string}
   */
  public fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  /**
   * @stable [04.03.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} outputFormat
   * @returns {string}
   */
  public fromDateToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateFormat, outputFormat);
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-11-30T03:00:00+03:00]
   * @returns {string} [Example: Nov 30]
   */
  public fromDateTimeToPstDate(date: DateTimeLikeTypeT = this.currentDate): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeSettings.pstDateFormat);
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateTimeToPstTime(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({...cfg, inputFormat: this.dateTimeFormat, outputFormat: this.pstTimeFormat});
  }

  /**
   * @deprecated
   */
  public fromDateTimeToDate(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateFormat);
  }

  /**
   * @stable [25.12.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateTimeToUiDate(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({
      inputFormat: this.dateTimeFormat,
      outputFormat: this.uiDateFormat,
      ...cfg,
    });
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public asFormattedDateTime(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({...cfg, outputFormat: this.dateTimeFormat});
  }

  /**
   * @stable [25.12.2019]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateTimeToUiDateTime(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({
      inputFormat: this.dateTimeFormat,
      ...cfg,
      outputFormat: `${
        nvl(cfg.outputFormat, this.uiDateFormat)} ${
        nvl(cfg.outputTimeFormat, this.uiTimeFormat)
        }`
        .trim(),
    });
  }

  /**
   * @stable [09.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: 2018-04-07T20:54:45+03:00]
   * @returns {string} [Example: 20:54:45]
   */
  public fromDateTimeToTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.timeFormat);
  }

  /**
   * @stable [23.11.2018]
   * @param {DateTimeLikeTypeT} date [Example: Wed Oct 24 2018 04:07:41 GMT+0300 (RTZ 2 (зима))]
   * @returns {string} [Example: 2018-10-24T04:07:41+03:00]
   */
  public fromDateTimeToDateTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeFormat);
  }

  /**
   * @stable [25.12.2019]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromUiDateTimeToDateTime(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({
      outputFormat: this.dateTimeFormat,
      ...cfg,
      date: `${cfg.date} ${nvl(cfg.time, this.uiDefaultTime)}`.trim(),
      inputFormat: `${
        nvl(cfg.inputFormat, this.uiDateFormat)} ${
        nvl(cfg.inputTimeFormat, this.uiTimeFormat)
        }`
        .trim(),
    });
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromUiDateToDateTime(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({
      ...cfg,
      outputFormat: this.dateTimeFormat,
      inputFormat: this.uiDateFormat,
    });
  }

  /**
   * @stable [09.11.2018]
   * @param {TEntity} entity
   * @param {string} dateFieldName
   * @param {string} timeFieldName
   * @param {(entity: TEntity) => string} dateResolver
   * @returns {IKeyValue}
   */
  public splitToDateTimeFields<TEntity>(entity: TEntity,
                                        dateFieldName: string,
                                        timeFieldName: string,
                                        dateResolver: (entity: TEntity) => string): IKeyValue {
    const date = dateResolver(entity);

    return defValuesFilter({
      [timeFieldName]: orUndef<string>(date, () => this.fromDateTimeToTime(date)),
      [dateFieldName]: orUndef<string>(date, () => this.fromDateTimeToDate(date)),
    });
  }

  /**
   * @stable [07.01.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {DateTimeLikeTypeT}
   */
  public tryConvertToDate(date: DateTimeLikeTypeT, inputFormat = this.dateFormat): DateTimeLikeTypeT {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate() : date;
  }

  /**
   * @stable [06.06.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {number}
   */
  public tryConvertToDateAsTime(date: DateTimeLikeTypeT, inputFormat = this.dateTimeFormat): number {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate().getTime() : -1;
  }

  /**
   * @deprecated
   */
  public tryAddXDurationAsMomentDate(unit: moment.DurationInputArg2,
                                     duration: moment.DurationInputArg1,
                                     date: DateTimeLikeTypeT = this.currentDate,
                                     inputFormat = this.uiDateFormat): moment.Moment {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(momentDate.isValid(), () => momentDate.add(duration, unit));
  }

  /**
   * @stable [11.08.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {number}
   */
  public tryGetWeekdayNumber(date: DateTimeLikeTypeT = this.currentDate,
                             inputFormat = this.uiDateFormat): number {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(momentDate.isValid(),
      () => this.settings.dateTime.startDayOfWeek === StartDayOfWeekT.MONDAY // TODO make getter
        ? momentDate.isoWeekday() : momentDate.weekday());
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg2} unit
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXDuration(unit: moment.DurationInputArg2,
                         duration: moment.DurationInputArg1,
                         date: DateTimeLikeTypeT = this.currentDate,
                         inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryAddXDurationAsMomentDate(unit, duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXDays(duration: moment.DurationInputArg1,
                     date: DateTimeLikeTypeT = this.currentDate,
                     inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('days', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXWeeks(duration: moment.DurationInputArg1,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('weeks', duration, date, inputFormat);
  }

  /**
   * @stable [07.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXMonths(duration: moment.DurationInputArg1,
                       date: DateTimeLikeTypeT = this.currentDate,
                       inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('months', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXQuarters(duration: moment.DurationInputArg1,
                         date: DateTimeLikeTypeT = this.currentDate,
                         inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('quarters', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryAddXYears(duration: moment.DurationInputArg1,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat = this.uiDateFormat): Date {
    return this.tryAddXDuration('years', duration, date, inputFormat);
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg2} unit
   * @param {moment.unitOfTime.StartOf} startOf
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfXAsMomentDate(unit: moment.DurationInputArg2,
                                       startOf: moment.unitOfTime.StartOf,
                                       duration: moment.DurationInputArg1 = 0,
                                       date: DateTimeLikeTypeT = this.currentDate,
                                       inputFormat = this.uiDateFormat): moment.Moment {
    return ifNotNilThanValue<moment.Moment, moment.Moment>(
      this.tryAddXDurationAsMomentDate(unit, duration, date, inputFormat), (value) => value.startOf(startOf)
    );
  }

  /**
   * @stable [08.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfMonthAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                           date: DateTimeLikeTypeT = this.currentDate,
                                           inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('months', 'month', duration, date, inputFormat);
  }

  /**
   * @stable [10.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfYearAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                          date: DateTimeLikeTypeT = this.currentDate,
                                          inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('years', 'year', duration, date, inputFormat);
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfQuarterAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                             date: DateTimeLikeTypeT = this.currentDate,
                                             inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate('quarters', 'quarter', duration, date, inputFormat);
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {moment.Moment}
   */
  public tryGetFirstDayOfWeekAsMomentDate(duration: moment.DurationInputArg1 = 0,
                                          date: DateTimeLikeTypeT = this.currentDate,
                                          inputFormat = this.uiDateFormat): moment.Moment {
    return this.tryGetFirstDayOfXAsMomentDate(
      'weeks',
      this.settings.dateTime.startDayOfWeek === StartDayOfWeekT.MONDAY ? 'isoWeek' : 'week',
      duration, date, inputFormat
    );
  }

  /**
   * @stable [09.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfWeek(duration: moment.DurationInputArg1 = 0,
                              date: DateTimeLikeTypeT = this.currentDate,
                              inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfWeekAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [08.01.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfMonth(duration: moment.DurationInputArg1 = 0,
                               date: DateTimeLikeTypeT = this.currentDate,
                               inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfMonthAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfQuarter(duration: moment.DurationInputArg1 = 0,
                                 date: DateTimeLikeTypeT = this.currentDate,
                                 inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfQuarterAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [10.02.2019]
   * @param {moment.DurationInputArg1} duration
   * @param {DateTimeLikeTypeT} date
   * @param {string | undefined} inputFormat
   * @returns {Date}
   */
  public tryGetFirstDayOfYear(duration: moment.DurationInputArg1 = 0,
                              date: DateTimeLikeTypeT = this.currentDate,
                              inputFormat = this.uiDateFormat): Date {
    return ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfYearAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
    );
  }

  /**
   * @stable [08.08.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {boolean}
   */
  public isDateBelongsToCurrentWeek(date: DateTimeLikeTypeT,
                                    inputFormat = this.dateFormat): boolean {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() && (momentDate.toDate() >= this.tryGetFirstDayOfWeek());
  }

  /**
   * @stable [22.12.2019]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateToUiDate(cfg: IDateTimeConfigEntity): string {
    return this.dateAsString({
      strict: false, // UTC: ignore a time, by default (+00:00 | Z)
      inputFormat: this.dateFormat,
      outputFormat: this.uiDateFormat,
      ...cfg,
    });
  }

  public fromDayOfYearEntityAsDate(entity: IDayOfYearEntity): Date {
    const d = this.buildDayOfYear();
    d.setFullYear(entity.year, entity.month, entity.day);
    return d;
  }

  /**
   * @deprecated
   */
  public get30DaysAgo(): Date {
    return this.getXDaysAgo(30);
  }

  /**
   * @deprecated
   */
  public getXDaysAgo(days: number): Date {
    return this.getCurrentMomentDate().subtract(days, 'days').toDate();
  }

  /**
   * @stable [25.12.2019]
   * @tested
   * @returns {Date}
   */
  public getCurrentDate(): Date {
    return this.currentDate;
  }

  /**
   * @stable [25.12.2019]
   * @returns {string}
   */
  public getCurrentDateAsUiDate(): string {
    return this.dateAsString({date: this.getCurrentDate(), outputFormat: this.uiDateFormat});
  }

  /**
   * @deprecated
   */
  public getCurrentTime(): Date {
    return new Date();
  }

  /**
   * @stable [08.08.2019]
   * @returns {Date}
   */
  public getStartOfCurrentDate(): Date {
    const date = new Date(this.currentDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @stable [09.05.2019]
   * @returns {Date}
   */
  public getYesterdayDate(): Date {
    return this.tryAddXDays(-1);
  }

  public getLocalizedMonth(index: number): string {
    return DateConverter.MONTHS[index];
  }

  public getLocalizedMonthShort(index: number): string {
    return DateConverter.MONTHS_SHORT[index];
  }

  public getLocalizedWeekday(index: number): string {
    return DateConverter.WEEKDAYS[index];
  }

  public getLocalizedWeekdayShort(index: number): string {
    return DateConverter.WEEKDAYS_SHORT[index];
  }

  /**
   * @stable [04.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string[]}
   */
  public getShortestWeekdays(cfg?: IDateTimeConfigEntity): string[] {
    const {isoWeek = false} = cfg || {};
    return isoWeek
      ? DateConverter.DEFAULT_SHORTEST_ISO_WEEKDAYS
      : DateConverter.DEFAULT_SHORTEST_WEEKDAYS;
  }

  /**
   * @stable [04.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string[]}
   */
  public getLocalizedShortestWeekdays(cfg?: IDateTimeConfigEntity): string[] {
    // TODO Localize
    return this.getShortestWeekdays(cfg);
  }

  /**
   * @stable [04.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public getShortestWeekday(cfg: IDateTimeConfigEntity): string {
    return this.getShortestWeekdays(cfg)[cfg.index];
  }

  /**
   * @stable [04.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public getLocalizedShortestWeekday(cfg: IDateTimeConfigEntity): string {
    return this.getLocalizedShortestWeekdays(cfg)[cfg.index];
  }

  /**
   * @stable [25.08.2018]
   * @param {number} monthsAgo
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public getLastDayOfMonth(monthsAgo = 1,
                           date: DateTimeLikeTypeT = this.currentDate,
                           inputFormat = this.dateTimeSettings.uiDateFormat): Date {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(
      momentDate.isValid(),
      () => momentDate.subtract(monthsAgo, 'months').endOf('month').toDate()
    );
  }

  /**
   * @stable [25.08.2018]
   * @param {number} monthsAgo
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public getFirstDayOfMonth(monthsAgo = 0,
                            date: DateTimeLikeTypeT = this.currentDate,
                            inputFormat = this.dateTimeSettings.uiDateFormat): Date {
    const momentDate = this.toMomentDate(date, inputFormat);
    return orNull(
      momentDate.isValid(),
      () => momentDate.subtract(monthsAgo, 'months').startOf('month').toDate()
    );
  }

  public getPersonAge(birthday: DateTimeLikeTypeT,
                      date: DateTimeLikeTypeT = this.currentDate,
                      inputFormat?: string): number {
    return this.toMomentDate(date, inputFormat).diff(birthday, 'years');
  }

  public isSameMonth(date1: Date, date2: Date): boolean {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return this.isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
  }

  public isWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }

  /**
   * @stable [24.11.2018]
   * @param {string} dateAsString
   * @param {string} timeAsString
   * @returns {string}
   */
  public combine(dateAsString: string, timeAsString: string): string {
    return [dateAsString, timeAsString].join(' ');
  }

  /**
   * @stable [03.04.2019]
   * @param {DateTimeLikeTypeT} date
   * @param {string} inputFormat
   * @returns {Date}
   */
  public toDate(date: DateTimeLikeTypeT, inputFormat?: string): Date {
    return this.toMomentDate(date, inputFormat).toDate();
  }

  /**
   * @deprecated Use asMomentDate
   */
  public toMomentDate(date: DateTimeLikeTypeT, inputFormat?: string, strict = true): moment.Moment {
    const momentDate = date instanceof Date
      ? moment(date)
      : moment(date, inputFormat, strict);
    const zone = this.timeZone;
    return zone ? moment.tz(date, zone) : momentDate;
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asMomentDate(cfg: IDateTimeConfigEntity): MomentT {
    const {
      date,
      inputFormat,
      strict = true,
      zone = this.timeZone,
    } = cfg;
    if (moment.isMoment(date)) {
      return date;
    }
    return zone
      ? (
        date instanceof Date
          ? moment.tz(date, zone)
          : moment.tz(date, inputFormat, strict, zone)
      )
      : (
        date instanceof Date
          ? moment(date)
          : moment(date, inputFormat, strict)
      );
  }

  /**
   * @stable [07.01.2020]
   * @tested
   * @param {IDayOfYearEntity} o1
   * @param {IDayOfYearEntity} o2
   * @returns {number}
   */
  public compareDayOfYearEntity(o1: IDayOfYearEntity, o2: IDayOfYearEntity): number {
    o1 = o1 || {} as IDayOfYearEntity;
    o2 = o2 || {} as IDayOfYearEntity;
    const d1 = this.buildDayOfYear();
    const d2 = this.buildDayOfYear();
    d1.setFullYear(o1.year, o1.month, o1.day);
    d2.setFullYear(o2.year, o2.month, o2.day);
    return this.compare(d1, d2);
  }

  /**
   * @stable [07.01.2020]
   * @tested
   * @param {IFromToDayOfYearEntity} range
   * @param {IDayOfYearEntity} entity
   * @returns {IFromToDayOfYearEntity}
   */
  public selectDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): IFromToDayOfYearEntity {
    const {to = {}, from = {}} = range || {};
    const {day, month, year} = entity;
    const onlyFrom = entity.from === true;
    const onlyTo = entity.to === true;
    const isDateToEmpty = R.isEmpty(to);
    const isDateFromEmpty = R.isEmpty(from);

    if (onlyFrom) { // Manual set
      return {to, from: {day, month, year}};
    } else if (onlyTo) { // Manual set
      return {from, to: {day, month, year}};
    }

    if (isDateToEmpty && isDateFromEmpty) {
      return ({from: {day, month, year}, to});
    } else if (!isDateFromEmpty && !isDateToEmpty) {
      const compareResult1 = this.compareDayOfYearEntity(from, entity);
      const compareResult2 = this.compareDayOfYearEntity(entity, to);
      if (compareResult1 === 0) {
        return {from: {}, to};
      } else if (compareResult2 === 0) {
        return {from, to: {}};
      } else if (compareResult1 === 1) {
        return ({from: {day, month, year}, to});
      } else {
        return ({from, to: {day, month, year}});
      }
    } else if (!isDateFromEmpty) {
      const compareResult = this.compareDayOfYearEntity(from, entity);
      if (compareResult >= 0) {
        return ({from: compareResult === 0 ? {} : {day, month, year}, to});
      } else {
        return ({from, to: {day, month, year}});
      }
    } else if (!isDateToEmpty) {
      // The "from value" is not set
      const compareResult = this.compareDayOfYearEntity(entity, to);
      if (compareResult >= 0) {
        return ({from: compareResult === 0 ? {} : {...to}, to: {day, month, year}});
      } else {
        return ({from: {day, month, year}, to});
      }
    }
    return ({from, to});
  }

  /**
   * @stable [07.01.2020]
   * @tested
   * @param {IFromToDayOfYearEntity} range
   * @param {IDayOfYearEntity} entity
   * @returns {boolean}
   */
  public isDayOfYearBelongToDaysOfYearRange(range: IFromToDayOfYearEntity, entity: IDayOfYearEntity): boolean {
    const {from = {}, to = {}} = range;
    const isDateToEmpty = R.isEmpty(to);
    const isDateFromEmpty = R.isEmpty(from);

    if (!isDateFromEmpty && isDateToEmpty) {
      const compareResult1 = this.compareDayOfYearEntity(entity, from);
      return compareResult1 === 0;
    }
    if (isDateFromEmpty && !isDateToEmpty) {
      const compareResult2 = this.compareDayOfYearEntity(entity, to);
      return compareResult2 === 0;
    }
    if (!isDateToEmpty && !isDateFromEmpty) {
      const compareResult1 = this.compareDayOfYearEntity(entity, from);
      const compareResult2 = this.compareDayOfYearEntity(entity, to);
      return compareResult1 >= 0 && compareResult2 <= 0;
    }
    return false;
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {ICalendarEntity}
   */
  public asCalendar(cfg?: ICalendarConfigEntity): ICalendarEntity {
    const syntheticCalendar = ifNotNilThanValue(cfg, () => cfg.useSyntheticCalendar === true, false);
    cfg = {
      isoWeek: syntheticCalendar || false,
      ...cfg,
      ...(
        syntheticCalendar ? ({date: new Date('01/01/1900')}) : ({})  // The date "01/01/1900" starts on Monday.
      ),
    };
    const {isoWeek} = cfg;
    const firstDayOfMonthAsMDate = this.asFirstDayOfMonth(cfg);
    const firstDayOfIsoWeek = firstDayOfMonthAsMDate.isoWeekday();
    const maxWeeksCount = 6;
    const maxDaysCountOnWeek = 7;

    const data: ICalendarWeekEntity[] = [];
    let currentDate;
    let currentMonthValue;
    let dayEntity: ICalendarDayEntity;

    const buildDayEntity = (itm: ICalendarDayEntity, mDate: MomentT): ICalendarDayEntity => ({
      current: false,
      next: false,
      previous: false,
      ...itm,
      day: mDate.date(),
      year: mDate.year(),
      month: mDate.month(), // Months are zero indexed, so January is month 0.
    });

    for (let i = 0; i < maxWeeksCount; i++) {
      const row = {id: i};
      data.push(row);

      for (let j = 0; j < maxDaysCountOnWeek; j++) {
        if (R.isNil(currentDate)) {
          if (firstDayOfIsoWeek === j + 1) { // The ISO day of the week: 1 === Monday and 7 === Sunday
            currentDate = firstDayOfMonthAsMDate.toDate();
            currentMonthValue = firstDayOfMonthAsMDate.month();

            dayEntity = buildDayEntity({current: true, date: currentDate}, firstDayOfMonthAsMDate);
            row[j] = dayEntity;

            for (let k = j - 1, m = 1; k >= 0; k--) {
              const mDate = this.addDays({date: currentDate, duration: -1 * m++});
              dayEntity = buildDayEntity({previous: true, date: mDate.toDate()}, mDate);
              row[k] = dayEntity;
            }
          }
        } else {
          const currentMDate = this.addDays({date: currentDate, duration: 1});
          currentDate = currentMDate.toDate();
          const next = currentMDate.month() !== currentMonthValue;
          dayEntity = buildDayEntity({current: !next, next, date: currentDate}, currentMDate);
          row[j] = dayEntity;
        }
      }
    }

    const result = {
      days: data,
      daysLabels: this.getLocalizedShortestWeekdays(cfg),
    };
    if (!isoWeek) {
      result.days = data.map((row, index) => {
        const newRow = {...row};
        for (let i = 0; i < maxDaysCountOnWeek - 1; i++) {
          newRow[i + 1] = row[i];
        }
        const startingDate = data[index - 1];
        if (R.isNil(startingDate)) {
          const startingMDate = this.addDays({date: data[0][0].date, duration: -1});
          dayEntity = buildDayEntity({previous: true, date: startingMDate.toDate()}, startingMDate);
          newRow[0] = dayEntity;
        } else {
          newRow[0] = data[index - 1][maxDaysCountOnWeek - 1];
        }
        return newRow;
      });
    }
    let truncateFirstWeek = true;
    let truncateLastWeek = true;
    const days = result.days;
    for (let j = 0; j < maxDaysCountOnWeek; j++) {
      truncateFirstWeek = truncateFirstWeek && days[0][j].current === false;
      truncateLastWeek = truncateLastWeek && days[days.length - 1][j].current === false;
    }
    return {
      ...result,
      days: [
        ...(truncateFirstWeek ? [] : [days[0]]),
        ...days.slice(1, days.length - 1),
        ...(truncateLastWeek ? [] : [days[days.length - 1]])
      ],
    };
  }

  /**
   * @stable [03.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @param {(date: MomentT) => TResult} handler
   * @returns {TResult}
   */
  private processValidMomentDate<TResult>(cfg: IDateTimeConfigEntity, handler: (date: MomentT) => TResult): TResult {
    const momentDate = this.asMomentDate(cfg);
    return orNull(momentDate.isValid(), () => handler(momentDate));
  }

  /**
   * @deprecated
   */
  private getCurrentMomentDate(): moment.Moment {
    return this.toMomentDate(this.currentDate);
  }

  /**
   * @stable [11.08.2018]
   * @returns {string}
   */
  private get timeZone(): string {
    return this.dateTimeSettings.timeZone;
  }

  /**
   * @stable [25.12.2019]
   * @returns {Date}
   */
  private get currentDate(): Date {
    return this.dateTimeSettings.currentDate;
  }

  private get dateTimeFormat(): string {
    return this.dateTimeSettings.dateTimeFormat;
  }

  private get dateFormat(): string {
    return this.dateTimeSettings.dateFormat;
  }

  private get timeFormat(): string {
    return this.dateTimeSettings.timeFormat;
  }

  private get uiDateFormat(): string {
    return this.dateTimeSettings.uiDateFormat;
  }

  /**
   * @stable [25.12.2019]
   * @returns {string}
   */
  private get uiTimeFormat(): string {
    return this.dateTimeSettings.uiTimeFormat;
  }

  /**
   * @stable [25.12.2019]
   * @returns {string}
   */
  private get uiDefaultTime(): string {
    return this.dateTimeSettings.uiDefaultTime;
  }

  /**
   * @stable [02.01.2019]
   * @returns {string}
   */
  private get pstTimeFormat(): string {
    return this.dateTimeSettings.pstTimeFormat;
  }

  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [07.01.2020]
   * @param {Date} date
   * @returns {Date}
   */
  private buildDayOfYear(date?: Date): Date {
    const d = date ? new Date(date) : new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
}
