import {
  IClassNameWrapper,
  IFullWrapper,
} from '../definitions.interface';
import { STRING_VALUE_PREDICATE } from './filter';

/**
 * @stable [11.09.2019]
 * @param {IClassNameWrapper & IFullWrapper} entity
 * @returns {string}
 */
export const fullFlexClassName = (entity: IClassNameWrapper & IFullWrapper): string =>
  (entity.full !== false && !(entity.className || '').includes('rac-flex-')) && 'rac-flex-full';

/**
 * @stable [30.08.2019]
 * @param {string} parts
 * @returns {string}
 */
export const joinClassName = (...parts: string[]): string => parts.filter(STRING_VALUE_PREDICATE).join(' ');
