import {
  IItemsWrapper,
  INavigationActionConfigurationWrapper,
  INavigationActionRenderedWrapper,
  ISubBorderWrapper,
  ISubHeaderConfigurationWrapper,
  ITitleRendererWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IButtonProps } from './button-definition.interface';

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsSubHeaderEntity
  extends IItemsWrapper<JSX.Element>,
    INavigationActionConfigurationWrapper<IButtonProps>,
    INavigationActionRenderedWrapper,
    ISubBorderWrapper,
    ITitleRendererWrapper<JSX.Element> {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericSubHeaderEntity
  extends IPresetsSubHeaderEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface ISubHeaderProps
  extends IGenericComponentProps,
    IGenericSubHeaderEntity {
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
  NAVIGATION_ACTION = 'rac-sub-header__navigation-action',
  SECTION_TITLE = 'rac-sub-header__section-title',
  SUB_BORDER = 'rac-sub-header__sub-border',
  SUB_HEADER = 'rac-sub-header',
}
