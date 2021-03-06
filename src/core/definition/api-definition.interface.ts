import {
  IAddApiWrapper,
  IApiEntityWrapper,
  IDiffWrapper,
  IEditApiWrapper,
  IEntity,
  IExtraParamsWrapper,
  IKeyValue,
  IOperationWrapper,
} from '../definitions.interface';
import { IExtendedEntity } from './entity-definition.interface';
import { IOperationEntity } from './operation-definition.interface';
import { IFluxEntity } from './flux-definition.interface';

/**
 * @entity
 * @stable [18.04.2020]
 */
export interface IApiEntity<TEntity = IEntity>
  extends IDiffWrapper<TEntity>,
    IExtendedEntity<TEntity> {
}

/**
 * @wrapper-entity
 * @stable [18.04.2020]
 */
export interface IApiWrapperEntity<TEntity = IEntity>
  extends IApiEntityWrapper<IApiEntity<TEntity>> {
}

/**
 * @entity
 * @stable [16.05.2020]
 */
export interface IUpdateEntity<TEntity extends IEntity, TExtraParams = IKeyValue>
  extends IAddApiWrapper,
    IApiWrapperEntity<TEntity>,
    IEditApiWrapper,
    IExtraParamsWrapper<TExtraParams>,
    IOperationWrapper<IOperationEntity> {
}

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxApiEntity<TEntity = IEntity>
  extends IFluxEntity<IApiEntity<TEntity>> {
}
