import {
  IFirstAllowedWrapper,
  IFullWrapper,
  ILastAllowedWrapper,
  INextIconWrapper,
  IOnFirstWrapper,
  IOnLastWrapper,
  IOnNextWrapper,
  IOnPreviousWrapper,
  IPreviousIconWrapper,
  IUseShortFormatWrapper,
  IToolbarConfigurationWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericPaginatedLifeCycleEntity } from './page-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @generic-entity
 * @stable [05.05.2020]
 */
export interface IGenericToolbarEntity
  extends IFullWrapper {
}

/**
 * @generic-entity
 * @stable [05.05.2020]
 */
export interface IGenericPageToolbarEntity
  extends IGenericPaginatedLifeCycleEntity,
    IGenericToolbarEntity,
    IFirstAllowedWrapper,
    ILastAllowedWrapper,
    INextIconWrapper,
    IPreviousIconWrapper,
    IUseShortFormatWrapper {
}

/**
 * @behavioral-entity
 * @stable [05.05.2020]
 */
export interface IBehavioralPageToolbarEntity
  extends IOnFirstWrapper,
    IOnLastWrapper,
    IOnNextWrapper,
    IOnPreviousWrapper {
}

/**
 * @props
 * @stable [05.05.2020]
 */
export interface IPageToolbarProps
  extends IGenericComponentProps,
    IGenericPageToolbarEntity,
    IBehavioralPageToolbarEntity {
}

/**
 * @configuration-entity
 * @stable [06.05.2020]
 */
export interface IPageToolbarConfigurationEntity
  extends IToolbarConfigurationWrapper<IPageToolbarProps> {
}

/**
 * @generic-container-entity
 * @stable [06.05.2020]
 */
export interface IGenericPageToolbarContainerEntity
  extends IPageToolbarConfigurationEntity {
}

/**
 * @props
 * @stable [06.05.2020]
 */
export interface IPageToolbarContainerProps
  extends IGenericContainerProps,
    IGenericPageToolbarContainerEntity {
}

/**
 * @classes
 * @stable [05.05.2020]
 */
export enum ToolbarClassesEnum {
  FULL_TOOLBAR = 'rac-full-toolbar',
  PAGE_TOOLBAR = 'rac-page-toolbar',
  SEARCH_TOOLBAR = 'rac-search-toolbar',
  TOOLBAR_CONTENT = 'rac-toolbar__content',
  TOOLBAR_ICON = 'rac-toolbar__icon',
  TOOLBAR_PAGES = 'rac-toolbar__pages',
}

/**
 * @stable [06.05.2020]
 */
export const FIRST_PAGE_ACTION_TYPE = 'first.page';
export const LAST_PAGE_ACTION_TYPE = 'last.page';
export const NEXT_PAGE_ACTION_TYPE = 'next.page';
export const PREVIOUS_PAGE_ACTION_TYPE = 'previous.page';
