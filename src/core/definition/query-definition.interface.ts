import {
  IActiveWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';
import { IFluxEntity } from './flux-definition.interface';

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
 * @entity
 * @stable [16.12.2020]
 */
export interface IQueryEntity
  extends IQueryWrapper {
}

/**
 * @flux-entity
 * @stable [16.12.2020]
 */
export interface IFluxQueryEntity
  extends IFluxEntity<IQueryEntity> {
}

/**
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_QUERY_FILTER_ENTITY = Object.freeze<IReduxQueryFilterEntity>({
  query: '',
});
