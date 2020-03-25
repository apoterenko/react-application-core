import {
  ICalendarConfigurationWrapper,
  ICalendarEntityWrapper,
  IIsFirstSelectedWrapper,
  IIsLastSelectedWrapper,
  IIsMiddleSelectedWrapper,
  IIsSelectedWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import {
  ICalendarDayEntity,
  ICalendarEntity,
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
 * @configuration-entity
 * @stable [21.01.2020]
 */
export interface ICalendarConfigurationEntity<TProps extends ICalendarProps = ICalendarProps>
  extends ICalendarConfigurationWrapper<TProps> {
}

/**
 * @classes
 * @stable [08.03.2020]
 */
export enum CalendarDialogClassesEnum {
  CALENDAR_BASE_DIALOG = 'rac-calendar-base-dialog',
  CALENDAR_DIALOG = 'rac-calendar-dialog',
  CALENDAR_DIALOG_QUICK_ACTIONS = 'rac-calendar-dialog__quick-actions',
  CALENDAR_DIALOG_SELECTED_QUICK_ACTION = 'rac-calendar-dialog__selected-quick-action',
  CALENDAR_INLINE_DIALOG = 'rac-calendar-inline-dialog',
}
