import * as R from 'ramda';

import {
  IReduxStackEntity,
  IReduxStackHolderEntity,
  IReduxStackItemEntity,
} from '../definition';
import { Selectors } from './select';

/**
 * @stable [19.12.2019]
 * @param {string} currentSection
 * @param {IReduxStackEntity} stackEntity
 * @returns {number}
 */
export const findStackItemEntityIndexBySection = (currentSection: string,
                                                  stackEntity: IReduxStackEntity): number =>
  R.findIndex<IReduxStackItemEntity>((entry) => entry.section === currentSection, stackEntity.stack);

/**
 * @stable [19.12.2019]
 * @param {IReduxStackEntity} stackEntity
 * @param {string} section
 * @returns {IReduxStackItemEntity[]}
 */
export const truncateStack = (stackEntity: IReduxStackEntity, section: string): IReduxStackItemEntity[] =>
  stackEntity
    .stack
    .slice(0, findStackItemEntityIndexBySection(section, stackEntity) + 1);

/**
 * @stable [21.05.2020]
 * @param {IReduxStackEntity} entity
 * @returns {boolean}
 */
const doesStackEntityContainChildren = (entity: IReduxStackEntity): boolean =>
  (Selectors.stack(entity) || []).length > 1;

/**
 * @stable [21.05.2020]
 * @param {IReduxStackHolderEntity} entity
 * @returns {boolean}
 */
const doesHolderStackEntityContainChildren = (entity: IReduxStackHolderEntity): boolean =>
  doesStackEntityContainChildren(Selectors.stack(entity));

/**
 * @stable [21.05.2020]
 */
export class StackUtils {
  public static readonly doesHolderStackEntityContainChildren = doesHolderStackEntityContainChildren;  /* @stable [21.05.2020] */
}
