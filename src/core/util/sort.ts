import { IEntity, I$DateWrapper, StringNumberT } from '../definitions.interface';

/**
 * @stable [07.03.2019]
 * @param {number} value1
 * @param {number} value2
 * @returns {number}
 * @constructor
 */
export const ID_DESC_SORTER_FN = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  value1 > value2 ? -1 : 1;

/**
 * @stable [08.03.2019]
 * @param {StringNumberT} value1
 * @param {StringNumberT} value2
 * @returns {number}
 * @constructor
 */
export const ID_ASC_SORTER_FN = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  ID_DESC_SORTER_FN(value1, value2) * -1;

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 * @constructor
 */
export const ID_ASC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  ID_ASC_SORTER_FN(item1.id, item2.id);

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 */
export const $DATE_DESC_ENTITIES_SORTER_FN = <TEntity extends I$DateWrapper>(item1: TEntity, item2: TEntity): number =>
  item1.$date > item2.$date ? -1 : 1;
