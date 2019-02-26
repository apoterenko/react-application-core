import {
  IAddApiWrapper,
  IApiEntityWrapper,
  IChangesWrapper,
  IEditApiWrapper,
  IEntity,
  IExtraParamsWrapper,
  IKeyValue,
  IMergerWrapper,
  IOperationWrapper
} from '../definitions.interface';
import { IOperationEntity } from './operation-definition.interface';
import { IExtendedEntity } from './entity-definition.interface';

export interface IApiEntity<TEntity extends IEntity = IEntity>
  extends IExtendedEntity<TEntity>,
    IChangesWrapper<TEntity>,
    IMergerWrapper<TEntity> {
}

// TODO
export interface IEditableApiEntity<TEntity extends IEntity>
  extends IApiEntityWrapper<IApiEntity<TEntity>>,
  IExtraParamsWrapper<IKeyValue>,
  IEditApiWrapper,
  IAddApiWrapper,
  IOperationWrapper<IOperationEntity> {
}
