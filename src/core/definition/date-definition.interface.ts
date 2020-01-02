import * as moment from 'moment';

import {
  IDateWrapper,
  IDurationWrapper,
  IInputFormatWrapper,
  IInputTimeFormatWrapper,
  IOutputFormatWrapper,
  IOutputTimeFormatWrapper,
  IStrictWrapper,
  ITimeWrapper,
  IUnitWrapper,
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
 * @stable [17.12.2019]
 */
export interface IDateTimeConfigEntity<TDate = Date>
  extends IDateWrapper<DateTimeLikeTypeT | TDate>,
    IDurationWrapper<StringNumberT>,
    IInputFormatWrapper,
    IInputTimeFormatWrapper,
    IOutputFormatWrapper,
    IOutputTimeFormatWrapper,
    IStrictWrapper,
    ITimeWrapper,
    IUnitWrapper<StringNumberT>,
    IZoneWrapper {
}
