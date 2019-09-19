import {
  DEFAULT_MAX_PAGE_SIZE,
  FIRST_PAGE,
  ILockPageWrapper,
  IPageSizeWrapper,
  IPageWrapper,
  ITotalAmountWrapper,
  ITotalCountWrapper,
} from '../definitions.interface';

/**
 * @stable [18.09.2019]
 */
export const DEFAULT_MAX_PAGED_ENTITY = Object.freeze<IPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_MAX_PAGE_SIZE,
});

/**
 * @stable [25.06.2019]
 */
export interface IPagedEntity
  extends IPageWrapper,
    IPageSizeWrapper {
}

/**
 * @stable [25.06.2019]
 */
export interface IPaginatedEntity
  extends IPagedEntity,
    ILockPageWrapper,
    ITotalCountWrapper,
    ITotalAmountWrapper {
}
