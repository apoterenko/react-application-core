import {
  IAddApiWrapper,
  IAlwaysSendChangesWrapper,
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
import {
  IPlaceGeoCodeRequestEntity,
  ISearchPlacesEntity,
} from './place-definition.interface';

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

/**
 * TODO Move to place definition
 */
export interface IPlaceApi {
  getPlaceGeoCode<TResult>(request: IPlaceGeoCodeRequestEntity): TResult;
  searchPlaces<TResult>(request: ISearchPlacesEntity): TResult;
}
