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
 * @stable [11.09.2019]
 */
export interface ILifeCycleEntity
  extends ITouchedWrapper,
    IProgressWrapper,
    IErrorEntity<string | boolean> {
}

/**
 * @stable [26.02.2019]
 */
export interface IExtendedEntity<TEntity = IEntity>
  extends IEntityIdWrapper<EntityIdT>,
    IChangesWrapper<TEntity>,
    IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity> {
}

/**
 * @stable [11.09.2019]
 */
export interface IEditableEntity<TChanges = IKeyValue>
  extends ILifeCycleEntity,
    IActiveValueWrapper,
    IChangesWrapper<TChanges>,
    IDefaultChangesWrapper<TChanges>,
    IDirtyWrapper,
    IValidWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface INamedEntity
  extends IEntityIdTWrapper,
    INameWrapper {
}

/**
 * @entity
 * @stable [25.01.2020]
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
