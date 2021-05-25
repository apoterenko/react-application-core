import {
  IBirthdayWrapper,
  IDateWrapper,
  IDayWrapper,
  IDurationWrapper,
  IFromToEntity,
  IInputFormatWrapper,
  IInputTimeFormatWrapper,
  IIsoWeekWrapper,
  ILocaleWrapper,
  IMaxDateWrapper,
  IMinDateWrapper,
  IMonthWrapper,
  IOutputFormatWrapper,
  IOutputTimeFormatWrapper,
  IPeriodModeWrapper,
  IPeriodTypeWrapper,
  IReturnUndefWrapper,
  IStrictWrapper,
  ITimeWrapper,
  IUnitWrapper,
  IYearWrapper,
  IZoneWrapper,
  StringNumberT,
} from '../definitions.interface';
import { IIndexEntity } from './entity-definition.interface';

/**
 * @stable [22.12.2019]
 */
export type DateTimeLikeTypeT = string | Date;

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

/**
 * @config-entity
 * @stable [14.01.2021]
 */
export interface IWeekConfigEntity
  extends IIsoWeekWrapper,
    ILocaleWrapper {
}

/**
 * @config-entity
 * @stable [14.01.2021]
 */
export interface IDateTimeIndexConfigEntity
  extends IIndexEntity {
}

/**
 * @config-entity
 * @stable [17.12.2019]
 */
export interface IDateTimeConfigEntity<TDate>
  extends IDateTimeIndexConfigEntity,
    IDateWrapper<DateTimeLikeTypeT | TDate>,
    IDurationWrapper<StringNumberT>,
    IInputFormatWrapper,
    IInputTimeFormatWrapper,
    IIsoWeekWrapper,
    IOutputFormatWrapper,
    IOutputTimeFormatWrapper,
    IReturnUndefWrapper,
    IStrictWrapper,
    ITimeWrapper,
    IUnitWrapper<string>,
    IZoneWrapper {
}

/**
 * @stable [07.03.2020]
 */
export type DatesRangeValueT = (DateTimeLikeTypeT | DatePeriodsEnum)[];

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
 * @service
 * @stable [21.05.2021]
 */
export interface IDateGenericConverter<TDate = Date> {
  dateAsString(cfg: IDateTimeConfigEntity<TDate>): string;
  fromDateToString(cfg: IDateTimeConfigEntity<TDate>): string;
}
