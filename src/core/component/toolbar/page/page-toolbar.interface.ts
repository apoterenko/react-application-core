import {
  IPaginatedEntity,
  IListWrapperEntity,
  IContainerEntity,
} from '../../../entities-definitions.interface';
import { IComponentProps } from '../../../props-definitions.interface';

export interface IPageToolbarProps extends IComponentProps,
                                           IPaginatedEntity {
  contentDisplay?: boolean;
  onPrevious?(): void;
  onNext?(): void;
  onFirst?(): void;
  onLast?(): void;
}

export interface IPageToolbarContainerInternalProps extends IContainerEntity,
                                                            IListWrapperEntity {
}

export const PAGER_NEXT_ACTION_TYPE = 'pager.next';
export const PAGER_PREVIOUS_ACTION_TYPE = 'pager.previous';
export const PAGER_LAST_ACTION_TYPE = 'pager.last';
export const PAGER_FIRST_ACTION_TYPE = 'pager.first';
