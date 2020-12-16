import {
  EntityIdT,
  IPayloadWrapper,
} from '../definitions.interface';

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxEntity<TEntity = {}>
  extends IPayloadWrapper<TEntity> {
}

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxEntityIdEntity
  extends IFluxEntity<EntityIdT> {
}

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxNumberEntity
  extends IFluxEntity<number> {
}

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxStringEntity
  extends IFluxEntity<string> {
}
