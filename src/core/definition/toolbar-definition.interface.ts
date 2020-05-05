import {
  IFirstAllowedWrapper,
  ILastAllowedWrapper,
  INextIconWrapper,
  IOnFirstWrapper,
  IOnLastWrapper,
  IOnNextWrapper,
  IOnPreviousWrapper,
  IPreviousIconWrapper,
  ISimplePagesInfoFormatWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericPaginatedLifeCycleEntity } from './page-definition.interface';

/**
 * @generic-entity
 * @stable [05.05.2020]
 */
export interface IGenericPageToolbarEntity
  extends IGenericPaginatedLifeCycleEntity,
    IFirstAllowedWrapper,
    ILastAllowedWrapper,
    INextIconWrapper,
    IPreviousIconWrapper,
    ISimplePagesInfoFormatWrapper {
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
 * @classes
 * @stable [05.05.2020]
 */
export enum ToolbarClassesEnum {
  PAGE_TOOLBAR = 'rac-page-toolbar',
  SEARCH_TOOLBAR = 'rac-search-toolbar',
  TOOLBAR_CONTENT = 'rac-toolbar__content',
  TOOLBAR_ICON = 'rac-toolbar__icon',
  TOOLBAR_PAGES = 'rac-toolbar__pages',
}
