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
  IOperationWrapper,
} from '../definitions.interface';
import { IExtendedEntity } from './entity-definition.interface';
import { IOperationEntity } from './operation-definition.interface';
import {
  IPlaceEntity,
  IPlaceGeoCodeRequestEntity,
  ISearchPlacesRequestEntity,
} from './place-definition.interface';

export interface IApiEntity<TEntity extends IEntity = IEntity>
  extends IExtendedEntity<TEntity>,
    IChangesWrapper<TEntity>,
    IDiffWrapper<TEntity> {
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

/**
 * @stable [09.01.2020]
 */
export interface IPlaceApi {
  getPlaceGeoCode<TResult>(request: IPlaceGeoCodeRequestEntity): TResult;
  searchPlaces(request: ISearchPlacesRequestEntity): any;
}
