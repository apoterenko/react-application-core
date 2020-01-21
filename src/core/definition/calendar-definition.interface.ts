import {
  ICalendarConfigurationWrapper,
  IIsFirstSelectedWrapper,
  IIsLastSelectedWrapper,
  IIsSelectedWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
  ICalendarEntityWrapper,
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
