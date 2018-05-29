import * as R from 'ramda';

import { orNull } from '../util';
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
 * @stable [29.05.2018]
 * @param {IPaginatedEntity} entity
 * @returns {number}
 */
export const pageToNumber = (entity: IPaginatedEntity): number => {
  return orNull<number>(
    !R.isNil(entity.pageSize),
    () => Math.min(entity.page * entity.pageSize, entity.totalCount)
  );
};
