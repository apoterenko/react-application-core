import {
  IActiveWrapper,
  IFilterWrapper,
  IQueryWrapper,
} from '../definitions.interface';

/**
 * @stable [22.08.2019]
 */
export interface IQueryFilterEntity
  extends IActiveWrapper,
    IQueryWrapper {
}

/**
 * @stable [22.08.2019]
 */
export interface IQueryFilterWrapperEntity
  extends IFilterWrapper<IQueryFilterEntity> {
}

/**
 * @stable [22.08.2019]
 */
export const INITIAL_QUERY_FILTER_ENTITY = Object.freeze<IQueryFilterEntity>({
  query: '',
});
