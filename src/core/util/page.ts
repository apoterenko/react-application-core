import { FIRST_PAGE } from '../definitions.interface';
import { ifNotNilThanValue } from '../util';
import { IPaginatedEntity } from '../entities-definitions.interface';

/**
 * @stable [09.05.2018]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pageFromNumber = (entity: IPaginatedEntity): number => 1 + (entity.page - FIRST_PAGE) * entity.pageSize;

/**
 * @stable [29.05.2018]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pageToNumber = (entity: IPaginatedEntity): number => ifNotNilThanValue(
  entity.pageSize,
  (pageSize) => Math.min(entity.page * pageSize, entity.totalCount)
);

/**
 * @stable [23.06.2019]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pagesCount = (entity: IPaginatedEntity): number => Math.ceil(entity.totalCount / entity.pageSize);
