import { TypeUtils } from '../util';
import {
  FIRST_PAGE,
  IReduxPaginatedEntity,
} from '../definition';

/**
 * @stable [03.11.2020]
 * @param entity
 */
const pageCursorFrom =
  (entity: IReduxPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [03.11.2020]
 * @param entity
 */
const pageCursorTo = (entity: IReduxPaginatedEntity): number =>
  Math.min(entity.page * entity.pageSize, entity.totalCount);

/**
 * @stable [03.11.2020]
 * @param entity
 */
const pagesCount = (entity: IReduxPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);

/**
 * @stable [03.11.2020]
 * @param entity
 */
const isPageCursorInEndPosition = (entity: IReduxPaginatedEntity): boolean =>
  pageCursorTo(entity) === entity.totalCount;

/**
 * @stable [03.11.2020]
 * @param entity
 */
const isPageCursorInStartPosition = (entity: IReduxPaginatedEntity): boolean =>
  entity.page === FIRST_PAGE;

/**
 * @stable [03.11.2020]
 * @param entity
 */
const isPageable = (entity: IReduxPaginatedEntity): boolean =>
  TypeUtils.isNumber(entity.pageSize) && entity.totalCount > entity.pageSize;

/**
 * @stable [03.11.2020]
 */
export class PageUtils {
  public static readonly isPageable = isPageable;
  public static readonly isPageCursorInEndPosition = isPageCursorInEndPosition;
  public static readonly isPageCursorInStartPosition = isPageCursorInStartPosition;
  public static readonly pageCursorFrom = pageCursorFrom;
  public static readonly pageCursorTo = pageCursorTo;
  public static readonly pagesCount = pagesCount;
}
