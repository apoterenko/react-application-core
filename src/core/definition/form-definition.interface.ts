import {
  AnyT,
  IActionsRenderedWrapper,
  IAlwaysDirtyWrapper,
  IAlwaysResettableWrapper,
  IChangeableWrapper,
  ICompactWrapper,
  IDisabledWrapper,
  IEntity,
  IFormWrapper,
  IFullWrapper,
  IOnBeforeSubmitWrapper,
  IOnChangeWrapper,
  IOnEmptyDictionaryWrapper,
  IOnLoadDictionaryWrapper,
  IOnResetWrapper,
  IOnSubmitWrapper,
  IOnValidWrapper,
  IReadOnlyWrapper,
  IResetActionRenderedWrapper,
  IResetIconWrapper,
  IResetTextWrapper,
  ISubmitIconWrapper,
  ISubmitTextWrapper,
} from '../definitions.interface';
import {
  IEditableEntity,
  IExtendedEntity,
} from './entity-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { IFieldChangeEntity } from '../entities-definitions.interface';

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
    IReadOnlyWrapper,
    IResetActionRenderedWrapper,
    IResetIconWrapper,
    IResetTextWrapper,
    ISubmitIconWrapper,
    ISubmitTextWrapper {
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
 * @stable [25.09.2019]
 */
export interface IFormEntity<TEntity = IEntity>
  extends IFormWrapperEntity<TEntity>,
    IGenericFormEntity {
}
