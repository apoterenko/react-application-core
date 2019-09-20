import * as R from 'ramda';

import { IStackItemEntity, IStackEntity } from '../../definition';

export const lockNextSection = (nextSection: string, state: IStackEntity): IStackItemEntity[] => {
  const stack = state.stack;
  const stackLength = stack.length;

  // If there is a lock - we must put the next section to linked stack
  return stack.map<IStackItemEntity>((entry, index): IStackItemEntity => (
    index === stackLength - 1
      ? {
        ...entry,
        linkedSections: Array.from(
          new Set<string>(entry.linkedSections.concat(nextSection)
            .filter((section) => section !== entry.section)) // Prevent the recursive links
        ),
      }
      : entry
  ));
};

export const destroySections = (sectionsToDestroy: string[], state: IStackEntity): IStackItemEntity[] => {
  const stack = state.stack;

  return R.filter<IStackItemEntity>((entry) =>
    !R.contains<string>(entry.section, sectionsToDestroy), stack)
    .map(
      (itm): IStackItemEntity =>
        ({
          ...itm,
          linkedSections: itm.linkedSections.filter((linkedSection) => !sectionsToDestroy.includes(linkedSection)),
        })
    );
};
