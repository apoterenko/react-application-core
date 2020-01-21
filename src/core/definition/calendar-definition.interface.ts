import {
  ICalendarConfigurationWrapper,
  IIsFirstSelectedWrapper,
  IIsLastSelectedWrapper,
  IIsSelectedWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ISelectedDaysWrapper,
  IShowOnlyCurrentDaysWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import {
  ICalendarDayEntity,
  ICalendarEntityWrapperEntity,
} from './date-definition.interface';
import { IGridConfigurationEntity } from './grid-definition.interface';

/**
 * @stable [04.01.2020]
 */
export interface IGenericCalendarEntity
  extends ICalendarEntityWrapperEntity,
    ISelectedDaysWrapper<number[]>,
    IShowOnlyCurrentDaysWrapper,
    IGridConfigurationEntity {
}

/**
 * @stable [04.01.2020]
 */
export interface IBehavioralCalendarEntity
  extends IGenericCalendarEntity,
    IIsFirstSelectedWrapper<ICalendarDayEntity>,
    IIsLastSelectedWrapper<ICalendarDayEntity>,
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
 * @configuration-entity
 * @stable [21.01.2020]
 */
export interface ICalendarConfigurationEntity<TProps extends ICalendarProps = ICalendarProps>
  extends ICalendarConfigurationWrapper<TProps> {
}
