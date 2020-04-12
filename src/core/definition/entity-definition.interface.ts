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
 * @generic-entity
 * @stable [09.04.2020]
 */
export interface IGenericLifeCycleEntity
  extends ITouchedWrapper,
    IProgressWrapper,
    IErrorEntity<string | boolean> {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface IExtendedEntity<TEntity = IEntity>
  extends IEntityIdWrapper<EntityIdT>,
    IChangesWrapper<TEntity>,
    IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity> {
}

/**
 * @generic-entity
 * @stable [09.04.2020]
 */
export interface IGenericEditableEntity<TChanges = IKeyValue>
  extends IGenericLifeCycleEntity,
    IGenericActiveValueEntity,
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
 * @stable [02.10.2019]
 */
export interface IMultiEntity<TEntity extends IEntity = IEntity>
  extends ISourceWrapper<TEntity[]>,
    IAddWrapper<TEntity[]>,
    IRemoveWrapper<TEntity[]>,
    IEditWrapper<IMultiItemEntity[]> {
}

/**
 * @flux-entity
 * @stable [12.04.2020]
 */
export interface IActiveValueFluxEntity
  extends IPayloadWrapper<number> {
}

/**
 * @generic-entity
 * @stable [12.04.2020]
 */
export interface IGenericActiveValueEntity
  extends IActiveValueWrapper<number> {
}
