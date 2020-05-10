import { ifNotNilThanValue } from '../util';
import {
  FIRST_PAGE,
  IReduxPaginatedEntity,
} from '../definition';

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
export const pageCursorFrom =
  (entity: IReduxPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
export const pageCursorTo = (entity: IReduxPaginatedEntity): number =>
  ifNotNilThanValue(
    entity.pageSize,
    (pageSize) => Math.min(entity.page * pageSize, entity.totalCount)
  );

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
export const pagesCount = (entity: IReduxPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageCursorInEndPosition = (entity: IReduxPaginatedEntity): boolean =>
  pageCursorTo(entity) === entity.totalCount;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageCursorInStartPosition = (entity: IReduxPaginatedEntity): boolean =>
  entity.page === FIRST_PAGE;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageable = (entity: IReduxPaginatedEntity): boolean => entity.totalCount > entity.pageSize;
