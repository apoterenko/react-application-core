import { FIRST_PAGE } from '../definitions.interface';
import { ifNotNilThanValue } from '../util';
import { IGenericPaginatedEntity } from '../definition';

/**
 * @stable [09.05.2018]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pageFromNumber = (entity: IGenericPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [29.05.2018]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pageToNumber = (entity: IGenericPaginatedEntity): number => ifNotNilThanValue(
  entity.pageSize,
  (pageSize) => Math.min(entity.page * pageSize, entity.totalCount)
);

/**
 * @stable [23.06.2019]
 * @param {IGenericPaginatedEntity} entity
 * @returns {number}
 */
export const pagesCount = (entity: IGenericPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);
