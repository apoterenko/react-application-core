import {
  IDisabledWrapper,
  IEmptyValueWrapper,
  IFieldsWrapper,
  ILabelWrapper,
  IMaskWrapper,
  INameWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  ITabIndexWrapper,
  IValueWrapper,
  IVisibleWrapper,
  UNDEF,
} from '../definitions.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';
export const FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;

/**
 * @stable [27.05.2019]
 */
export interface IGenericFieldEntity
  extends IDisabledWrapper,
    IEmptyValueWrapper,
    ILabelWrapper,
    IMaskWrapper,
    INameWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IProgressWrapper,
    IReadOnlyWrapper,
    ITabIndexWrapper,
    IVisibleWrapper {
}

/**
 * @stable [28.09.2019]
 */
export interface IFieldChangeEntity
  extends INameWrapper,
    IValueWrapper,
    IRawDataWrapper {
}

/**
 * @stable [28.09.2019]
 */
export interface IFieldsChangesEntity
  extends IFieldsWrapper<IFieldChangeEntity[]> {
}

/**
 * @stable [28.09.2019]
 */
export type FieldChangeEntityT = IFieldChangeEntity | IFieldsChangesEntity;
