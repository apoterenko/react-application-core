import {
  IPresetsSelectedElementEntity,
  IPresetsStickyEntity,
} from '../definition';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import {
  IFullWrapper,
  IMainConfigurationWrapper,
  IMinWidthMinContentWrapper,
  ISubHeaderRenderedWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsMainEntity
  extends IPresetsSelectedElementEntity,
    IPresetsStickyEntity,
    IFullWrapper,
    IMinWidthMinContentWrapper,
    ISubHeaderRenderedWrapper {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericMainEntity
  extends IPresetsMainEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface IMainProps
  extends IEnhancedGenericComponentProps,
    IGenericMainEntity {
}

/**
 * @configuration-entity
 * @stable [22.05.2020]
 */
export interface IMainConfigurationEntity<TProps = IMainProps>
  extends IMainConfigurationWrapper<TProps> {
}

/**
 * @classes
 * @stable [20.05.2020]
 */
export enum MainClassesEnum {
  FULL_MAIN = 'rac-full-main',
  MAIN = 'rac-main',
  MAIN_BODY = 'rac-main__body',
  MAIN_BODY_CONTENT = 'rac-main__body-content',
  MAIN_WITH_MIN_CONTENT = 'rac-main-with-min-content',
  MAIN_WITH_SUB_HEADER = 'rac-main-with-sub-header',
}
