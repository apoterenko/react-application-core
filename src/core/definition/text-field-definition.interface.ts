import {
  IActionsPositionWrapper,
  IActionsWrapper,
  IClearActionRenderedWrapper,
  IErrorMessageRenderedWrapper,
  IMaskGuideWrapper,
  IPrefixLabelWrapper,
} from '../definitions.interface';
import {
  FieldActionPositionsEnum,
  IFieldActionEntity,
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';
import { IFieldProps2 } from '../configurations-definitions.interface';
import { IField2State } from '../component/field/field/field.interface';

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
    IMaskGuideWrapper,
    IPrefixLabelWrapper {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldState
  extends IField2State {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldProps
  extends IPresetsBaseTextFieldEntity,
    IFieldProps2 {
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
  BASE_TEXT_FIELD_LABEL_NOT_PREFIXED = 'rac-base-text-field-label-not-prefixed',
  BASE_TEXT_FIELD_LABEL_PREFIXED = 'rac-base-text-field-label-prefixed',
  TEXT_FIELD = 'rac-text-field',
}
