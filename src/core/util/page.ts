import { FIRST_PAGE } from '../definitions.interface';
import { ifNotNilThanValue } from '../util';
import { IGenericPaginatedEntity } from '../definition';

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pageCursorFrom =
  (entity: IGenericPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pageCursorTo = (entity: IGenericPaginatedEntity): number =>
  ifNotNilThanValue(
    entity.pageSize,
    (pageSize) => Math.min(entity.page * pageSize, entity.totalCount)
  );

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pagesCount = (entity: IGenericPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageCursorInEndPosition = (entity: IGenericPaginatedEntity): boolean =>
  pageCursorTo(entity) === entity.totalCount;

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageCursorInStartPosition = (entity: IGenericPaginatedEntity): boolean =>
  entity.page === FIRST_PAGE;

/**
 * @stable [05.05.2020]
 * @param {IGenericPaginatedEntity} entity
 * @returns {boolean}
 */
export const isPageable = (entity: IGenericPaginatedEntity): boolean => entity.totalCount > entity.pageSize;
