import * as graphlib from '@dagrejs/graphlib';
import * as R from 'ramda';

import { IApplicationStackState, IApplicationStackItemState } from './stack.interface';

export const getDestroyableSections = (currentSection: string, state: IApplicationStackState): string[] => {
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

  const needToDestroy = state.needToDestroy;
  if (needToDestroy) {
    needToDestroy.forEach((sectionNeedToDestroy) => sectionsToDestroy.add(sectionNeedToDestroy));
  }
  return Array.from(sectionsToDestroy);
};

export const lockNextSection = (nextSection: string, state: IApplicationStackState): IApplicationStackItemState[] => {
  const stack = state.stack;
  const stackLength = stack.length;

  // If there is a lock - we must put the next section to linked stack
  return stack.map<IApplicationStackItemState>((entry, index): IApplicationStackItemState => (
    index === stackLength - 1
      ? { ...entry, linkedToSections: Array.from(new Set<string>(entry.linkedToSections.concat(nextSection))) }
      : entry
  ));
};

export const destroySections = (sectionsToDestroy: string[], state: IApplicationStackState): IApplicationStackItemState[] => {
  const stack = state.stack;

  return R.filter<IApplicationStackItemState>((entry) =>
    !R.contains<string>(entry.section, sectionsToDestroy), stack);
};

export const pushNextSection = (nextSection: string, state: IApplicationStackState): IApplicationStackItemState[] => {
  const stack = state.stack;
  const currentSectionIndex =
    R.findIndex<IApplicationStackItemState>((entry) => entry.section === nextSection, stack);

  return currentSectionIndex > -1
    ? [].concat(stack)
    : R.insert<IApplicationStackItemState>(stack.length, { section: nextSection, linkedToSections: [] }, stack);
};
