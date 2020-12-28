import {
  IIsoWeekWrapper,
  IPeriodWrapper,
  IReturnNeverExecutablePeriodAsEmptyValueWrapper,
} from '../definitions.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import { CronPeriodsEnum } from './cron-definition.interface';
import {
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';

/**
 * @presets-entity
 * @stable [28.12.2020]
 */
export interface IPresetsCronEntity
  extends IPresetsFieldEntity,
    IIsoWeekWrapper,
    IPeriodWrapper<CronPeriodsEnum>,
    IReturnNeverExecutablePeriodAsEmptyValueWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxCronEntity
  extends IReduxFieldEntity {
}

/**
 * @stable [15.12.2019]
 */
export interface IGenericCronEntity
  extends IPresetsCronEntity,
    IReduxCronEntity {
}

/**
 * @props
 * @stable [28.12.2020]
 */
export interface ICronFieldProps
  extends IEnhancedGenericComponentProps,
    IGenericCronEntity {
}

/**
 * @enum
 * @stable [28.12.2020]
 */
export enum CronFieldClassesEnum {
  CALENDAR = 'rac-cron-field__calendar',
  CALENDAR_WRAPPER = 'rac-cron-field__calendar-wrapper',
  CRON_FIELD = 'rac-cron-field',
}
