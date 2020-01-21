import * as moment from 'moment';

import {
  ICalendarEntityWrapper,
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
  IPreviousWrapper,
  IStrictWrapper,
  ITimeWrapper,
  ITodayWrapper,
  IUnitWrapper,
  IUseSyntheticCalendarWrapper,
  IYearWrapper,
  IZoneWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * @stable [22.12.2019]
 */
export type DateTimeLikeTypeT = string | Date;
export type MomentT = moment.Moment;

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
 * @config-entity
 * @stable [21.01.2020]
 */
export interface IDateRangeConfigEntity
  extends IDateWrapper<Date>,
    IMaxDateWrapper<Date>,
    IMinDateWrapper<Date> {
}

/**
 * @config-entity
 * @stable [04.01.2020]
 */
export interface ICalendarConfigEntity<TDate = Date>
  extends IDateTimeConfigEntity<TDate>,
    IUseSyntheticCalendarWrapper {
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

/**
 * @wrapper-entity
 * @stable [21.01.2020]
 */
export interface ICalendarEntityWrapperEntity
  extends ICalendarEntityWrapper<ICalendarEntity> {
}
