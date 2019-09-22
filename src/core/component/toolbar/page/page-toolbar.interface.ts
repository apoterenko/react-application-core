import { IListWrapperEntity } from '../../../entities-definitions.interface';
import {
  INavigationHandlersConfiguration,
} from '../../../configurations-definitions.interface';
import { IContainerProps } from '../../../props-definitions.interface';
import { IProgressWrapper } from '../../../definitions.interface';
import { IPaginatedEntity, IWebComponentEntity, IUniversalComponentEntity } from '../../../definition';

/**
 * @stable [16.05.2018]
 */
export interface IUniversalPageToolbarEntity extends IPaginatedEntity,
                                                     IProgressWrapper {
}

/**
 * @stable [16.05.2018]
 */
export interface IUniversalPageToolbarConfiguration extends IUniversalComponentEntity,
                                                            INavigationHandlersConfiguration {
}

/**
 * @stable [16.05.2018]
 */
export interface IUniversalPageToolbarProps extends IUniversalPageToolbarEntity,
                                                    IUniversalPageToolbarConfiguration {
  useSimplePagesFormat?: boolean;
}

/**
 * @stable [16.05.2018]
 */
export interface IPageToolbarEntity extends IUniversalPageToolbarEntity {
}

/**
 * @stable [16.05.2018]
 */
export interface IPageToolbarProps
  extends IPageToolbarEntity,
    IUniversalPageToolbarConfiguration,
    IWebComponentEntity {
  allowLast?: boolean;
  allowFirst?: boolean;
  previousIcon?: string;
  nextIcon?: string;
}

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
