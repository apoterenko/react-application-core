import {
  IAlignItemsCenterWrapper,
  IAlignItemsEndWrapper,
  IDisabledWrapper,
  IFullSizeWrapper,
  IFullWrapper,
  IInlineWrapper,
  IJustifyContentCenterWrapper,
  IJustifyContentEndWrapper,
  IJustifyContentSpaceBetweenWrapper,
  IOnClickWrapper,
  IRowWrapper,
  ITouchedWrapper,
  IWrapWrapper,
} from '../definitions.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';

/**
 * @generic-entity
 * @stable [10.04.2020]
 */
export interface IGenericFlexLayoutEntity
  extends IAlignItemsCenterWrapper,
    IAlignItemsEndWrapper,
    IDisabledWrapper,
    IFullSizeWrapper,
    IFullWrapper,
    IInlineWrapper,
    IJustifyContentCenterWrapper,
    IJustifyContentEndWrapper,
    IJustifyContentSpaceBetweenWrapper,
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
    IGenericFlexLayoutEntity,
    IBehavioralFlexLayoutEntity {
}
