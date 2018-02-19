import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
} from '../../base';
import { IApplicationListWrapperState, IPageOptions } from '../../list';

export interface IPageToolbarInternalProps extends IBaseComponentInternalProps,
                                                   IPageOptions {
  contentDisplay?: boolean;
  onPrevious?(): void;
  onNext?(): void;
  onFirst?(): void;
  onLast?(): void;
}

export interface IPageToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                            IApplicationListWrapperState {
}

export const PAGER_NEXT_ACTION_TYPE = 'pager.next';
export const PAGER_PREVIOUS_ACTION_TYPE = 'pager.previous';
export const PAGER_LAST_ACTION_TYPE = 'pager.last';
export const PAGER_FIRST_ACTION_TYPE = 'pager.first';
