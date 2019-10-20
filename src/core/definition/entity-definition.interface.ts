import {
  EntityIdT,
  IActiveValueWrapper,
  IAddWrapper,
  IChangesWrapper,
  IDirtyWrapper,
  IEditWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IIndexWrapper,
  IKeyValue,
  INameWrapper,
  INewEntityWrapper,
  IOriginalEntityWrapper,
  IPayloadWrapper,
  IProgressWrapper,
  IRemoveWrapper,
  ISelectedWrapper,
  ISourceWrapper,
  ITouchedWrapper,
  ITypeWrapper,
  IValidWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';

/**
 * @stable [11.09.2019]
 */
export interface ILifeCycleEntity
  extends ITouchedWrapper,
    IProgressWrapper,
    IErrorEntity<string> {
}

/**
 * @stable [26.02.2019]
 */
export interface IExtendedEntity<TEntity>
  extends IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity>,
    IEntityIdWrapper<EntityIdT> {
}

/**
 * @stable [11.09.2019]
 */
export interface IEditableEntity<TChanges = IKeyValue>
  extends ILifeCycleEntity,
    IChangesWrapper<TChanges>,
    IDirtyWrapper,
    IValidWrapper,
    IActiveValueWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface INamedEntity
  extends IEntityIdTWrapper,
    INameWrapper {
}

/**
 * @stable [19.10.2019]
 */
export interface IPayloadEntityIdWrapperEntity
  extends IPayloadWrapper<IEntityIdTWrapper> {
}

/**
 * @stable [19.10.2019]
 */
export interface ISelectedWrapperEntity<TEntity extends IEntity = IEntity>
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
export interface IMultiItemFileEntity
  extends IMultiItemEntity,
    ITypeWrapper {
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
 * @stable [02.10.2019]
 */
export type MultiItemEntityT = IMultiItemEntity | EntityIdT;
