import * as R from 'ramda';

import {
  IReduxStackEntity,
  IReduxStackItemEntity,
} from '../definition';

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
