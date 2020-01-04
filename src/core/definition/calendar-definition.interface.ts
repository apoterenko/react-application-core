import {
  ICalendarConfigurationWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import {
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarEntityWrapperEntity,
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
