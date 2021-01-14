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
  UNDEF,
} from '../../definitions.interface';
import {
  ArrayUtils,
  ConditionUtils,
  DateUtils,
  defValuesFilter,
  NvlUtils,
  ObjectUtils,
  orNull,
  TypeUtils,
} from '../../util';
import {
  IDateTimeSettings,
  ISettingsEntity,
} from '../../settings';
import { IDateConverter } from './date-converter.interface';
import {
  DateTimeLikeTypeT,
  DefaultEntities,
  EnvironmentGlobalVariablesEnum,
  ICalendarConfigEntity,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarWeekEntity,
  IDateTimeConfigEntity,
  IDateTimeIndexConfigEntity,
  IDayOfYearEntity,
  IEnvironment,
  IFromToDayOfYearEntity,
  IMinMaxDatesRangeConfigEntity,
  IPersonAgeConfigEntity,
  IWeekConfigEntity,
} from '../../definition';

/**
 * @stable [14.01.2021]
 */
type MomentT = moment.Moment;

/**
 * @stable [28.12.2020]
 * @param cronDayFactory
 */
const getCalendarWeekEntities =
  (cronDayFactory: (index: number) => number = (index) => index): ICalendarWeekEntity =>
    ({
      id: 0,
      ...R.mergeAll(
        ArrayUtils
          .makeArray(DefaultEntities.NUMBER_OF_DAYS_PER_WEEK)
          .map((_, index): ICalendarWeekEntity => ({
            [index]: {
              cronDay: cronDayFactory(index),
              current: true,
              day: index,
            },
          }))
      ),
    });

@injectable()
export class DateConverter implements IDateConverter<MomentT> {

  /**
   * @stable [27.12.2020]
   * @private
   */
  private static readonly DEFAULT_CALENDAR_WEEK_ENTITIES = getCalendarWeekEntities();

  /**
   * @stable [27.12.2020]
   * @private
   */
  private static readonly ISO_CALENDAR_WEEK_ENTITIES = getCalendarWeekEntities((index) => {
    if (index >= 0 && index < DefaultEntities.NUMBER_OF_DAYS_PER_WEEK - 1) {
      return index + 1;
    }
    return 0;
  });

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  private readonly appOnlineStartingDate = Date.now();

  /**
   * @stable [22.01.2020]
   */
  constructor() {
    this.environment.setVariable(EnvironmentGlobalVariablesEnum.DATE_CONVERTER, this);
  }

  /**
   * @stable [23.09.2020]
   */
  public get uiDateFormat(): string {
    return this.dateTimeSettings.uiDateFormat;
  }

  /**
   * @stable [14.01.2021]
   */
  public get weekdays(): string[] {
    return this.getWeekdays();
  }

  /**
   * @stable [10.08.2021]
   */
  public get weekdaysShort(): string[] {
    return this.getWeekdaysShort();
  }

  /**
   * @stable [14.01.2021]
   */
  public get weekdaysShortest(): string[] {
    return this.getWeekdaysShortest();
  }

  /**
   * @stable [22.01.2020]
   * @returns {number}
   */
  public get appOnlineLifeTimeInSeconds(): number {
    return Math.round((Date.now() - this.appOnlineStartingDate) * 0.001);
  }

  /**
   * @stable [22.01.2020]
   * @returns {number}
   */
  public get appOnlineLifeTimeInHours(): number {
    return Math.round(this.appOnlineLifeTimeInSeconds / 3600);
  }

  /**
   * @stable [20.10.2020]
   * @param date1
   * @param date2
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
   * @stable [20.10.2020]
   * @param date1
   * @param date2
   */
  public equal(date1: DateTimeLikeTypeT, date2: DateTimeLikeTypeT): boolean {
    return this.compare(date1, date2) === 0;
  }

  /**
   * @deprecated
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
   * @stable [26.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsString(cfg: IDateTimeConfigEntity<MomentT>): string {
    const {
      date,
      outputFormat,
    } = cfg;
    if (date instanceof Date || ObjectUtils.isObjectNotEmpty(date)) {
      return this.processValidMomentDate(cfg, (mDate) => mDate.format(outputFormat)) || String(date);
    } else {
      return ConditionUtils.orUndef(!cfg.returnUndef, () => '');
    }
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asStartUnitOf(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
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
  public asDayOfYearEntity(cfg?: IDateTimeConfigEntity<MomentT>): IDayOfYearEntity {
    return this.processValidMomentDate(cfg,
      (mDate) => ({day: mDate.date(), month: mDate.month(), year: mDate.year()}));
  }

  /**
   * @stable [03.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asEndUnitOf(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.processValidMomentDate({
      date: this.getCurrentDate(),
      ...cfg,
    }, (mDate) => mDate.endOf(cfg.unit as moment.unitOfTime.StartOf));
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asFirstDayOfWeek(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asStartUnitOf({...cfg, unit: this.weekUnit});
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asFirstDayOfMonth(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asStartUnitOf({...cfg, unit: 'month'});
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asFirstDayOfQuarter(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asStartUnitOf({...cfg, unit: 'quarter'});
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asFirstDayOfYear(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asStartUnitOf({...cfg, unit: 'year'});
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asFirstDayOfWeekAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asFirstDayOfWeek(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [06.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asFirstDayOfMonthAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asFirstDayOfMonth(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asFirstDayOfQuarterAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asFirstDayOfQuarter(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [21.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asFirstDayOfYearAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asFirstDayOfYear(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asLastDayOfQuarter(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asEndUnitOf({...cfg, unit: 'quarter'});
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asLastDayOfQuarterAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asLastDayOfQuarter(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asLastDayOfMonth(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asEndUnitOf({...cfg, unit: 'month'});
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asLastDayOfMonthAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asLastDayOfMonth(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asLastDayOfWeek(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asEndUnitOf({...cfg, unit: this.weekUnit});
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asLastDayOfWeekAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asLastDayOfWeek(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [08.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public asLastDayOfYear(cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.asEndUnitOf({...cfg, unit: 'year'});
  }

  /**
   * @stable [08.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asLastDayOfYearAsDate(cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.asLastDayOfYear(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addDuration(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
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
  public asAbsoluteDayOfYear(cfg?: IDateTimeConfigEntity<MomentT>): number {
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
  public addDays(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDuration({...cfg, unit: 'days'});
  }

  /**
   * @stable [08.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addDaysAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addDays(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [03.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addMonths(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDuration({...cfg, unit: 'months'});
  }

  /**
   * @stable [06.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addMonthsAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addMonths(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [06.01.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addQuartersAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addQuarters(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addQuarters(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDuration({...cfg, unit: 'quarters'});
  }

  /**
   * @stable [08.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addYears(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDuration({...cfg, unit: 'years'});
  }

  /**
   * @stable [08.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addYearsAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addYears(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addWeeks(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDuration({...cfg, unit: 'weeks'});
  }

  /**
   * @stable [07.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addWeeksAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addWeeks(cfg), (mDate) => mDate.toDate());
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public addDaysToUiDate(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
    return this.addDays({...cfg, inputFormat: this.uiDateFormat});
  }

  /**
   * @stable [02.01.2019]
   * @tested
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public addDaysToUiDateAsDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.addDaysToUiDate(cfg), (momentDate) => momentDate.toDate());
  }

  /**
   * @stable [05.11.2020]
   * @param cfg
   */
  public asDaysOfMonth(cfg: IDateTimeConfigEntity<MomentT>): MomentT[] {
    const firstDayOfMonth = this.asFirstDayOfMonthAsDate(cfg);

    return ArrayUtils
      .makeArray(this.asLastDayOfMonthAsDate(cfg).getDate())
      .map((_, index) => this.addDays({date: firstDayOfMonth, duration: index}));
  }

  /**
   * @stable [05.11.2020]
   * @param cfg
   */
  public asDaysOfMonthAsDates(cfg: IDateTimeConfigEntity<MomentT>): Date[] {
    return this.asDaysOfMonth(cfg).map((date) => this.asDate({date}));
  }

  /**
   * @deprecated
   */
  public fromDateTimeToArbitraryFormat(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  /**
   * @stable [09.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsPstDateString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({...cfg, outputFormat: this.pstDateFormat});
  }

  /**
   * @stable [09.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsPstTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({...cfg, outputFormat: this.pstTimeFormat});
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateTimeToPstTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({...cfg, inputFormat: this.dateTimeFormat, outputFormat: this.pstTimeFormat});
  }

  /**
   * @deprecated
   */
  public fromDateTimeToDate(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateFormat);
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsDateTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({...cfg, outputFormat: this.dateTimeFormat});
  }

  /**
   * @stable [05.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsDateString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({...cfg, outputFormat: this.dateFormat});
  }

  /**
   * @stable [26.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public dateAsUiDateString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({outputFormat: this.uiDateFormat, ...cfg});
  }

  /**
   * @stable [07.12.2020]
   * @param cfg
   */
  public fromDateTimeToUiDateTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({
      inputFormat: this.dateTimeFormat,
      ...cfg,
      outputFormat: this.concatUiDateTime(cfg.outputFormat, cfg.outputTimeFormat),
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
   * @deptecated
   */
  public fromDateTimeToDateTime(date: DateTimeLikeTypeT): string {
    return this.fromDateTimeToArbitraryFormat(date, this.dateTimeFormat);
  }

  /**
   * @stable [21.12.2020]
   * @param cfg
   */
  public fromUiDateTimeToDateTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsString({
      outputFormat: this.dateTimeFormat,
      ...cfg,
      date: `${cfg.date} ${NvlUtils.nvl(cfg.time, this.uiDefaultTime)}`.trim(),
      inputFormat: `${
        NvlUtils.nvl(cfg.inputFormat, this.uiDateFormat)} ${
        NvlUtils.nvl(cfg.inputTimeFormat, this.uiTimeFormat)
      }`.trim(),
    });
  }

  /**
   * @stable [03.05.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {number}
   */
  public asWeekdayNumber(cfg?: IDateTimeConfigEntity<MomentT>): number {
    return this.processValidMomentDate({
      date: this.getCurrentDate(),
      ...cfg,
    }, (mDate) => this.isIsoWeek ? mDate.isoWeekday() : mDate.weekday());
  }

  /**
   * @stable [14.01.2020]
   * @param cfg
   */
  public isoWeekDayAsOrdinaryDay(cfg: IDateTimeIndexConfigEntity): number {
    const {
      index,
    } = cfg;

    return DateUtils.isoWeekDayAsOrdinaryDay(index);
  }

  /**
   * @stable [02.01.2019]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromUiDateToDateTimeString(cfg: IDateTimeConfigEntity<MomentT>): string {
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
      [timeFieldName]: ConditionUtils.orUndef<string>(date, () => this.fromDateTimeToTime(date)),
      [dateFieldName]: ConditionUtils.orUndef<string>(date, () => this.fromDateTimeToDate(date)),
    });
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
    return ConditionUtils.ifNotNilThanValue<moment.Moment, Date>(
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
   * @stable [07.01.2020]
   * @param {Date} date
   * @returns {Date}
   */
  public asDayOfYear(date?: Date): Date {
    const d = new Date(date || this.getCurrentDate());
    d.setHours(0, 0, 0, 0);
    return d;
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
    return ConditionUtils.ifNotNilThanValue<moment.Moment, moment.Moment>(
      this.tryAddXDurationAsMomentDate(unit, duration, date, inputFormat), (value) => value.startOf(startOf)
    );
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
      this.weekUnit as moment.unitOfTime.StartOf,
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
    return ConditionUtils.ifNotNilThanValue<moment.Moment, Date>(
      this.tryGetFirstDayOfWeekAsMomentDate(duration, date, inputFormat), (value) => value.toDate()
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
   * @stable [26.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateToUiDateString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsUiDateString({
      strict: false, // UTC: ignore a time, by default (+00:00 | Z)
      inputFormat: this.dateFormat,
      ...cfg,
    });
  }

  /**
   * @stable [26.03.2020]
   * @param {IDateTimeConfigEntity} cfg
   * @returns {string}
   */
  public fromDateTimeToUiDateString(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsUiDateString({
      inputFormat: this.dateTimeFormat,
      ...cfg,
    });
  }

  /**
   * @stable [08.01.2020]
   * @param {IDayOfYearEntity} entity
   * @param {IDateTimeConfigEntity} cfg
   * @returns {MomentT}
   */
  public fromDayOfYearEntity(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity<MomentT>): MomentT {
    const mDate = this.asMomentDate({date: this.asDayOfYear(), ...cfg});
    if (TypeUtils.isNumber(entity.month)) {
      mDate.month(entity.month);
    }
    if (TypeUtils.isNumber(entity.year)) {
      mDate.year(entity.year);
    }
    if (TypeUtils.isNumber(entity.day)) {
      mDate.date(entity.day);
    }
    return orNull(mDate.isValid(), () => mDate);
  }

  /**
   * @stable [08.01.2020]
   * @param {IDayOfYearEntity} entity
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public fromDayOfYearEntityAsDate(entity: IDayOfYearEntity, cfg?: IDateTimeConfigEntity<MomentT>): Date {
    return ConditionUtils.ifNotNilThanValue(this.fromDayOfYearEntity(entity, cfg), (mDate) => mDate.toDate());
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
   * @stable [26.03.2020]
   * @returns {string}
   */
  public currentDateAsUiDateString(cfg?: IDateTimeConfigEntity<MomentT>): string {
    return this.dateAsUiDateString({...cfg, date: this.getCurrentDate()});
  }

  /**
   * @stable [14.01.2020]
   * @param cfg
   */
  public getWeekdays(cfg?: IWeekConfigEntity): string[] {
    return this.getWeekLocale(cfg)
      // @ts-ignore TODO
      .weekdays(true);
  }

  /**
   * @stable [14.01.2020]
   * @param cfg
   */
  public getWeekdaysShort(cfg?: IWeekConfigEntity): string[] {
    return this.getWeekLocale(cfg)
      // @ts-ignore TODO
      .weekdaysShort(true);
  }

  /**
   * @stable [14.01.2020]
   * @param cfg
   */
  public getWeekdaysShortest(cfg?: IWeekConfigEntity): string[] {
    return this.getWeekLocale(cfg)
      // @ts-ignore TODO
      .weekdaysMin(true);
  }

  /**
   * @stable [27.12.2020]
   * @param cfg
   */
  public getCalendarWeekEntity(cfg?: IDateTimeConfigEntity<MomentT>): ICalendarWeekEntity {
    const {
      isoWeek = this.isIsoWeek,
    } = cfg || {};

    return isoWeek
      ? DateConverter.ISO_CALENDAR_WEEK_ENTITIES
      : DateConverter.DEFAULT_CALENDAR_WEEK_ENTITIES;
  }

  /**
   * @stable [28.12.2020]
   * @param cfg
   */
  public asCronDay(cfg?: IDateTimeConfigEntity<MomentT>): number {
    const {
      index,
    } = cfg || {};

    return this.getCalendarWeekEntity(cfg)[index].cronDay;
  }

  /**
   * @stable [14.01.2021]
   * @param cfg
   */
  public getWeekday(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.getWeekdays(cfg)[cfg.index];
  }

  /**
   * @stable [14.01.2021]
   * @param cfg
   */
  public getWeekdayShort(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.getWeekdaysShort(cfg)[cfg.index];
  }

  /**
   * @stable [14.01.2021]
   * @param cfg
   */
  public getWeekdayShortest(cfg: IDateTimeConfigEntity<MomentT>): string {
    return this.getWeekdaysShortest(cfg)[cfg.index];
  }

  /**
   * @stable [22.01.2020]
   * @param {IPersonAgeConfigEntity} cfg
   * @returns {number}
   */
  public asPersonAge(cfg: IPersonAgeConfigEntity<MomentT>): number {
    const $cfg: IPersonAgeConfigEntity<MomentT> = {
      date: this.getCurrentDate(),
      inputFormat: this.uiDateFormat,
      ...cfg as IDateTimeConfigEntity<MomentT>,
    };
    return this.processValidMomentDate(
      $cfg,
      (mDate) => mDate.diff(this.asMomentDate({date: cfg.birthday, inputFormat: $cfg.inputFormat}), 'years')
    );
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
  public asMomentDate(cfg: IDateTimeConfigEntity<MomentT>): MomentT {
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
   * @param {IDateTimeConfigEntity} cfg
   * @returns {Date}
   */
  public asDate(cfg: IDateTimeConfigEntity<MomentT>): Date {
    return this.processValidMomentDate(cfg, (mDate) => mDate.toDate());
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
    return this.compare(this.fromDayOfYearEntityAsDate(o1), this.fromDayOfYearEntityAsDate(o2));
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
      return ({from: {day, month, year}, to: {}});
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
   * @stable [08.01.2020]
   * @param {IMinMaxDatesRangeConfigEntity} cfg
   * @returns {boolean}
   */
  public isDateBelongToDatesRange(cfg: IMinMaxDatesRangeConfigEntity): boolean {
    const minDate = NvlUtils.nvl(cfg.minDate, this.dateTimeSettings.minDate);
    const maxDate = NvlUtils.nvl(cfg.maxDate, this.dateTimeSettings.maxDate);

    return this.compare(cfg.date, minDate) >= 0 && this.compare(maxDate, cfg.date) >= 0;
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
      return this.compareDayOfYearEntity(entity, from) === 0;
    }
    if (isDateFromEmpty && !isDateToEmpty) {
      return this.compareDayOfYearEntity(entity, to) === 0;
    }
    if (!isDateToEmpty && !isDateFromEmpty) {
      const compareResult1 = this.compareDayOfYearEntity(entity, from);
      const compareResult2 = this.compareDayOfYearEntity(entity, to);
      return compareResult1 >= 0 && compareResult2 <= 0;
    }
    return false;
  }

  /**
   * @stable [07.03.2020]
   * @param {IDayOfYearEntity} entity1
   * @param {IDayOfYearEntity} entity2
   * @returns {boolean}
   */
  public isDayOfYearEqualOtherDayOfYear(entity1: IDayOfYearEntity, entity2: IDayOfYearEntity): boolean {
    return !R.isNil(entity1) && !R.isNil(entity2)
      && (
        entity1.day === entity2.day
        && entity1.month === entity2.month
        && entity1.year === entity2.year
      );
  }

  /**
   * @stable [28.09.2020]
   * @param cfg
   */
  public isDateValid(cfg?: ICalendarConfigEntity): boolean {
    const date = this.asDate(cfg);
    return date instanceof Date && date.getFullYear() >= 1900;
  }

  /**
   * @stable [03.01.2020]
   * @param {IDateTimeConfigEntity} $cfg
   * @returns {ICalendarEntity}
   */
  public asCalendar($cfg?: ICalendarConfigEntity): ICalendarEntity {
    const useSyntheticCalendar = $cfg?.useSyntheticCalendar === true;

    const cfg: IDateTimeConfigEntity<MomentT> = {
      ...$cfg,
      isoWeek: useSyntheticCalendar || NvlUtils.nvl($cfg?.isoWeek, this.isIsoWeek),
      ...(
        useSyntheticCalendar
          ? TypeUtils.asType<IDateTimeConfigEntity<MomentT>>({date: new Date('01/01/1900')})  // The date "01/01/1900" starts on Monday.
          : ({})
      ),
    };
    const {
      isoWeek,
    } = cfg;

    const firstDayOfMonthAsMDate = this.asFirstDayOfMonth(cfg);
    const firstDayOfIsoWeek = firstDayOfMonthAsMDate.isoWeekday();
    const maxWeeksCount = 6;
    const today = this.asDayOfYear();

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
      month: mDate.month(), // Months are zero indexed, so January is month 0
      today: this.compare(today, mDate.toDate()) === 0,
      year: mDate.year(),
    });

    for (let i = 0; i < maxWeeksCount; i++) {
      const row = {id: i};
      data.push(row);

      for (let j = 0; j < DefaultEntities.NUMBER_OF_DAYS_PER_WEEK; j++) {
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
      daysLabels: this.getWeekdaysShortest(cfg),
    };
    if (!isoWeek) {
      result.days = data.map((row, index) => {
        const newRow = {...row};
        for (let i = 0; i < DefaultEntities.NUMBER_OF_DAYS_PER_WEEK - 1; i++) {
          newRow[i + 1] = row[i];
        }
        const startingDate = data[index - 1];
        if (R.isNil(startingDate)) {
          const startingMDate = this.addDays({date: data[0][0].date, duration: -1});
          dayEntity = buildDayEntity({previous: true, date: startingMDate.toDate()}, startingMDate);
          newRow[0] = dayEntity;
        } else {
          newRow[0] = data[index - 1][DefaultEntities.NUMBER_OF_DAYS_PER_WEEK - 1];
        }
        return newRow;
      });
    }

    let truncateFirstWeek = true;
    let truncateLastWeek = true;
    const days = result.days;

    for (let j = 0; j < DefaultEntities.NUMBER_OF_DAYS_PER_WEEK; j++) {
      truncateFirstWeek = truncateFirstWeek && days[0][j].current === false;
      truncateLastWeek = truncateLastWeek && days[days.length - 1][j].current === false;
    }

    return {
      isoWeek,
      ...result,
      days: [
        ...(truncateFirstWeek ? [] : [days[0]]),
        ...days.slice(1, days.length - 1),
        ...(truncateLastWeek ? [] : [days[days.length - 1]])
      ],
    };
  }

  /**
   * @stable [28.12.2020]
   * @param cfg
   */
  public asCalendarWeekEntity(cfg?: ICalendarConfigEntity<MomentT>): ICalendarEntity {
    return {
      days: [this.getCalendarWeekEntity(cfg)],
      daysLabels: this.getWeekdaysShortest(cfg),
    };
  }

  /**
   * @stable [21.12.2020]
   * @param cfg
   * @param handler
   * @private
   */
  private processValidMomentDate<TResult>(cfg: IDateTimeConfigEntity<MomentT>, handler: (date: MomentT) => TResult): TResult {
    const momentDate = this.asMomentDate(cfg);

    return momentDate.isValid()
      ? handler(momentDate)
      : (cfg.returnUndef ? UNDEF : null);
  }

  /**
   * @deprecated
   */
  private getCurrentMomentDate(): moment.Moment {
    return this.toMomentDate(this.currentDate);
  }

  /**
   * @stable [07.12.2020]
   * @param uiDateFormat
   * @param uiTimeFormat
   * @private
   */
  private concatUiDateTime(uiDateFormat: string, uiTimeFormat: string): string {
    return `${
      NvlUtils.nvl(uiDateFormat, this.uiDateFormat)} ${
      NvlUtils.nvl(uiTimeFormat, this.uiTimeFormat)
    }`.trim();
  }

  /**
   * @stable [14.01.2020]
   * @param cfg
   * @private
   */
  private getWeekLocale(cfg: IWeekConfigEntity): moment.Locale {
    const {
      isoWeek = this.isIsoWeek,
      locale = this.locale,
    } = cfg || {};

    return moment
      .localeData(
        isoWeek && locale === DefaultEntities.LOCALE
          ? 'en-gb' // https://en.wikipedia.org/wiki/Date_and_time_notation_in_the_United_Kingdom
          : locale
      );
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

  /**
   * @stable [24.09.2020]
   */
  private get dateFormat(): string {
    return this.dateTimeSettings.dateFormat;
  }

  private get timeFormat(): string {
    return this.dateTimeSettings.timeFormat;
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

  /**
   * @stable [03.05.2020]
   * @returns {string}
   */
  private get weekUnit(): string {
    return this.isIsoWeek ? 'isoWeek' : 'week';
  }

  /**
   * https://en.wikipedia.org/wiki/ISO_week_date
   * Weeks start with Monday.
   *
   * @stable [28.12.2020]
   * @private
   */
  private get isIsoWeek(): boolean {
    return this.dateTimeSettings.isoWeek;
  }

  /**
   * @stable [14.01.2020]
   * @private
   */
  private get locale(): string {
    return this.settings.locale;
  }

  private get pstDateFormat(): string {
    return this.dateTimeSettings.pstDateFormat;
  }

  /**
   * @stable [03.05.2020]
   * @returns {IDateTimeSettings}
   */
  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }
}
