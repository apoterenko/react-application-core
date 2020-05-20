import {
  IItemsWrapper,
  INavigationActionIconWrapper,
  INavigationActionRenderedWrapper,
  IOnNavigationActionClickWrapper,
  ISubBorderWrapper,
  ISubHeaderConfigurationWrapper,
  ITitleRendererWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsSubHeaderEntity
  extends IItemsWrapper<JSX.Element>,
    INavigationActionIconWrapper,
    INavigationActionRenderedWrapper,
    IOnNavigationActionClickWrapper,
    ISubBorderWrapper,
    ITitleRendererWrapper<JSX.Element> {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericSubHeader
  extends IPresetsSubHeaderEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface ISubHeaderProps
  extends IGenericComponentProps,
    IGenericSubHeader {
}

/**
 * @configuration-entity
 * @stable [20.05.2020]
 */
export interface ISubHeaderConfigurationEntity<TProps = ISubHeaderProps>
  extends ISubHeaderConfigurationWrapper<TProps> {
}

/**
 * @classes
 * @stable [05.04.2020]
 */
export enum SubHeaderClassesEnum {
  SUB_HEADER = 'rac-sub-header',
  SUB_HEADER_NAVIGATION_ACTION = 'rac-sub-header__navigation-action',
  SUB_HEADER_SECTION_TITLE = 'rac-sub-header__section-title',
  SUB_HEADER_SUB_BORDER = 'rac-sub-header__sub-border',
}
