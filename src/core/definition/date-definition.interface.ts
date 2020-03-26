import * as moment from 'moment';

import {
  IBirthdayWrapper,
  ICurrentWrapper,
  IDateWrapper,
  IDaysLabelsWrapper,
  IDaysWrapper,
  IDayWrapper,
  IDurationWrapper,
  IEntityIdTWrapper,
  IFromToEntity,
  IIndexWrapper,
  IInputFormatWrapper,
  IInputTimeFormatWrapper,
  IIsoWeekWrapper,
  IMaxDateWrapper,
  IMinDateWrapper,
  IMonthWrapper,
  INextWrapper,
  IOutputFormatWrapper,
  IOutputTimeFormatWrapper,
  IPeriodModeWrapper,
  IPeriodTypeWrapper,
  IPreviousWrapper,
  IStrictWrapper,
  ITimeWrapper,
  ITodayWrapper,
  IUnitWrapper,
  IYearWrapper,
  IZoneWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * @stable [22.12.2019]
 */
export type DateTimeLikeTypeT = string | Date;
export type MomentT = moment.Moment;

/**
 * @stable [06.03.2020]
 */
export enum DatePeriodsEnum {
  CUSTOM,
  DAY,
  MONTH,
  PREVIOUS_DAY,
  PREVIOUS_MONTH,
  PREVIOUS_QUARTER,
  PREVIOUS_WEEK,
  QUARTER,
  WEEK,
}

/**
 * @stable [25.03.2020]
 */
export const DAYS_PERIODS = [DatePeriodsEnum.DAY, DatePeriodsEnum.PREVIOUS_DAY];
export const WEEKS_PERIODS = [DatePeriodsEnum.WEEK, DatePeriodsEnum.PREVIOUS_WEEK];
export const MONTHS_PERIODS = [DatePeriodsEnum.MONTH, DatePeriodsEnum.PREVIOUS_MONTH];
export const QUARTERS_PERIODS = [DatePeriodsEnum.QUARTER, DatePeriodsEnum.PREVIOUS_QUARTER];

// TODO ?
export const DAYS_OF_WEEK = Object.freeze<{id: number, name: string}>([
  {id: 0, name: 'Sunday'},
  {id: 1, name: 'Monday'},
  {id: 2, name: 'Tuesday'},
  {id: 3, name: 'Wednesday'},
  {id: 4, name: 'Thursday'},
  {id: 5, name: 'Friday'},
  {id: 6, name: 'Saturday'}
]);

/**
 * @config-entity
 * @stable [17.12.2019]
 */
export interface IDateTimeConfigEntity<TDate = Date>
  extends IDateWrapper<DateTimeLikeTypeT | TDate>,
    IDurationWrapper<StringNumberT>,
    IIndexWrapper,
    IInputFormatWrapper,
    IInputTimeFormatWrapper,
    IIsoWeekWrapper,
    IOutputFormatWrapper,
    IOutputTimeFormatWrapper,
    IStrictWrapper,
    ITimeWrapper,
    IUnitWrapper<string>,
    IZoneWrapper {
}

/**
 * @stable [07.03.2020]
 */
export type DatesRangeValueT = Array<DateTimeLikeTypeT | DatePeriodsEnum>;

/**
 * @entity
 * @stable [26.03.2020]
 */
export interface IDatePeriodModeEntity
  extends IPeriodModeWrapper<DatePeriodsEnum> {
}

/**
 * @entity
 * @stable [26.03.2020]
 */
export interface IDatePeriodTypeEntity
  extends IPeriodTypeWrapper<DatePeriodsEnum> {
}

/**
 * @entity
 * @stable [07.03.2020]
 */
export interface IDatesRangeEntity
  extends IFromToEntity<DateTimeLikeTypeT>,
    IDatePeriodModeEntity {
}

/**
 * @config-entity
 * @stable [21.01.2020]
 */
export interface IMinMaxDatesRangeConfigEntity
  extends IDateWrapper<Date>,
    IMaxDateWrapper<Date>,
    IMinDateWrapper<Date> {
}

/**
 * @config-entity
 * @stable [22.01.2020]
 */
export interface IPersonAgeConfigEntity<TDate = Date>
  extends IDateTimeConfigEntity<TDate>,
    IBirthdayWrapper {
}

/**
 * @entity
 * @stable [07.01.2020]
 */
export interface IDayOfYearEntity
  extends IDayWrapper,
    IFromToEntity<boolean>,
    IMonthWrapper,
    IYearWrapper {
}

/**
 * @entity
 * @stable [07.01.2020]
 */
export interface IFromToDayOfYearEntity
  extends IFromToEntity<IDayOfYearEntity> {
}

/**
 * @entity
 * @stable [03.01.2020]
 */
export interface ICalendarDayEntity
  extends IDayOfYearEntity,
    ICurrentWrapper<boolean>,
    IDateWrapper<Date>,
    INextWrapper<boolean>,
    IPreviousWrapper<boolean>,
    ITodayWrapper<boolean> {
}

/**
 * @entity
 * @stable [03.01.2020]
 */
export interface ICalendarWeekEntity
  extends IEntityIdTWrapper {
  [index: number]: ICalendarDayEntity;
}

/**
 * @entity
 * @stable [03.01.2020]
 */
export interface ICalendarEntity
  extends IDaysWrapper<ICalendarWeekEntity[]>,
    IDaysLabelsWrapper<string[]> {
}
