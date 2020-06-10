import { ConditionUtils } from '../util';
import {
  FIRST_PAGE,
  IReduxPaginatedEntity,
} from '../definition';

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
const pageCursorFrom =
  (entity: IReduxPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
const pageCursorTo = (entity: IReduxPaginatedEntity): number =>
  ConditionUtils.ifNotNilThanValue(
    entity.pageSize,
    (pageSize) => Math.min(entity.page * pageSize, entity.totalCount)
  );

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {number}
 */
const pagesCount = (entity: IReduxPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
const isPageCursorInEndPosition = (entity: IReduxPaginatedEntity): boolean =>
  pageCursorTo(entity) === entity.totalCount;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
const isPageCursorInStartPosition = (entity: IReduxPaginatedEntity): boolean =>
  entity.page === FIRST_PAGE;

/**
 * @stable [05.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {boolean}
 */
const isPageable = (entity: IReduxPaginatedEntity): boolean => entity.totalCount > entity.pageSize;

/**
 * @stable [10.06.2020]
 */
export class PageUtils {
  public static readonly isPageable = isPageable;
  public static readonly isPageCursorInEndPosition = isPageCursorInEndPosition;
  public static readonly isPageCursorInStartPosition = isPageCursorInStartPosition;
  public static readonly pageCursorFrom = pageCursorFrom;
  public static readonly pageCursorTo = pageCursorTo;
  public static readonly pagesCount = pagesCount;
}
