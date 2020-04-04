import {
  IActiveWrapper,
  IFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [04.04.2020]
 */
export interface IGenericActiveQueryEntity
  extends IActiveWrapper,
    IQueryWrapper {
}

/**
 * @entity
 * @stable [04.04.2020]
 */
export interface IQueryFilterEntity
  extends IFilterWrapper<IGenericActiveQueryEntity> {
}

/**
 * @default-entity
 * @stable [04.04.2020]
 */
export const INITIAL_ACTIVE_QUERY_ENTITY = Object.freeze<IGenericActiveQueryEntity>({
  query: '',
});
