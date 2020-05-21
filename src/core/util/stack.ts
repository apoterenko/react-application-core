import * as R from 'ramda';

import {
  IReduxHolderStackEntity,
  IReduxStackEntity,
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
 * @param {IReduxHolderStackEntity} entity
 * @returns {boolean}
 */
const doesStackContainChildren = (entity: IReduxHolderStackEntity): boolean =>
  (Selectors.stackItemEntities(entity) || []).length > 1;

/**
 * @stable [21.05.2020]
 */
export class StackUtils {
  public static readonly doesStackContainChildren = doesStackContainChildren;                       /* @stable [21.05.2020] */
}
