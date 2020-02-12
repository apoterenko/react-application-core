import {
  IActiveValueWrapper,
  IActiveWrapper,
  IAllowSingleTabWrapper,
  IIconWrapper,
  IItemsWrapper,
  INameWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
  IRendererWrapper,
  ITabPanelConfigurationWrapper,
  ITabPanelWrapper,
  IValueWrapper,
  IWrappedWrapper,
  IWrapperClassNameWrapper,
} from '../definitions.interface';
import {
  IComponentProps,
  IContainerProps,
} from './props-definition.interface';
import { IBaseEvent } from './event-definition.interface';

/**
 * @generic-entity
 * @stable [31.08.2018]
 */
export interface IGenericTabEntity
  extends IActiveValueWrapper,
    IActiveWrapper,
    IIconWrapper,
    INameWrapper,
    IValueWrapper {
}

/**
 * @behavioral-entity
 * @stable [10.02.2020]
 */
export interface IBehavioralTabEntity {
}

/**
 * @props
 * @stable [10.02.2020]
 */
export interface ITabProps
  extends IComponentProps,
    IGenericTabEntity,
    IBehavioralTabEntity {
}

/**
 * @generic-entity
 * @stable [10.02.2020]
 */
export interface IGenericTabPanelEntity
  extends IActiveValueWrapper,
    IAllowSingleTabWrapper,
    IItemsWrapper<ITabProps[]>,
    IWrappedWrapper,
    IWrapperClassNameWrapper {
}

/**
 * @behavioral-entity
 * @stable [10.02.2020]
 */
export interface IBehavioralTabPanelEntity
  extends IOnClickWrapper<ITabProps>,
    IOnCloseWrapper<ITabProps>,
    IOnDeactivateWrapper<number>,
    IRendererWrapper<ITabProps, (event: IBaseEvent) => void> {
}

/**
 * @props
 * @stable [10.02.2020]
 */
export interface ITabPanelProps
  extends IComponentProps,
    IGenericTabPanelEntity,
    IBehavioralTabPanelEntity {
}

/**
 * @wrapper-entity
 * @stable [10.02.2020]
 */
export interface ITabPanelWrapperEntity
  extends ITabPanelWrapper<IGenericTabPanelEntity> {
}

/**
 * @configuration-entity
 * @stable [10.02.2020]
 */
export interface ITabPanelConfigurationEntity
  extends ITabPanelConfigurationWrapper<ITabPanelProps> {
}

/**
 * @generic-entity
 * @stable [12.02.2020]
 */
export interface IGenericTabPanelContainerEntity
  extends ITabPanelConfigurationEntity,
    ITabPanelWrapperEntity {
}

/**
 * @props
 * @stable [12.02.2020]
 */
export interface ITabPanelContainerProps
  extends IContainerProps,
    IGenericTabPanelContainerEntity {
}
