import * as graphlib from '@dagrejs/graphlib';
import * as R from 'ramda';

import { IStackEntity } from '../../entities-definitions.interface';

/**
 * @stable [18.09.2018]
 * @param {IStackEntity} stackEntity
 * @returns {string[][]}
 */
export const toGraphComponents = (stackEntity: IStackEntity): string[][] => {
  const gr = new graphlib.Graph();

  stackEntity.stack.forEach((entry) => {
    gr.setNode(entry.section);

    entry.linkedToSections.forEach((linkedSection) => {
      gr.setNode(linkedSection);
      gr.setEdge(entry.section, linkedSection);
    });
  });
  return graphlib.alg.components(gr) as string[][];
};

/**
 * @stable [18.09.2018]
 * @param {IStackEntity} stackEntity
 * @param {string} currentSection
 * @returns {Set<string>}
 */
export const toAllDependentSections = (stackEntity: IStackEntity, currentSection?: string): Set<string> => {
  const allDependentSections = new Set<string>();
  const graphComponents = toGraphComponents(stackEntity);
  graphComponents.forEach((graphComponent) => {
    if (R.isNil(currentSection) || R.contains<string>(currentSection, graphComponent)) {
      graphComponent.forEach((entry) => allDependentSections.add(entry));
    }
  });
  return allDependentSections;
};
