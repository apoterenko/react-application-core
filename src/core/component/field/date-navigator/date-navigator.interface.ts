import {
  ICurrentTimeWrapper,
  ITypeWrapper,
  IValueWrapper,
  IPatternWrapper,
  IDisplayValueWrapper,
  StringNumberT,
  ITimeWrapper,
} from '../../../definitions.interface';
import { IDateFieldProps, IDateFieldState } from '../datefield';
import { DateTimeLikeTypeT } from '../../../converter';

/**
 * @stable [07.01.2019]
 */
export enum DateNavigatorTypeEnum {
  DAY,
  MONTH,
}

/**
 * @stable [29.10.2018]
 */
export interface IDateNavigatorProps extends IDateFieldProps,
                                             ITimeWrapper<boolean> {
}

/**
 * @stable [30.10.2018]
 */
export interface IDateNavigatorState extends IDateFieldState,
                                             ICurrentTimeWrapper<Date> {
}

/**
 * @stable [08.01.2018]
 */
export interface IDateNavigatorDisplayValuePayloadEntity extends IValueWrapper<DateTimeLikeTypeT>,
                                                                 ITypeWrapper<StringNumberT>,
                                                                 IDisplayValueWrapper,
                                                                 IPatternWrapper {
}
