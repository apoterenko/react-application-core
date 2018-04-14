import * as graphlib from '@dagrejs/graphlib';
import * as R from 'ramda';

import { IStackItemEntity, IStackEntity } from '../../entities-definitions.interface';

export const getDestroyableSections = (currentSection: string, state: IStackEntity): string[] => {
  const sectionsToDestroy = new Set<string>();
  const gr = new graphlib.Graph();

  state.stack.forEach((entry) => {
    gr.setNode(entry.section);
    entry.linkedToSections.forEach((linkedSection) => {
      gr.setNode(linkedSection);
      gr.setEdge(entry.section, linkedSection);
    });
  });

  const graphComponents = graphlib.alg.components(gr) as string[][];
  graphComponents.forEach((graphComponent) => {
    if (!R.contains<string>(currentSection, graphComponent)) {
      graphComponent.forEach((entry) => sectionsToDestroy.add(entry));
    }
  });

  const needToDestroySections = state.needToDestroySections;
  if (needToDestroySections) {
    needToDestroySections.forEach((sectionNeedToDestroy) => sectionsToDestroy.add(sectionNeedToDestroy));
  }
  return Array.from(sectionsToDestroy);
};

export const lockNextSection = (nextSection: string, state: IStackEntity): IStackItemEntity[] => {
  const stack = state.stack;
  const stackLength = stack.length;

  // If there is a lock - we must put the next section to linked stack
  return stack.map<IStackItemEntity>((entry, index): IStackItemEntity => (
    index === stackLength - 1
      ? { ...entry,
          linkedToSections: Array.from(
            new Set<string>(entry.linkedToSections.concat(nextSection)
              .filter((section) => section !== entry.section)) // Prevent the recursive links
          ),
        }
      : entry
  ));
};

export const destroySections = (sectionsToDestroy: string[], state: IStackEntity): IStackItemEntity[] => {
  const stack = state.stack;

  return R.filter<IStackItemEntity>((entry) =>
    !R.contains<string>(entry.section, sectionsToDestroy), stack);
};

export const pushNextSection = (nextSection: string, state: IStackEntity): IStackItemEntity[] => {
  const stack = state.stack;
  const currentSectionIndex =
    R.findIndex<IStackItemEntity>((entry) => entry.section === nextSection, stack);

  return currentSectionIndex > -1
    ? [].concat(stack)
    : R.insert<IStackItemEntity>(stack.length, { section: nextSection, linkedToSections: [] }, stack);
};
