import {
  ACTION_PREFIX,
  ISectionWrapper,
  ILinkedToSectionsWrapper,
  ILockWrapper,
  IStackWrapper,
} from '../../definition.interface';

export interface IApplicationStackItemState extends ISectionWrapper,
                                                    ILinkedToSectionsWrapper {
}

export interface IApplicationStackState extends ILockWrapper,
                                                IStackWrapper<IApplicationStackItemState[]> {
  needToDestroy?: string[];
}

export const INITIAL_APPLICATION_STACK_STATE: IApplicationStackState = {
  stack: [],
  lock: false,
};

export interface IApplicationStackWrapperState extends IStackWrapper<IApplicationStackState> {
}

export const STACK_LOCK_ACTION_TYPE = `${ACTION_PREFIX}stack.lock`;
export const STACK_PUSH_ACTION_TYPE = `${ACTION_PREFIX}stack.push`;
export const STACK_POP_ACTION_TYPE = `${ACTION_PREFIX}stack.pop`;
export const STACK_REMOVE_ACTION_TYPE = `${ACTION_PREFIX}stack.remove`;
