import { AnyAction } from 'redux';
import * as R from 'ramda';

import {
  STACK_POP_ACTION_TYPE,
  STACK_PUSH_ACTION_TYPE,
  STACK_LOCK_ACTION_TYPE,
  STACK_REMOVE_ACTION_TYPE,
  INITIAL_APPLICATION_STACK_STATE,
} from './stack.interface';
import { lockNextSection, destroySections, pushNextSection } from './stack.helper';
import { IStackItemEntity, IStackEntity } from '../../entities-definitions.interface';

export function stackReducer(state: IStackEntity = INITIAL_APPLICATION_STACK_STATE,
                             action: AnyAction): IStackEntity {
  const stack = state.stack;
  switch (action.type) {
    case STACK_REMOVE_ACTION_TYPE:
      return {
        ...state,
        stack: destroySections(action.data as string[], state),
      };
    case STACK_PUSH_ACTION_TYPE:
      return {
        ...state,
        stack: pushNextSection(action.data as string, state),
        needToDestroySections: null,
      };
    case STACK_POP_ACTION_TYPE:
      const lock = state.lock;
      const lastEl = !lock ? R.last<IStackItemEntity>(stack) : null;
      const currentSection = action.data;
      return {
        ...state,
        lock: false,
        ...(
          lock
            ? {}  // If there is a lock - nothing to do
            : {   // Otherwise - remove the last item from stack
              stack: R.remove<IStackItemEntity>(stack.length - 1, 1, stack),
            }
        ),
        // If the section has no lock - we must destroy it and its dependencies
        needToDestroySections: !lock
          ? [currentSection].concat(lastEl ? lastEl.linkedToSections : [])
          : null,
      };
    case STACK_LOCK_ACTION_TYPE:
      const nextSection = action.data;
      return {
        ...state,
        lock: true,
        stack: lockNextSection(nextSection, state),
      };
  }
  return state;
}
