import {
  DEFAULT_MAX_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  ILockPageWrapper,
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
} from '../definitions.interface';
import { IGenericLifeCycleEntity } from './entity-definition.interface';

/**
 * @default-entity
 * @stable [18.09.2019]
 */
export const DEFAULT_MAX_PAGED_ENTITY = Object.freeze<IGenericPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_MAX_PAGE_SIZE,
});

/**
 * @default-entity
 * @stable [12.10.2019]
 */
export const DEFAULT_PAGED_ENTITY = Object.freeze<IGenericPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
});

/**
 * @default-entity
 * @stable [12.10.2019]
 */
export const DEFAULT_PAGINATED_SINGLE_ENTITY = Object.freeze<IGenericPaginatedEntity>({
  ...DEFAULT_PAGED_ENTITY,
  totalCount: 1,
});

/**
 * @generic-entity
 * @stable [25.06.2019]
 */
export interface IGenericPagedEntity
  extends IPageWrapper,
    IPageSizeWrapper {
}

/**
 * @generic-entity
 * @stable [25.06.2019]
 */
export interface IGenericPaginatedEntity
  extends IGenericPagedEntity,
    ILockPageWrapper,
    ITotalAmountWrapper,
    ITotalCountWrapper {
}

/**
 * @generic-entity
 * @stable [05.05.2020]
 */
export interface IGenericPaginatedLifeCycleEntity
  extends IGenericPaginatedEntity,
    IGenericLifeCycleEntity {
}
