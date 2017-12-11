import { AnyAction } from 'redux';
import * as R from 'ramda';

import {
  IApplicationLockState,
  INITIAL_APPLICATION_LOCK_STATE,
  LOCK_ACTION_TYPE,
  LOCK_DESTROY_ACTION_TYPE,
  LOCK_CONTAINER_DESTROY_ACTION_TYPE,
  LOCK_CONTAINER_INIT_ACTION_TYPE,
  LOCK_DESTROYABLE_SECTIONS_ACTION_TYPE,
  IApplicationLockStackState,
  IApplicationLockDestroyableState,
  LockOperationT,
} from './lock.interface';

function toDestroyableSections(stack: IApplicationLockStackState[], section: string): IApplicationLockDestroyableState[] {
  const sectionsLinks: {[section: string]: IApplicationLockDestroyableState[]} = {};
  stack.forEach((lockState) => {
    if (lockState.linkedWithSection) {
      (sectionsLinks[lockState.linkedWithSection] = sectionsLinks[lockState.linkedWithSection] || [])
          .push({
            section: lockState.section,
            component: lockState.component,
          });
    }
  });

  let isCurrentSectionLinked = false;
  Object.keys(sectionsLinks).forEach((linkedSection) => {
    isCurrentSectionLinked = isCurrentSectionLinked
        || section === linkedSection
        || !!R.find<string>(
            (item) => item === section,
            R.map<IApplicationLockDestroyableState, string>(
                (item) => item.section,
                sectionsLinks[linkedSection]
            )
        );
  });

  const destroyableSections = [];
  if (!isCurrentSectionLinked) {
    Object.keys(sectionsLinks).forEach((linkedSection) => {
      R.forEach<IApplicationLockDestroyableState>((linkedSection0) =>
          destroyableSections.push(linkedSection0), sectionsLinks[linkedSection]);
    });
  }
  return destroyableSections;
}

export function lockReducer(state: IApplicationLockState = INITIAL_APPLICATION_LOCK_STATE,
                            action: AnyAction): IApplicationLockState {
  const currentStack = state.stack;
  let currentSection;
  let lastOperation: IApplicationLockStackState;

  switch (action.type) {
    case LOCK_CONTAINER_DESTROY_ACTION_TYPE:
      currentSection = action.data;
      lastOperation = R.last<IApplicationLockStackState>(currentStack);

      return lastOperation && lastOperation.operation === LockOperationT.INIT
                           && lastOperation.section === currentSection
          ? {
            ...state,
            stack: R.slice<IApplicationLockStackState>(0, currentStack.length - 1, currentStack),
          }
          : {
            ...state,
          };
    case LOCK_CONTAINER_INIT_ACTION_TYPE:
      currentSection = action.data;
      lastOperation = R.last<IApplicationLockStackState>(currentStack);

      const updatedStack = lastOperation
                              && R.isNil(lastOperation.linkedWithSection)
                              && lastOperation.operation === LockOperationT.LOCK
          ? R.slice<IApplicationLockStackState>(0, currentStack.length - 1, currentStack)
              .concat({
                ...lastOperation,
                linkedWithSection: currentSection,
              })
          : currentStack;

      const destroyableSections = toDestroyableSections(updatedStack, currentSection);
      return {
        ...state,
        destroyableSections: state.destroyableSections.concat(destroyableSections),
        stack: updatedStack
            .filter((lockState) => lockState.section !== currentSection
                && R.findIndex(
                    (cs) => cs === lockState.section,
                    destroyableSections.map<string>((item) => item.section)) === -1
            )
            .concat({ section: currentSection, operation: LockOperationT.INIT }),
      };
    case LOCK_ACTION_TYPE:
      return {
        ...state,
        stack: currentStack.concat({
          section: action.data.section,
          component: action.data.component,
          operation: LockOperationT.LOCK,
        }),
      };
    case LOCK_DESTROYABLE_SECTIONS_ACTION_TYPE:
      return {
        ...state,
        destroyableSections: [],
      };
    case LOCK_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_APPLICATION_LOCK_STATE,
      };
  }
  return state;
}
