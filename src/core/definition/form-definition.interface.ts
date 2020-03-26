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
  IEditableEntity,
  IExtendedEntity,
} from './entity-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import {
  IButtonConfigurationEntity,
  IButtonProps,
  IGenericButtonEntity,
} from './button-definition.interface';
import {
  IComponentProps,
  IContainerProps,
} from './props-definition.interface';

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
 * @stable [26.03.2020]
 */
export interface IExtendedFormEditableEntity<TEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
    IExtendedEntity<TEntity> {
}

/**
 * @stable [25.09.2019]
 */
export interface IBehavioralFormEntity<TEntity extends IEntity = IEntity>
  extends IExtendedFormEditableEntity<TEntity>,
    IOnBeforeSubmitWrapper<IApiEntity<TEntity>, boolean>,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnEmptyDictionaryWrapper<(dictionary?: string, payload?: IApiEntity) => void>,
    IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void>,
    IOnResetWrapper,
    IOnSubmitWrapper<IApiEntity<TEntity>>,
    IOnValidWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormExtraButtonEntity
  extends IGenericButtonEntity,
    IOnClickWrapper<IApiEntity> {
}

/**
 * @props
 * @stable [27.09.2019]
 */
export interface IFormProps<TEntity = IEntity>
  extends IComponentProps,
    IGenericFormEntity,
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
 * @props
 * @stable [27.09.2019]
 */
export interface IFormContainerProps<TEntity = IEntity, TDictionaries = {}, TPermissions = {}>
  extends IContainerProps<TDictionaries, TPermissions>,
    IBehavioralFormEntity<TEntity>,
    IFormConfigurationEntity {
}

/**
 * @entity
 * @stable [03.02.2020]
 */
export interface IFormValidEntity
  extends IValidWrapper {
}

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
export const INITIAL_FORM_ENTITY = Object.freeze<IEditableEntity>({
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
