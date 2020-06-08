import {
  IAlignItemsCenterWrapper,
  IAlignItemsEndWrapper,
  IAlignItemsStartWrapper,
  IAlignItemsStretchWrapper,
  IDisabledWrapper,
  IFullSizeWrapper,
  IFullWrapper,
  IJustifyContentCenterWrapper,
  IJustifyContentEndWrapper,
  IJustifyContentSpaceBetweenWrapper,
  INoShrinkWrapper,
  IOnClickWrapper,
  IRowWrapper,
  ITouchedWrapper,
  IWrapWrapper,
} from '../definitions.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import { IPresetsSelectedElementEntity } from './selected-element-definition.interface';

/**
 * @presets-entity
 * @stable [23.05.2020]
 */
export interface IPresetsFlexLayoutEntity
  extends IPresetsSelectedElementEntity,
    IAlignItemsCenterWrapper,
    IAlignItemsEndWrapper,
    IAlignItemsStartWrapper,
    IAlignItemsStretchWrapper,
    IDisabledWrapper,
    IFullSizeWrapper,
    IFullWrapper,
    IJustifyContentCenterWrapper,
    IJustifyContentEndWrapper,
    IJustifyContentSpaceBetweenWrapper,
    INoShrinkWrapper,
    IRowWrapper,
    ITouchedWrapper,
    IWrapWrapper {
}

/**
 * @behavioral-entity
 * @stable [10.04.2020]
 */
export interface IBehavioralFlexLayoutEntity
  extends IOnClickWrapper {
}

/**
 * @props
 * @stable [10.04.2020]
 */
export interface IFlexLayoutProps
  extends IEnhancedGenericComponentProps,
    IPresetsFlexLayoutEntity,
    IBehavioralFlexLayoutEntity {
}

/**
 * @classes
 * @stable [10.04.2020]
 */
export enum FlexLayoutClassesEnum {
  FLEX = 'rac-flex',
  FLEX_ALIGN_ITEMS_CENTER = 'rac-flex-align-items-center',
  FLEX_ALIGN_ITEMS_END = 'rac-flex-align-items-end',
  FLEX_ALIGN_ITEMS_START = 'rac-flex-align-items-start',
  FLEX_ALIGN_ITEMS_STRETCH = 'rac-flex-align-items-stretch',
  FLEX_JUSTIFY_CONTENT_CENTER = 'rac-flex-justify-content-center',
  FLEX_JUSTIFY_CONTENT_END = 'rac-flex-justify-content-end',
  FLEX_JUSTIFY_CONTENT_SPACE_BETWEEN = 'rac-flex-justify-content-space-between',
  FLEX_NO_SHRINK = 'rac-flex-no-shrink',
  FLEX_WRAP = 'rac-flex-wrap',
}
