import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IErrorWrapper,
  IFullWrapper,
  IMessageWrapper,
  IProgressWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [18.03.2020]
 */
export interface IInfoGenericEntity
  extends IErrorWrapper<boolean | string | Error | {}>,
    IFullWrapper,
    IMessageWrapper,
    IProgressWrapper<boolean | string> {
}

/**
 * @props
 * @stable [18.03.2020]
 */
export interface IInfoComponentProps
  extends IGenericComponentProps,
    IInfoGenericEntity {
}

/**
 * @classes
 * @stable [18.03.2020]
 */
export enum InfoClassesEnum {
  ERROR_INFO = 'rac-error-info',
  FULL_INFO = 'rac-full-info',
  INFO = 'rac-info',
  INFO_ICON = 'rac-info__icon',
  INFO_TEXT = 'rac-info__text',
  MESSAGE_INFO = 'rac-message-info',
  PROGRESS_INFO = 'rac-progress-info',
}
