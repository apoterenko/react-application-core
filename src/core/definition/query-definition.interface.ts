import {
  IActiveWrapper,
  IPayloadWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';

/**
 * @redux-entity
 * @stable [26.07.2020]
 */
export interface IReduxQueryFilterEntity
  extends IActiveWrapper,
    IQueryWrapper {
}

/**
 * @redux-holder-entity
 * @stable [26.07.2020]
 */
export interface IReduxQueryFilterHolderEntity
  extends IQueryFilterWrapper<IReduxQueryFilterEntity> {
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
export const INITIAL_REDUX_QUERY_FILTER_ENTITY = Object.freeze<IReduxQueryFilterEntity>({
  query: '',
});
