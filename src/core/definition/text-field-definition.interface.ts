import {
  IActionsPositionWrapper,
  IActionsWrapper,
  IClearActionRenderedWrapper,
  IErrorMessageRenderedWrapper,
  IMaskGuideWrapper,
} from '../definitions.interface';
import {
  FieldActionPositionsEnum,
  IFieldActionEntity,
  IFieldState,
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';

/**
 * @redux-entity
 * @stable [17.06.2020]
 */
export interface IReduxBaseTextFieldEntity
  extends IReduxFieldEntity {
}

/**
 * @presets-entity
 * @stable [17.06.2020]
 */
export interface IPresetsBaseTextFieldEntity
  extends IPresetsFieldEntity,
    IActionsPositionWrapper<FieldActionPositionsEnum>,
    IActionsWrapper<IFieldActionEntity[]>,
    IClearActionRenderedWrapper,
    IErrorMessageRenderedWrapper,
    IMaskGuideWrapper {
}

/**
 * @state
 * @stable [22.06.2020]
 */
export interface IBaseTextFieldState
  extends IFieldState {
}

/**
 * @generic-entity
 * @stable [14.10.2020]
 */
export interface IGenericBaseTextFieldEntity
  extends IPresetsBaseTextFieldEntity,
    IReduxBaseTextFieldEntity {
}

/**
 * @props
 * @stable [14.10.2020]
 */
export interface IBaseTextFieldProps
  extends IEnhancedGenericComponentProps,
    IGenericBaseTextFieldEntity {
}

/**
 * @state
 * @stable [23.01.2020]
 */
export interface ITextFieldState
  extends IBaseTextFieldState {
}

/**
 * @props
 * @stable [23.01.2020]
 */
export interface ITextFieldProps
  extends IBaseTextFieldProps {
}

/**
 * @classes
 * @stable [18.06.2020]
 */
export enum TextFieldClassesEnum {
  BASE_TEXT_FIELD = 'rac-base-text-field',
  BASE_TEXT_FIELD_ACTIONED = 'rac-base-text-field-actioned',
  BASE_TEXT_FIELD_LABEL_NOT_PREFIXED = 'rac-base-text-field-label-not-prefixed',
  BASE_TEXT_FIELD_LABEL_PREFIXED = 'rac-base-text-field-label-prefixed',
  TEXT_FIELD = 'rac-text-field',
}
