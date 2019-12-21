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
  IFormWrapper,
  IFullWrapper,
  IKeyValue,
  IManualValidationWrapper,
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
  ISubmitWrapper,
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
  IButtonConfigurationWrapperEntity,
  IButtonProps,
  IGenericButtonEntity,
} from './button-definition.interface';
import {
  IComponentProps,
  IContainerProps,
} from './props-definition.interface';
import { IApiWrapperEntity } from './api-definition.interface';
import { IComponent } from './component-definition.interface';
import { IContainer } from './container-definition.interface';

/**
 * @cross-platform
 * @stable [25.02.2019]
 */
export interface IGenericFormEntity
  extends IActionsRenderedWrapper,
    IAlwaysDirtyWrapper,
    IAlwaysResettableWrapper,
    IChangeableWrapper,
    ICompactWrapper,
    IDisabledWrapper,
    IFullWrapper,
    IManualValidationWrapper,
    IReadOnlyWrapper,
    IResetActionRenderedWrapper,
    IResetIconWrapper,
    IResetTextWrapper,
    ISubmitIconWrapper,
    ISubmitTextWrapper,
    IValidateOnMountWrapper,
    IValidWrapper {
}

/**
 * @stable [25.09.2019]
 */
export interface IFormWrapperEntity<TEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
    IExtendedEntity<TEntity> {
}

/**
 * @stable [25.09.2019]
 */
export interface IBehavioralFormWrapperEntity<TEntity extends IEntity = IEntity>
  extends IFormWrapperEntity<TEntity>,
    IOnBeforeSubmitWrapper<(apiEntity: IApiEntity<TEntity>) => boolean>,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnEmptyDictionaryWrapper<(dictionary?: string, payload?: IApiEntity) => void>,
    IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void>,
    IOnResetWrapper<() => void>,
    IOnSubmitWrapper<(payload: IApiEntity<TEntity>) => void>,
    IOnValidWrapper<(valid: boolean) => void> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormEntity<TEntity = IEntity>
  extends IBehavioralFormWrapperEntity<TEntity>,
    IGenericFormEntity,
    IButtonConfigurationWrapperEntity,
    IResetConfigurationWrapper<IButtonProps>,
    ISubmitConfigurationWrapper<IButtonProps>,
    IActionsFactoryWrapper<(defaultActions: IFormExtraButtonEntity[]) => IFormExtraButtonEntity[]> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormExtraButtonEntity
  extends IGenericButtonEntity,
    IOnClickWrapper<IApiEntity> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormProps<TEntity = IEntity>
  extends IComponentProps,
    IFormEntity<TEntity> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormContainerProps<TEntity = IEntity, TDictionaries = {}, TPermissions = {}>
  extends IContainerProps<TDictionaries, TPermissions>,
    IBehavioralFormWrapperEntity<TEntity>,
    IFormConfigurationWrapper<IFormProps> {
}

/**
 * @stable [27.09.2019]
 */
export interface IFormContainer
  extends IContainer<IFormContainerProps>,
    ISubmitWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IForm
  extends IComponent<IFormProps>,
    IApiWrapperEntity,
    ISubmitWrapper<IApiEntity> {
}

/**
 * @stable [27.09.2019]
 */
export const INITIAL_FORM_ENTITY = Object.freeze<IEditableEntity>({
  changes: {},
  defaultChanges: {},
});
