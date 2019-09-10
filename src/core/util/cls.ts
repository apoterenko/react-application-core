import {
  IClassNameWrapper,
  IFullWrapper,
} from '../definitions.interface';

/**
 * @stable [11.09.2019]
 * @param {IClassNameWrapper & IFullWrapper} entity
 * @returns {string}
 */
export const fullFlexCls = (entity: IClassNameWrapper & IFullWrapper): string =>
  (entity.full !== false && !(entity.className || '').includes('rac-flex-')) && 'rac-flex-full';
