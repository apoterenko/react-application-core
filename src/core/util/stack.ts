import * as R from 'ramda';

import {
  IGenericStackEntity,
  IStackItemEntity,
} from '../definition';

/**
 * @stable [19.12.2019]
 * @param {string} currentSection
 * @param {IGenericStackEntity} stackEntity
 * @returns {number}
 */
export const findStackItemEntityIndexBySection = (currentSection: string,
                                                  stackEntity: IGenericStackEntity): number =>
  R.findIndex<IStackItemEntity>((entry) => entry.section === currentSection, stackEntity.stack);

/**
 * @stable [19.12.2019]
 * @param {IGenericStackEntity} stackEntity
 * @param {string} section
 * @returns {IStackItemEntity[]}
 */
export const truncateStack = (stackEntity: IGenericStackEntity, section: string): IStackItemEntity[] =>
  stackEntity
    .stack
    .slice(0, findStackItemEntityIndexBySection(section, stackEntity) + 1);
