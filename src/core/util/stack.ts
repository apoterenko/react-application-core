import * as R from 'ramda';

import {
  IStackEntity,
  IStackItemEntity,
} from '../definition';

/**
 * @stable [19.12.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {number}
 */
export const findStackItemEntityIndexBySection = (currentSection: string,
                                                  stackEntity: IStackEntity): number =>
  R.findIndex<IStackItemEntity>((entry) => entry.section === currentSection, stackEntity.stack);

/**
 * @stable [19.12.2019]
 * @param {IStackEntity} stackEntity
 * @param {string} section
 * @returns {IStackItemEntity[]}
 */
export const truncateStack = (stackEntity: IStackEntity, section: string): IStackItemEntity[] =>
  stackEntity
    .stack
    .slice(0, findStackItemEntityIndexBySection(section, stackEntity) + 1);
