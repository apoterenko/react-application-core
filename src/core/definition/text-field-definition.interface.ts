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
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';

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
