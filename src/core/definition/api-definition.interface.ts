import {
  IAddApiWrapper,
  IApiEntityWrapper,
  IChangesWrapper,
  IDiffWrapper,
  IEditApiWrapper,
  IEntity,
  IExtraParamsWrapper,
  IKeyValue,
  IMergerWrapper,
  IOperationWrapper,
} from '../definitions.interface';
import { IOperationEntity } from './operation-definition.interface';
import { IExtendedEntity } from './entity-definition.interface';

export interface IApiEntity<TEntity extends IEntity = IEntity>
  extends IExtendedEntity<TEntity>,
    IChangesWrapper<TEntity>,
    IDiffWrapper<TEntity>,
    IMergerWrapper<TEntity> {
}

/**
 * @stable [27.09.2019]
 */
export interface IApiWrapperEntity<TEntity extends IEntity = IEntity>
  extends IApiEntityWrapper<IApiEntity<TEntity>> {
}

// TODO
export interface IEditableApiEntity<TEntity extends IEntity>
  extends IApiWrapperEntity<TEntity>,
  IExtraParamsWrapper<IKeyValue>,
  IEditApiWrapper,
  IAddApiWrapper,
  IOperationWrapper<IOperationEntity> {
}
