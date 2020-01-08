import {
  ICalendarConfigurationWrapper,
  IDateWrapper,
  IFromToEntity,
  IFromValueWrapper,
  IIsSelectedWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
  IToValueWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import {
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarEntityWrapperEntity,
  IDayOfYearEntity,
} from './date-definition.interface';
import { IGridConfigurationWrapperEntity } from './grid-definition.interface';

/**
 * @stable [04.01.2020]
 */
export interface IGenericCalendarEntity
  extends ICalendarConfigurationWrapper<ICalendarEntity>,
    ICalendarEntityWrapperEntity,
    ISelectedDaysWrapper<number[]>,
    IShowOnlyCurrentDaysWrapper,
    IGridConfigurationWrapperEntity {
}

/**
 * @stable [04.01.2020]
 */
export interface IBehavioralCalendarEntity
  extends IGenericCalendarEntity,
    IIsSelectedWrapper<ICalendarDayEntity>,
    IOnSelectWrapper<ICalendarDayEntity>,
    IRendererWrapper<ICalendarDayEntity> {
}

/**
 * @stable [03.01.2020]
 */
export interface ICalendarProps
  extends IComponentProps,
    IBehavioralCalendarEntity {
}

/**
 * @stable [08.01.2020]
 */
export interface ICalendarConfigurationWrapperEntity
  extends ICalendarConfigurationWrapper<ICalendarProps> {
}

/**
 * @stable [06.01.2020]
 */
export interface ICalendarRangeState
  extends IDateWrapper<Date>,
    IFromToEntity<IDayOfYearEntity>,
    IFromValueWrapper,
    IToValueWrapper {
}
