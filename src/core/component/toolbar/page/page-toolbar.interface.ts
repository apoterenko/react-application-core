import {
  IContainerProps,
  IListWrapperEntity,
} from '../../../definition';

/**
 * @stable [16.05.2018]
 */
export interface IPageToolbarContainerProps extends IContainerProps,
                                                    IListWrapperEntity {
  toolbarProps?: any; // TODO
}

export const PAGER_NEXT_ACTION_TYPE = 'pager.next';
export const PAGER_PREVIOUS_ACTION_TYPE = 'pager.previous';
export const PAGER_LAST_ACTION_TYPE = 'pager.last';
export const PAGER_FIRST_ACTION_TYPE = 'pager.first';
