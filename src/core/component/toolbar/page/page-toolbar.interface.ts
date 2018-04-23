import {
  IPaginatedEntity,
  IListWrapperEntity,
  IContainerEntity,
  IComponentEntity,
} from '../../../entities-definitions.interface';

export interface IPageToolbarInternalProps extends IComponentEntity,
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
