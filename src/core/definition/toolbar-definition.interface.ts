import {
  IActionConfigurationWrapper,
  IDisabledWrapper,
  IFirstAllowedWrapper,
  IFullWrapper,
  IIconWrapper,
  ILastAllowedWrapper,
  INextIconWrapper,
  IOnActivateWrapper,
  IOnApplyWrapper,
  IOnChangeWrapper,
  IOnDeactivateWrapper,
  IOnFirstWrapper,
  IOnLastWrapper,
  IOnNextWrapper,
  IOnPreviousWrapper,
  IPreviousIconWrapper,
  IToolbarConfigurationWrapper,
  IUseActionsWrapper,
  IUseShortDigitFormatWrapper,
  IUseShortFormatWrapper,
} from '../definitions.interface';
import {
  IQueryFilterEntity,
  IReduxActiveQueryEntity,
} from './query-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IFieldConfigurationEntity } from '../configurations-definitions.interface'; // TODO
import { IReduxPaginatedLifeCycleEntity } from './page-definition.interface';
import { IListEntity } from './list-definition.interface';
import { IButtonProps } from './button-definition.interface';

/**
 * @presets-entity
 * @stable [08.05.2020]
 */
export interface IPresetsPageToolbarEntity
  extends IActionConfigurationWrapper<IButtonProps>,
    IFirstAllowedWrapper,
    IFullWrapper,
    ILastAllowedWrapper,
    INextIconWrapper,
    IOnFirstWrapper,
    IOnLastWrapper,
    IOnNextWrapper,
    IOnPreviousWrapper,
    IPreviousIconWrapper,
    IUseActionsWrapper,
    IUseShortDigitFormatWrapper,
    IUseShortFormatWrapper {
}

/**
 * @generic-entity
 * @stable [08.05.2020]
 */
export interface IGenericPageToolbarEntity
  extends IPresetsPageToolbarEntity,
    IReduxPaginatedLifeCycleEntity {
}

/**
 * @props
 * @stable [08.05.2020]
 */
export interface IPageToolbarProps
  extends IGenericComponentProps,
    IGenericPageToolbarEntity {
}

/**
 * @generic-entity
 * @stable [06.05.2020]
 */
export interface IGenericSearchToolbarEntity
  extends IReduxActiveQueryEntity,
    IFieldConfigurationEntity,
    IDisabledWrapper,
    IFullWrapper,
    IIconWrapper {
}

/**
 * @behavioral-entity
 * @stable [06.05.2020]
 */
export interface IBehavioralSearchToolbarEntity
  extends IOnActivateWrapper,
    IOnApplyWrapper,
    IOnChangeWrapper<string>,
    IOnDeactivateWrapper {
}

/**
 * @props
 * @stable [06.05.2020]
 */
export interface ISearchToolbarProps
  extends IGenericContainerProps,
    IGenericSearchToolbarEntity,
    IBehavioralSearchToolbarEntity {
}

/**
 * @props
 * @stable [06.05.2020]
 */
export interface ISearchToolbarContainerProps
  extends IGenericContainerProps,
    IGenericSearchToolbarContainerEntity {
}

/**
 * @configuration-entity
 * @stable [06.05.2020]
 */
export interface IPageToolbarConfigurationEntity
  extends IToolbarConfigurationWrapper<IPageToolbarProps> {
}

/**
 * @configuration-entity
 * @stable [06.05.2020]
 */
export interface ISearchToolbarConfigurationEntity
  extends IToolbarConfigurationWrapper<ISearchToolbarProps> {
}

/**
 * @generic-container-entity
 * @stable [06.05.2020]
 */
export interface IGenericSearchToolbarContainerEntity
  extends IListEntity,
    IQueryFilterEntity,
    ISearchToolbarConfigurationEntity {
}

/**
 * @generic-container-entity
 * @stable [06.05.2020]
 */
export interface IGenericPageToolbarContainerEntity
  extends IListEntity,
    IPageToolbarConfigurationEntity {
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
  TOOLBAR_ACTION = 'rac-toolbar__action',
  TOOLBAR_ACTION_MIDDLE = 'rac-toolbar__action-middle',
  TOOLBAR_ACTION_WITH_SHORT_DIGIT_FORMAT = 'rac-toolbar__action-with-short-digit-format',
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
