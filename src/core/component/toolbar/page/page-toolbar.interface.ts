import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
} from '../../base';
import { IApplicationListStateWrapper } from '../../list';
import { IPageEntity } from '../../../definition.interface';

export interface IPageToolbarInternalProps extends IBaseComponentInternalProps,
                                                   IPageEntity {
  contentDisplay?: boolean;
  onPrevious?(): void;
  onNext?(): void;
  onFirst?(): void;
  onLast?(): void;
}

export interface IPageToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                            IApplicationListStateWrapper {
}

export const PAGER_NEXT_ACTION_TYPE = 'pager.next';
export const PAGER_PREVIOUS_ACTION_TYPE = 'pager.previous';
export const PAGER_LAST_ACTION_TYPE = 'pager.last';
export const PAGER_FIRST_ACTION_TYPE = 'pager.first';
