import { IEntity, StringNumberT } from '../definitions.interface';
import { nvl } from '../util';

/**
 * @stable [09.04.2019]
 * @param {StringNumberT} value1
 * @param {StringNumberT} value2
 * @returns {number}
 * @constructor
 */
export const NAME_ASC_SORTER_FN = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  nvl(`${value1}`, '').localeCompare(`${value2}`);

/**
 * @stable [07.03.2019]
 * @param {number} value1
 * @param {number} value2
 * @returns {number}
 * @constructor
 */
export const VALUE_DESC_SORTER_FN = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  value1 === value2 ? 0 : (value1 > value2 ? -1 : 1);

/**
 * @stable [08.03.2019]
 * @param {StringNumberT} value1
 * @param {StringNumberT} value2
 * @returns {number}
 * @constructor
 */
export const VALUE_ASC_SORTER_FN = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  VALUE_DESC_SORTER_FN(value1, value2) * -1;

/**
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 * @constructor
 */
export const ID_ASC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_ASC_SORTER_FN(item1.id, item2.id);

/**
 * @stable [13.05.2019]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 * @constructor
 */
export const ID_DESC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_DESC_SORTER_FN(item1.id, item2.id);
