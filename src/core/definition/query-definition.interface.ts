import {
  IActiveWrapper,
  IDisabledWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [07.05.2020]
 */
export interface IGenericActiveQueryEntity
  extends IActiveWrapper,
    IDisabledWrapper,
    IQueryWrapper {
}

/**
 * @wrapper-entity
 * @stable [04.04.2020]
 */
export interface IQueryFilterEntity
  extends IQueryFilterWrapper<IGenericActiveQueryEntity> {
}

/**
 * @flux-entity
 * @stable [27.04.2020]
 */
export interface IQueryFluxEntity
  extends IQueryWrapper {
}

/**
 * @default-entity
 * @stable [04.04.2020]
 */
export const INITIAL_ACTIVE_QUERY_ENTITY = Object.freeze<IGenericActiveQueryEntity>({
  query: '',
});
