import { ISectionable } from '../definition.interface';

export interface IApplicationLockStackState extends ISectionable {
  operation: LockOperationT;
  component?: LockContainerT;
  linkedWithSection?: string;
}

export interface IApplicationLockDestroyableState extends ISectionable {
  component?: LockContainerT;
}

export interface IApplicationLockState {
  stack: IApplicationLockStackState[];
  destroyableSections: IApplicationLockDestroyableState[];
}

export interface IApplicationLockWrapperState {
  lock: IApplicationLockState;
}

export const INITIAL_APPLICATION_LOCK_STATE: IApplicationLockState = {
  stack: [],
  destroyableSections: [],
};

export enum LockContainerT {
  FORM,
  LIST,
}

export enum LockOperationT {
  DESTROY,
  INIT,
  LOCK,
}
export const LOCK_CONTAINER_INIT_ACTION_TYPE = 'lock.container.init';
export const LOCK_CONTAINER_DESTROY_ACTION_TYPE = 'lock.container.destroy';
export const LOCK_ACTION_TYPE = 'lock.container';
export const LOCK_DESTROYABLE_SECTIONS_ACTION_TYPE = 'lock.destroyable.sections';
export const LOCK_DESTROY_ACTION_TYPE = 'lock.destroy';
