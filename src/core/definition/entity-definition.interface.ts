import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IAddWrapper,
  IChangesWrapper,
  IDefaultChangesWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IEditWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IIndexWrapper,
  IKeyValue,
  ILabelWrapper,
  INameWrapper,
  INewEntityWrapper,
  IOriginalEntityWrapper,
  IPayloadWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IRemoveWrapper,
  ISelectedWrapper,
  ISourceWrapper,
  ITouchedWrapper,
  IValidWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';

/**
 * @entity
 * @stable [24.01.2020]
 */
export interface ILabeledValueEntity<TValue = AnyT>
  extends ILabelWrapper,
    IValueWrapper<TValue> {
}

/**
 * @entity
 * @stable [22.04.2020]
 */
export interface IExtendedLabeledValueEntity<TEntity extends IEntity = IEntity, TValue = EntityIdT>
  extends ILabeledValueEntity<TValue>,
    IRawDataWrapper<TEntity> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxLifeCycleEntity
  extends IErrorEntity<string | boolean>,
    IProgressWrapper,
    ITouchedWrapper {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface IExtendedEntity<TEntity = IEntity>
  extends IChangesWrapper<TEntity>,
    IEntityIdWrapper<EntityIdT>,
    IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxFormEntity<TChanges = IKeyValue>
  extends IReduxLifeCycleEntity,
    IReduxActiveValueEntity,
    IChangesWrapper<TChanges>,
    IDefaultChangesWrapper<TChanges>,
    IDirtyWrapper,
    IValidWrapper {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface INamedEntity
  extends IEntityIdTWrapper,
    INameWrapper {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface IOptionEntity
  extends INamedEntity,
    IDisabledWrapper {
}

/**
 * @stable [19.01.2020]
 */
export interface IPayloadEntityId
  extends IPayloadWrapper<EntityIdT> {
}

/**
 * @stable [19.01.2020]
 */
export interface IPayloadEntity<TEntity extends IEntity = IEntity>
  extends IPayloadWrapper<TEntity> {
}

/**
 * @stable [19.01.2020]
 */
export interface ISelectedEntity<TEntity extends IEntity = IEntity>
  extends ISelectedWrapper<TEntity> {
}

/**
 * @stable [02.10.2019]
 */
export interface IMultiItemEntity
  extends IEntityIdTWrapper,
    IFieldChangeEntity,
    INewEntityWrapper,
    IIndexWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxMultiEntity<TEntity extends IEntity = IEntity>
  extends IAddWrapper<TEntity[]>,
    IEditWrapper<IMultiItemEntity[]>,
    IRemoveWrapper<TEntity[]>,
    ISourceWrapper<TEntity[]> {
}

/**
 * @flux-entity
 * @stable [12.04.2020]
 */
export interface IFluxActiveValueEntity
  extends IPayloadWrapper<number> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxActiveValueEntity
  extends IActiveValueWrapper<number> {
}
