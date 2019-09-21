import * as graphlib from '@dagrejs/graphlib';
import * as R from 'ramda';

import { IStackEntity, IStackItemEntity } from '../../definition';

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {number}
 */
export const findStackEntityIndex = (currentSection: string,
                                     stackEntity: IStackEntity): number =>
  R.findIndex<IStackItemEntity>((entry) => entry.section === currentSection, stackEntity.stack);

/**
 * @stable [21.09.2019]
 * @param {IStackEntity} stackEntity
 * @param {number} startingIndex
 * @returns {string[]}
 */
export const collectStackMainSectionsByIndex = (stackEntity: IStackEntity,
                                                startingIndex: number): string [] => {
  if (startingIndex < 0) {
    return [];
  }
  const additionalSectionsToDestroy = new Set<string>();

  stackEntity.stack.forEach((entry, index) => {
    if (index >= startingIndex) {
      additionalSectionsToDestroy.add(entry.section);
    }
  });
  return Array.from(additionalSectionsToDestroy);
};

/**
 * @stable [21.09.2019]
 * @param {string} section
 * @param {IStackEntity} stackEntity
 * @returns {string[]}
 */
export const getAdditionalStackSectionsToDestroy = (section: string,
                                                    stackEntity: IStackEntity): string [] =>
  collectStackMainSectionsByIndex(stackEntity, findStackEntityIndex(section, stackEntity));

/**
 * This is a specific case when a user clicks in root menu item during subtree observing:
 *
 * R0 -> R1 (submenu of R0) -> R2 (submenu of R1) -> R3 (submenu of R2) -> R0
 *
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {string[]}
 */
export const getAdditionalSectionsToDestroyWhenRootIsBeingSelected = (currentSection: string,
                                                                      stackEntity: IStackEntity): string [] => {
  const stack = stackEntity.stack;
  const currentSectionIndex = R.findIndex<IStackItemEntity>((entry) => entry.section === currentSection, stack);
  const doesAlreadyExist = currentSectionIndex > -1;
  const additionalSectionsToDestroy = new Set<string>();

  if (doesAlreadyExist) {
    stack.forEach((entry, index) => {
      if (index >= currentSectionIndex) {
        additionalSectionsToDestroy.add(entry.section);
        entry.linkedSections.forEach((itm) => additionalSectionsToDestroy.add(itm));
      }
    });
  }
  return Array.from(additionalSectionsToDestroy);
};

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {string[][]}
 */
export const toGraphComponents = (currentSection: string,
                                  stackEntity: IStackEntity): string[][] => {

  const stack = stackEntity.stack;
  const additionalSectionsToDestroy = [];
  // TODO getAdditionalSectionsToDestroyWhenRootIsBeingSelected(currentSection, stackEntity);

  const gr = new graphlib.Graph();
  stack.forEach((entry) => {
    gr.setNode(entry.section);

    entry.linkedSections.forEach((linkedSection) => {
      gr.setNode(linkedSection);

      // We need to prevent link the destroyable nodes
      if (R.isEmpty(R.intersection(
          [entry.section, linkedSection],
          [...stackEntity.destroySections, ...additionalSectionsToDestroy]
        ))) {
        gr.setEdge(entry.section, linkedSection);
      }
    });
  });
  return graphlib.alg.components(gr) as string[][];
};

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @param {(linkedSections: string[]) => boolean} predicate
 * @returns {Set<string>}
 */
export const findStackSectionsByPredicate = (
  currentSection: string,
  stackEntity: IStackEntity,
  predicate: (linkedSections: string[]) => boolean): Set<string> => {

  const resultSections = new Set<string>();
  const graphComponents = toGraphComponents(currentSection, stackEntity);

  graphComponents.forEach((graphComponent) => {
    if (predicate(graphComponent)) {
      graphComponent.forEach((entry) => resultSections.add(entry));
    }
  });
  return resultSections;
};

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {Set<string>}
 */
export const toAllIndependentStackSections = (currentSection: string, stackEntity: IStackEntity): Set<string> => {
  const result = new Set<string>();
  findStackSectionsByPredicate(
    currentSection,
    stackEntity,
    (subTree: string[]) => !subTree.includes(currentSection)
  ).forEach((itm) => result.add(itm));

  stackEntity.destroySections.forEach((itm) => result.add(itm));
  return result;
};

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IStackEntity} stackEntity
 * @returns {string[]}
 */
export const getAllIndependentStackSections = (currentSection: string, stackEntity: IStackEntity): string[] =>
  Array.from(toAllIndependentStackSections(currentSection, stackEntity));
