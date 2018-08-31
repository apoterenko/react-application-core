import { IEntity, I$DateWrapper } from '../definitions.interface';

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 * @constructor
 */
export const ID_DESC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  parseInt(item1.id as string, 10) > parseInt(item2.id as string, 10) ? -1 : 1;

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 * @constructor
 */
export const ID_ASC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  ID_DESC_ENTITIES_SORTER_FN(item1, item2) * -1;

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 */
export const $DATE_DESC_ENTITIES_SORTER_FN = <TEntity extends I$DateWrapper>(item1: TEntity, item2: TEntity): number =>
  item1.$date > item2.$date ? -1 : 1;
