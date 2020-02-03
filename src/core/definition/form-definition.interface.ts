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
 * @stable [16.01.2020]
 */
export interface IFormExtendedEditableEntity<TEntity = IEntity>
  extends IFormWrapper<IEditableEntity<TEntity>>,
    IExtendedEntity<TEntity> {
}

/**
 * @stable [25.09.2019]
 */
export interface IBehavioralFormEntity<TEntity extends IEntity = IEntity>
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
 * @container
 * @stable [27.09.2019]
 */
export interface IFormContainer
  extends IContainer<IFormContainerProps>,
    ISubmitWrapper {
}

/**
 * @component
 * @stable [27.09.2019]
 */
export interface IForm
  extends IComponent<IFormProps>,
    IApiWrapperEntity,
    ISubmitWrapper<IApiEntity> {
}

/**
 * @entity
 * @stable [03.02.2020]
 */
export interface IFormValidEntity
  extends IValidWrapper {
}

/**
 * @initial-entity
 * @stable [27.09.2019]
 */
export const INITIAL_FORM_ENTITY = Object.freeze<IEditableEntity>({
  changes: {},
  defaultChanges: {},
});
