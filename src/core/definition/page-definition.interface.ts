import {
  ILockPageWrapper,
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
} from '../definitions.interface';
import { IReduxLifeCycleEntity } from './entity-definition.interface';

/**
 * @stable [18.05.2020]
 */
export const DEFAULT_LOCAL_PAGE_SIZE = 20;
export const DEFAULT_MAX_PAGE_SIZE = 1000000;
export const DEFAULT_PAGE_SIZE = 50;
export const FIRST_PAGE = 1;

/**
 * @default-entity
 * @stable [18.09.2019]
 */
export const DEFAULT_MAX_PAGED_ENTITY = Object.freeze<IReduxPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_MAX_PAGE_SIZE,
});

/**
 * @default-entity
 * @stable [17.06.2020]
 */
export const DEFAULT_PAGED_ENTITY = Object.freeze<IReduxPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
});

/**
 * @default-entity
 * @stable [12.10.2019]
 */
export const DEFAULT_PAGINATED_SINGLE_ENTITY = Object.freeze<IReduxPaginatedEntity>({
  ...DEFAULT_PAGED_ENTITY,
  totalCount: 1,
});

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxPagedEntity
  extends IPageWrapper,
    IPageSizeWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxPaginatedEntity
  extends IReduxPagedEntity,
    ILockPageWrapper,
    ITotalAmountWrapper,
    ITotalCountWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxPaginatedLifeCycleEntity
  extends IReduxPaginatedEntity,
    IReduxLifeCycleEntity {
}
