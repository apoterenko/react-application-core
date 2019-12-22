import {
  IAddApiWrapper,
  IAlwaysSendChangesWrapper,
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

/**
 * @stable [23.12.2019]
 */
export interface IUpdateEntityPayloadEntity<TEntity extends IEntity>
  extends IAddApiWrapper,
  IAlwaysSendChangesWrapper,
  IApiWrapperEntity<TEntity>,
  IEditApiWrapper,
  IExtraParamsWrapper<IKeyValue>,
  IOperationWrapper<IOperationEntity> {
}
