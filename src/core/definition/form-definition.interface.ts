import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  AnyT,
  IActionsFactoryWrapper,
  IActionsRenderedWrapper,
  IAlwaysDirtyWrapper,
  IAlwaysResettableWrapper,
  IChangeableWrapper,
  ICompactWrapper,
  IDisabledWrapper,
  IEntity,
  IFormConfigurationWrapper,
  IFormIdWrapper,
  IFormWrapper,
  IFullWrapper,
  IOnBeforeSubmitWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOnEmptyDictionaryWrapper,
  IOnLoadDictionaryWrapper,
  IOnResetWrapper,
  IOnSubmitWrapper,
  IOnValidWrapper,
  IReadOnlyWrapper,
  IResetActionRenderedWrapper,
  IResetConfigurationWrapper,
  IResetIconWrapper,
  IResetTextWrapper,
  ISubmitConfigurationWrapper,
  ISubmitIconWrapper,
  ISubmitTextWrapper,
  IValidateOnMountWrapper,
  IValidWrapper,
} from '../definitions.interface';
import {
  IBaseExtendedEntity,
  IExtendedEntity,
  IGenericEditableEntity,
} from './entity-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { FieldChangeEntityT } from './field-definition.interface';
import {
  IButtonConfigurationEntity,
  IButtonProps,
  IGenericButtonEntity,
} from './button-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @generic-entity
 * @stable [16.01.2020]
 */
interface IGenericFormEntity
  extends IActionsFactoryWrapper<(defaultActions: IFormExtraButtonEntity[]) => IFormExtraButtonEntity[]>,
    IActionsRenderedWrapper,
    IAlwaysDirtyWrapper,
    IAlwaysResettableWrapper,
    IButtonConfigurationEntity,
    IChangeableWrapper,
    ICompactWrapper,
    IDisabledWrapper,
    IFormIdWrapper,
    IFullWrapper,
    IReadOnlyWrapper,
    IResetActionRenderedWrapper,
    IResetConfigurationWrapper<IButtonProps>,
    IResetIconWrapper,
    IResetTextWrapper,
    ISubmitConfigurationWrapper<IButtonProps>,
    ISubmitIconWrapper,
    ISubmitTextWrapper,
    IValidateOnMountWrapper,
    IValidWrapper {
}

/**
 * @entity
 * @stable [05.04.2020]
 */
export interface IFormEditableEntity<TEntity = IEntity>
  extends IFormWrapper<IGenericEditableEntity<TEntity>> {
}

/**
 * @entity
 * @stable [18.04.2020]
 */
export interface IBaseExtendedFormEditableEntity<TEntity = IEntity>
  extends IFormEditableEntity<TEntity>,
    IBaseExtendedEntity<TEntity> {
}

/**
 * @entity
 * @stable [26.03.2020]
 */
export interface IExtendedFormEditableEntity<TEntity = IEntity>
  extends IBaseExtendedFormEditableEntity<TEntity>,
    IExtendedEntity<TEntity> {
}

/**
 * @behavioral-entity
 * @stable [18.04.2020]
 */
export interface IBehavioralFormEntity<TEntity extends IEntity = IEntity>
  extends IOnBeforeSubmitWrapper<IApiEntity<TEntity>, boolean>,
    IOnChangeWrapper<FieldChangeEntityT>,
    IOnEmptyDictionaryWrapper<string, IApiEntity<TEntity>>,
    IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void>,
    IOnResetWrapper,
    IOnSubmitWrapper<IApiEntity<TEntity>>,
    IOnValidWrapper {
}

/**
 * @props
 * @stable [27.09.2019]
 */
export interface IFormProps<TEntity = IEntity>
  extends IGenericComponentProps,
    IGenericFormEntity,
    IExtendedFormEditableEntity<TEntity>,
    IBehavioralFormEntity<TEntity> {
}

/**
 * @configuration-entity
 * @stable [04.01.2020]
 */
export interface IFormConfigurationEntity<TProps extends IFormProps = IFormProps>
  extends IFormConfigurationWrapper<TProps> {
}

/**
 * @generic-container-entity
 * @stable [17.04.2020]
 */
export interface IGenericFormContainerEntity<TEntity = IEntity>
  extends IExtendedFormEditableEntity<TEntity>,
    IFormConfigurationEntity {
}

/**
 * @props
 * @stable [17.04.2020]
 */
export interface IFormContainerProps<TEntity = IEntity, TDictionaries = {}>
  extends IGenericContainerProps<TDictionaries>,
    IGenericFormContainerEntity<TEntity> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormExtraButtonEntity
  extends IGenericButtonEntity,
    IOnClickWrapper<IApiEntity> {
}

/**
 * @flux-entity
 * @stable [03.02.2020]
 */
export interface IValidFluxEntity
  extends IValidWrapper {
}

/**
 * @default-entity
 * @stable [18.04.2020]
 */
export const DEFAULT_COMPACT_FORM_ENTITY = Object.freeze<IGenericFormEntity>({
  actionsRendered: false,
  compact: true,
});

/**
 * @default-entity
 * @stable [21.02.2020]
 */
export const DEFAULT_FORM_FIELD_CONTROLLER_ENTITY = Object.freeze<IGenericFormEntity>({
  actionsRendered: false,
  compact: true,
  full: false,
});

/**
 * @default-entity
 * @stable [21.02.2020]
 */
export const DEFAULT_FULL_FORM_FIELD_CONTROLLER_ENTITY = Object.freeze<IGenericFormEntity>({
  ...DEFAULT_FORM_FIELD_CONTROLLER_ENTITY,
  full: true,
});

/**
 * @initial-entity
 * @stable [27.09.2019]
 */
export const INITIAL_FORM_ENTITY = Object.freeze<IGenericEditableEntity>({
  changes: {},
  defaultChanges: {},
});

/**
 * @classes
 * @stable [23.03.2020]
 */
export enum FormClassesEnum {
  FORM = 'rac-form',
  FORM_ACTIONS = 'rac-form__actions',
  FORM_BODY = 'rac-form__body',
  FULL_FORM = 'rac-full-form',
}

/**
 * @stable [01.04.2020]
 */
export const FORM_ACTIVE_VALUE_ACTION_TYPE = 'form.active.value';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CLEAR_ACTION_TYPE = 'form.clear';
export const FORM_DEFAULT_CHANGE_ACTION_TYPE = 'form.default.change';
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_INACTIVE_VALUE_ACTION_TYPE = 'form.inactive.value';
export const FORM_PROGRESS_ACTION_TYPE = 'form.progress';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISH_ACTION_TYPE = 'form.submit.finish';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
