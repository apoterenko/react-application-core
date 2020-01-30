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
  IButtonConfigurationEntity,
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
 * @generic-entity
 * @stable [16.01.2020]
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
 * @stable [16.01.2020]
 */
export interface IFormExtendedEditableEntity<TEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
    IExtendedEntity<TEntity> {
}

/**
 * @stable [25.09.2019]
 */
export interface IBehavioralFormExtendedEditableEntity<TEntity extends IEntity = IEntity>
  extends IFormExtendedEditableEntity<TEntity>,
    IOnBeforeSubmitWrapper<IApiEntity<TEntity>, boolean>,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnEmptyDictionaryWrapper<(dictionary?: string, payload?: IApiEntity) => void>,
    IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void>,
    IOnResetWrapper,
    IOnSubmitWrapper<IApiEntity<TEntity>>,
    IOnValidWrapper {
}

/**
 * @deprecated
 */
export interface IFormEntity<TEntity = IEntity> // TODO Destroy it later: Behavioral + Generic only
  extends IBehavioralFormExtendedEditableEntity<TEntity>,
    IButtonConfigurationEntity,  // TODO Move to Generic entity
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
    IGenericFormEntity,
    IFormEntity<TEntity> { // TODO Behavioral + Generic only
}

/**
 * @stable [27.09.2019]
 */
export interface IFormContainerProps<TEntity = IEntity, TDictionaries = {}, TPermissions = {}>
  extends IContainerProps<TDictionaries, TPermissions>,
    IBehavioralFormExtendedEditableEntity<TEntity>,
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
 * @initial-entity
 * @stable [27.09.2019]
 */
export const INITIAL_FORM_ENTITY = Object.freeze<IEditableEntity>({
  changes: {},
  defaultChanges: {},
});
