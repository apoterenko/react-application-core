import * as graphlib from '@dagrejs/graphlib';
import * as R from 'ramda';

import { IReduxStackEntity, IReduxStackItemEntity } from '../../definition';
import { findStackItemEntityIndexBySection } from '../../util';

/**
 * @stable [21.09.2019]
 * @param {IReduxStackEntity} stackEntity
 * @param {number} startingIndex
 * @returns {string[]}
 */
export const collectStackMainSectionsByIndex = (stackEntity: IReduxStackEntity,
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
 * @param {IReduxStackEntity} stackEntity
 * @returns {string[]}
 */
export const getAdditionalStackSectionsToDestroy = (section: string,
                                                    stackEntity: IReduxStackEntity): string [] =>
  collectStackMainSectionsByIndex(stackEntity, findStackItemEntityIndexBySection(section, stackEntity));

/**
 * @stable [20.09.2019]
 * @param {string} currentSection
 * @param {IReduxStackEntity} stackEntity
 * @returns {string[][]}
 */
export const toGraphComponents = (currentSection: string,
                                  stackEntity: IReduxStackEntity): string[][] => {

  const stack = stackEntity.stack;

  /**
   * The cases:
   * R0 -> R1 -> R2 -> R3 -> R0
   * R0 -> R1 -> R2 -> R3 -> R1
   */
  const currentSectionIndex = findStackItemEntityIndexBySection(currentSection, stackEntity);
  const additionalSectionsToPreventToBeLinked = currentSectionIndex > -1
    // // R0 -> R1 -> R2 -> R3 -> R1 ==> The links between R1-R2 + R1-R3 will be broken
    ? collectStackMainSectionsByIndex(stackEntity, currentSectionIndex + 1)
    : [];

  const gr = new graphlib.Graph();
  stack.forEach((entry) => {
    gr.setNode(entry.section);

    entry.linkedSections.forEach((linkedSection) => {
      gr.setNode(linkedSection);

      // We need to prevent link the destroyable nodes
      if (R.isEmpty(R.intersection(
          [entry.section, linkedSection],
          [...stackEntity.destroySections, ...additionalSectionsToPreventToBeLinked]
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
 * @param {IReduxStackEntity} stackEntity
 * @param {(linkedSections: string[]) => boolean} predicate
 * @returns {Set<string>}
 */
export const findStackSectionsByPredicate = (
  currentSection: string,
  stackEntity: IReduxStackEntity,
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
 * @param {IReduxStackEntity} stackEntity
 * @returns {Set<string>}
 */
export const toAllIndependentStackSections = (currentSection: string, stackEntity: IReduxStackEntity): Set<string> => {
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
 * @param {IReduxStackEntity} stackEntity
 * @returns {string[]}
 */
export const getAllIndependentStackSections = (currentSection: string, stackEntity: IReduxStackEntity): string[] =>
  Array.from(toAllIndependentStackSections(currentSection, stackEntity));
