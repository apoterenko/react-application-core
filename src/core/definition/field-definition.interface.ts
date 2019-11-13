import {
  InputHTMLAttributes,
  RefAttributes,
  TextareaHTMLAttributes,
} from 'react';

import {
  AnyT,
  EntityIdT,
  IActionsPosition,
  IActionsWrapper,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  IChangeableWrapper,
  IClassNameWrapper,
  IDefaultValueWrapper,
  IDisabledWrapper,
  IDisplayNameWrapper,
  IDisplayValueWrapper,
  IEmptyOriginalValueWrapper,
  IEmptyValueWrapper,
  IEntity,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFullWrapper,
  ILabelWrapper,
  IMaskWrapper,
  INameWrapper,
  IOnClickWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  IStepWrapper,
  ISyntheticCursorWrapper,
  ITabIndexWrapper,
  ITitleWrapper,
  ITypeWrapper,
  IUseKeyboardWrapper,
  IValueWrapper,
  IVisibleWrapper,
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import { IComponentCtor } from './component-definition.interface';
import { IDelayedChangesEntity } from './delayed-changes-definition.interface';
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
  extends IActionsPosition<FieldActionPositionsEnum>,
    IActionsWrapper<IFieldActionEntity[]>,
    IAutoCompleteWrapper,
    IAutoFocusWrapper,
    IChangeableWrapper,
    IDefaultValueWrapper,
    IDelayedChangesEntity,
    IDisabledWrapper,
    IDisplayNameWrapper,
    IDisplayValueWrapper<string | ((value: AnyT) => string)>,
    IEmptyOriginalValueWrapper,
    IEmptyValueWrapper,
    IFieldRenderedWrapper,
    IFullWrapper,
    ILabelWrapper,
    IMaskWrapper,
    INameWrapper,
    IOriginalValueWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IPreventFocusWrapper,
    IProgressWrapper,
    IReadOnlyWrapper,
    IRenderedWrapper,
    IRequiredWrapper,
    IStepWrapper,
    ISyntheticCursorWrapper,
    ITabIndexWrapper,
    ITypeWrapper<StringNumberT>,
    IUseKeyboardWrapper,
    IValueWrapper,
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

/**
 * @stable [30.10.2019]
 */
export enum FieldActionTypesEnum {
  ATTACH_FILE = 'attach_file',
  CALENDAR = 'calendar',
  CLOSE = 'close',
  DOWNLOAD = 'download',
  DROP_DOWN = 'dropdown',
  VIDEO = 'video',
}

/**
 * @stable [28.10.2019]
 */
export interface IFieldActionEntity
  extends IClassNameWrapper,
    IDisabledWrapper<boolean | (() => boolean)>,
    IOnClickWrapper,
    ITitleWrapper,
    ITypeWrapper {
}

/**
 * @stable [09.05.2018]
 */
export interface IMaskedInputCtor
  extends IComponentCtor {
  inputElement: HTMLInputElement;
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldInputAttributes
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldTextAreaAttributes
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    RefAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [28.10.2018]
 */
export type IFieldComplexInputAttributes = IFieldInputAttributes | IFieldTextAreaAttributes;

/**
 * @stable [30.10.2019]
 */
export enum FieldActionPositionsEnum {
  LEFT,
  RIGHT,
}
