import {
  ICalendarConfigurationWrapper,
  ICalendarEntityConfigurationWrapper,
  ICalendarEntityWrapper,
  IIsFirstSelectedWrapper,
  IIsLastSelectedWrapper,
  IIsMiddleSelectedWrapper,
  IIsSelectedWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
  IUseSyntheticCalendarWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import {
  ICalendarDayEntity,
  ICalendarEntity,
  IDateTimeConfigEntity,
} from './date-definition.interface';
import { IGridConfigurationEntity } from './grid-definition.interface';

/**
 * @generic-entity
 * @stable [04.01.2020]
 */
export interface IGenericCalendarEntity
  extends ICalendarEntityWrapper<ICalendarEntity>,
    ISelectedDaysWrapper<number[]>,
    IShowOnlyCurrentDaysWrapper,
    IGridConfigurationEntity {
}

/**
 * @behavioral-entity
 * @stable [04.01.2020]
 */
export interface IBehavioralCalendarEntity
  extends IIsFirstSelectedWrapper<ICalendarDayEntity>,
    IIsLastSelectedWrapper<ICalendarDayEntity>,
    IIsMiddleSelectedWrapper<ICalendarDayEntity>,
    IIsSelectedWrapper<ICalendarDayEntity>,
    IOnSelectWrapper<ICalendarDayEntity>,
    IRendererWrapper<ICalendarDayEntity> {
}

/**
 * @props
 * @stable [03.01.2020]
 */
export interface ICalendarProps
  extends IComponentProps,
    IGenericCalendarEntity,
    IBehavioralCalendarEntity {
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
