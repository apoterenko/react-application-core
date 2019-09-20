import { AnyAction } from 'redux';
import * as R from 'ramda';

import {
  STACK_LOCK_ACTION_TYPE,
  STACK_POP_ACTION_TYPE,
  STACK_PUSH_ACTION_TYPE,
  STACK_REMOVE_ACTION_TYPE,
} from './stack.interface';
import { lockNextSection, destroySections } from './stack.helper';
import {
  INITIAL_STACK_ENTITY,
  IStackEntity,
  IStackItemEntity,
} from '../../definition';
import { findStackEntityIndex } from './stack.support';

/**
 * @stable [20.09.2019]
 * @param {IStackEntity} state
 * @param {AnyAction} action
 * @returns {IStackEntity}
 */
export const stackReducer = (state: IStackEntity = INITIAL_STACK_ENTITY,
                             action: AnyAction): IStackEntity => {
  const stack = state.stack;
  const nextSection = action.data;

  switch (action.type) {
    case STACK_REMOVE_ACTION_TYPE:
      return {
        ...state,
        stack: destroySections(nextSection as string[], state),
      };
    /**
     * @stable [20.09.2019]
     * Is called from componentDidMount
     */
    case STACK_PUSH_ACTION_TYPE:
      return {
        ...state,
        destroySections: INITIAL_STACK_ENTITY.destroySections,      // Auto reset
        ...(
          findStackEntityIndex(nextSection, state) > -1
            ? {} // If already inserted
            : {
              stack: R.insert<IStackItemEntity>(stack.length, {section: nextSection, linkedSections: []}, stack),
            }
        ),
      };
    /**
     * @stable [20.09.2019]
     * Is called from componentWillUnmount
     */
    case STACK_POP_ACTION_TYPE:
      return {
        ...state,
        lock: INITIAL_STACK_ENTITY.lock,                            // Auto reset
        destroySections: INITIAL_STACK_ENTITY.destroySections,      // Auto reset
        ...(
          state.lock
            ? {}  // If there is a lock - do nothing
            : {
              stack: stack.slice(0, findStackEntityIndex(nextSection, state) + 1),
              destroySections: [nextSection], // TODO Extract destroy sections by index here
            }
        ),
      };
    case STACK_LOCK_ACTION_TYPE:
      return {
        ...state,
        lock: true,
        stack: lockNextSection(nextSection, state),
      };
  }
  return state;
};
