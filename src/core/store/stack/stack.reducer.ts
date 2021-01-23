import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  $RAC_STACK_LOCK_ACTION_TYPE,
  $RAC_STACK_POP_ACTION_TYPE,
  $RAC_STACK_PUSH_ACTION_TYPE,
  $RAC_STACK_REMOVE_ACTION_TYPE,
  DefaultEntities,
  IReduxStackEntity,
  IReduxStackItemEntity,
  IFluxStackEntity,
} from '../../definition';
import {
  getAdditionalStackSectionsToDestroy,
} from './stack.support';
import {
  findStackItemEntityIndexBySection,
  truncateStack,
} from '../../util';

/**
 * @stable [21.10.2019]
 * @param {IReduxStackEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxStackEntity}
 */
export const stackReducer = (state: IReduxStackEntity = DefaultEntities.INITIAL_REDUX_STACK_ENTITY,
                             action: IEffectsAction): IReduxStackEntity => {
  const stack = state.stack;
  const payloadEntity: IFluxStackEntity = action.data;

  switch (action.type) {
    /**
     * @stable [21.09.2019]
     */
    case $RAC_STACK_REMOVE_ACTION_TYPE:
      const sectionsToDestroy = action.data as string[];
      return {
        ...state,
        stack: R.filter<IReduxStackItemEntity>((entry) => !sectionsToDestroy.includes(entry.section), stack)
          .map(
            (itm): IReduxStackItemEntity =>
              ({
                ...itm,
                linkedSections: itm.linkedSections.filter((linkedSection) => !sectionsToDestroy.includes(linkedSection)),
              })
          ),
      };
    /**
     * @stable [20.09.2019]
     */
    case $RAC_STACK_PUSH_ACTION_TYPE:
      const pushSection = payloadEntity.section;                                          // Next section
      const pushUrl = payloadEntity.url;                                                  // Next section url (url path)
      return {
        ...state,
        destroySections: [...DefaultEntities.INITIAL_REDUX_STACK_ENTITY.destroySections], // Auto reset
        ...(
          findStackItemEntityIndexBySection(pushSection, state) > -1                      // If already inserted
            ? {}
            : {
              stack: [
                ...stack,
                {section: pushSection, url: pushUrl, linkedSections: []}
              ],
            }
        ),
      };
    /**
     * @stable [20.09.2019]
     * Is called from componentWillUnmount
     */
    case $RAC_STACK_POP_ACTION_TYPE:
      const previousSection = payloadEntity.section;
      const additionalSectionsToDestroy = getAdditionalStackSectionsToDestroy(previousSection, state);
      return {
        ...state,
        lock: DefaultEntities.INITIAL_REDUX_STACK_ENTITY.lock,                                 // Auto reset
        destroySections: [...DefaultEntities.INITIAL_REDUX_STACK_ENTITY.destroySections],      // Auto reset
        ...(
          state.lock
            ? {}  // If there is a lock - do nothing
            : {
              stack: truncateStack(state, previousSection).map((itm): IReduxStackItemEntity =>
                ({
                  ...itm,
                  linkedSections: itm.linkedSections.filter((itm0) => !additionalSectionsToDestroy.includes(itm0)),
                })),
              destroySections: additionalSectionsToDestroy,  // The sections will be destroyed on PUSH event
            }
        ),
      };
    /**
     * @stable [21.09.2019]
     */
    case $RAC_STACK_LOCK_ACTION_TYPE:
      const nextSection = action.data as string;
      return {
        ...state,
        lock: true,
        // If there is a lock - we should attach the next section to linked sections
        stack: stack.map<IReduxStackItemEntity>((entry, index): IReduxStackItemEntity => (
          index === stack.length - 1
            ? {
              ...entry,
              linkedSections: Array.from(
                new Set(
                  entry.linkedSections.concat(nextSection)
                    .filter((section) => section !== entry.section) // Prevent the recursive links
                )
              ),
            }
            : entry
        )),
      };
  }
  return state;
};
