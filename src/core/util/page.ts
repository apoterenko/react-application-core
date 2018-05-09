import { FIRST_PAGE } from '../definitions.interface';
import { IPaginatedEntity } from '../entities-definitions.interface';

/**
 * @stable [09.05.2018]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pageFromNumber = (entity: IPaginatedEntity): number => {
  return 1 + (entity.page - FIRST_PAGE) * entity.pageSize;
};

/**
 * @stable [09.05.2018]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pageToNumber = (entity: IPaginatedEntity): number => {
  return Math.min(entity.page * entity.pageSize, entity.totalCount);
};
