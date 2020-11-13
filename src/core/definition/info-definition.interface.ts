import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IEmptyDataWrapper,
  IErrorWrapper,
  IFullWrapper,
  IMessageWrapper,
  IProgressWrapper,
  ITextWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [18.05.2020]
 */
export interface IPresetsInfoEntity
  extends IEmptyDataWrapper<boolean | string>,
    IErrorWrapper<boolean | string | Error | {}>,
    IFullWrapper,
    IMessageWrapper<boolean | string>,
    IProgressWrapper<boolean | string>,
    ITextWrapper<boolean | string> {
}

/**
 * @generic-entity
 * @stable [18.03.2020]
 */
export interface IInfoGenericEntity
  extends IPresetsInfoEntity {
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
