import {
  IAheadValueWrapper,
  IBackActionConfigurationWrapper,
  ICalendarActionRenderedWrapper,
  ICursorWrapper,
  IDialogOpenedWrapper,
  IFormatWrapper,
  IForwardActionConfigurationWrapper,
  IFromDateWrapper,
  IFromToEntity,
  IInlineWrapper,
  IMaxDateWrapper,
  IMinDateWrapper,
  IPeriodStepWrapper,
  IRangeEnabledWrapper,
  IToDateWrapper,
  IUsePeriodNavigatorWrapper,
  IYearMonthFormatWrapper,
} from '../definitions.interface';
import {
  DatesRangeValueT,
  DateTimeLikeTypeT,
  IDatePeriodModeEntity,
  IDatePeriodTypeEntity,
} from './date-definition.interface';
import { IButtonProps } from './button-definition.interface';
import {
  ICalendarConfigurationEntity,
  ICalendarEntityConfigurationEntity,
} from './calendar-definition.interface';
import { IConfigurationHolderDialogEntity } from './dialog-definition.interface';

/**
 * @generic-entity
 * @stable [26.03.2020]
 */
export interface IGenericDateFieldEntity
  extends IAheadValueWrapper<DatesRangeValueT>,
    IBackActionConfigurationWrapper<IButtonProps>,
    ICalendarActionRenderedWrapper,
    ICalendarConfigurationEntity,
    ICalendarEntityConfigurationEntity,
    IDatePeriodModeEntity,
    IDatePeriodTypeEntity,
    IConfigurationHolderDialogEntity,
    IForwardActionConfigurationWrapper<IButtonProps>,
    IInlineWrapper,
    IMaxDateWrapper<Date>,
    IMinDateWrapper<Date>,
    IPeriodStepWrapper,
    IRangeEnabledWrapper,
    IUsePeriodNavigatorWrapper,
    IYearMonthFormatWrapper {
}

/**
 * @generic-state
 * @stable [17.01.2020]
 */
export interface IGenericDateFieldState
  extends ICursorWrapper<Date>,
    IDatePeriodModeEntity,
    IDialogOpenedWrapper,
    IFromDateWrapper<DateTimeLikeTypeT>,
    IFromToEntity<Date>,
    IToDateWrapper<DateTimeLikeTypeT> {
}

/**
 * @stable [11.03.2020]
 */
export enum DateFieldClassesEnum {
  DATE_FIELD = 'rac-date-field',
  DATE_FIELD_CALENDAR_DIALOG = 'rac-date-field__calendar-dialog',
  DATE_FIELD_CALENDARS_DIALOG = 'rac-date-field__calendars-dialog',
  DATE_FIELD_NAVIGATOR = 'rac-date-field-navigator',
}
