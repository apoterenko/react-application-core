import {
  IActiveWrapper,
  IPayloadWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxActiveQueryEntity
  extends IActiveWrapper,
    IQueryWrapper {
}

/**
 * @entity
 * @stable [04.04.2020]
 */
export interface IQueryFilterEntity
  extends IQueryFilterWrapper<IReduxActiveQueryEntity> {
}

/**
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxQueryEntity
  extends IQueryWrapper {
}

/**
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxPayloadQueryEntity
  extends IPayloadWrapper<IFluxQueryEntity> {
}

/**
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_ACTIVE_QUERY_ENTITY = Object.freeze<IReduxActiveQueryEntity>({
  query: '',
});
