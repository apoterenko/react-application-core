import {
  ICalendarConfigurationWrapper,
  ICalendarEntityConfigurationWrapper,
  ICalendarEntityWrapper,
  ICronDayWrapper,
  ICurrentWrapper,
  IDateWrapper,
  IDaysLabelsWrapper,
  IDaysWrapper,
  IEntityIdTWrapper,
  IIsFirstSelectedWrapper,
  IIsLastSelectedWrapper,
  IIsMiddleSelectedWrapper,
  IIsSelectedWrapper,
  INextWrapper,
  IOnSelectWrapper,
  IPreviousWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
  ITodayWrapper,
  IUseSyntheticCalendarWrapper,
} from '../definitions.interface';
import { IGridConfigurationEntity } from './grid-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IDateTimeConfigEntity,
  IDayOfYearEntity,
} from './date-definition.interface';

/**
 * @presets-entity
 * @stable [29.12.2020]
 */
export interface IPresetsCalendarEntity
  extends ICalendarEntityWrapperEntity,
    IGridConfigurationEntity,
    IIsFirstSelectedWrapper<ICalendarDayEntity>,
    IIsLastSelectedWrapper<ICalendarDayEntity>,
    IIsMiddleSelectedWrapper<ICalendarDayEntity>,
    IIsSelectedWrapper<ICalendarDayEntity>,
    IOnSelectWrapper<ICalendarDayEntity>,
    IRendererWrapper<ICalendarDayEntity>,
    ISelectedDaysWrapper<number[]>,
    IShowOnlyCurrentDaysWrapper {
}

/**
 * @generic-entity
 * @stable [29.12.2020]
 */
export interface IGenericCalendarEntity
  extends IPresetsCalendarEntity {
}

/**
 * @props
 * @stable [29.12.2020]
 */
export interface ICalendarProps
  extends IGenericComponentProps,
    IGenericCalendarEntity {
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
 * @configuration-entity
 * @stable [21.01.2020]
 */
export interface ICalendarConfigurationEntity<TProps extends ICalendarProps = ICalendarProps>
  extends ICalendarConfigurationWrapper<TProps> {
}

/**
 * @configuration-entity
 * @stable [21.01.2020]
 */
export interface ICalendarEntityConfigurationEntity
  extends ICalendarEntityConfigurationWrapper<ICalendarConfigEntity> {
}

/**
 * @classes
 * @stable [27.12.2020]
 */
export enum CalendarClassesEnum {
  BASIC_DAY = 'rac-calendar__basic-day',
  CALENDAR = 'rac-calendar',
  CURRENT_DAY = 'rac-calendar__current-day',
  FIRST_SELECTED_DAY = 'rac-calendar__first-selected-day',
  LAST_SELECTED_DAY = 'rac-calendar__last-selected-day',
  MIDDLE_SELECTED_DAY = 'rac-calendar__middle-selected-day',
  SELECTED_DAY = 'rac-calendar__selected-day',
  TODAY = 'rac-calendar__today',
}

/**
 * @classes
 * @stable [08.03.2020]
 */
export enum CalendarDialogClassesEnum {
  CALENDAR_BASE_DIALOG = 'rac-calendar-base-dialog',
  CALENDAR_DIALOG = 'rac-calendar-dialog',
  CALENDAR_DIALOG_FOOTER = 'rac-calendar-dialog__footer',
  CALENDAR_DIALOG_QUICK_ACTIONS = 'rac-calendar-dialog__quick-actions',
  CALENDAR_DIALOG_RANGE_EXPLORER = 'rac-calendar-dialog__range-explorer',
  CALENDAR_DIALOG_RANGE_EXPLORER_DATE = 'rac-calendar-dialog__range-explorer-date',
  CALENDAR_DIALOG_SELECTED_QUICK_ACTION = 'rac-calendar-dialog__selected-quick-action',
  CALENDAR_INLINE_DIALOG = 'rac-calendar-inline-dialog',
}

/**
 * @entity
 * @stable [03.01.2020]
 */
export interface ICalendarDayEntity
  extends IDayOfYearEntity,
    ICronDayWrapper,
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
 * @stable [29.12.2020]
 */
export interface ICalendarEntityWrapperEntity
  extends ICalendarEntityWrapper<ICalendarEntity> {
}
