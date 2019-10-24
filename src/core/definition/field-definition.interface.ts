import {
  EntityIdT,
  IAutoFocusWrapper,
  IDisabledWrapper,
  IEmptyValueWrapper,
  IEntity,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFullWrapper,
  ILabelWrapper,
  IMaskWrapper,
  INameWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  ITabIndexWrapper,
  ITypeWrapper,
  IUseKeyboardWrapper,
  IValueWrapper,
  IVisibleWrapper,
  UNDEF,
  StringNumberT,
} from '../definitions.interface';
import { IMultiEntity } from './entity-definition.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';
export const FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;

/**
 * @stable [27.05.2019]
 */
export interface IGenericFieldEntity
  extends IAutoFocusWrapper,
    IDisabledWrapper,
    IEmptyValueWrapper,
    IFieldRenderedWrapper,
    IFullWrapper,
    ILabelWrapper,
    IMaskWrapper,
    INameWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IPreventFocusWrapper,
    IProgressWrapper,
    IReadOnlyWrapper,
    IRenderedWrapper,
    IRequiredWrapper,
    ITabIndexWrapper,
    ITypeWrapper<StringNumberT>,
    IUseKeyboardWrapper,
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

/**
 * @stable [02.10.2019]
 */
export type MultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | IMultiEntity;
export type MultiFieldSingleValueT = IMultiEntity | EntityIdT;
export type NotMultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | EntityIdT;
