import {
  IItemsWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IRippableWrapper,
  IUseIndicatorWrapper,
  IActiveValueWrapper,
} from '../../definitions.interface';
import { IComponentConfiguration, ITabConfiguration } from '../../configurations-definitions.interface';
import { IComponentEntity, IComponent } from '../../entities-definitions.interface';

/**
 * @stable [14.08.2018]
 */
export interface ITabPanelConfiguration extends IComponentConfiguration,
                                                IUseIndicatorWrapper,
                                                IRippableWrapper,
                                                IOnCloseWrapper<ITabConfiguration>,
                                                IOnClickWrapper<ITabConfiguration> {
}

/**
 * @stable [14.08.2018]
 */
export interface ITabPanelEntity extends IComponentEntity,
                                         IItemsWrapper<ITabConfiguration[]>,
                                         IActiveValueWrapper {
}

/**
 * @stable [11.08.2018]
 */
export interface ITabPanelProps extends ITabPanelConfiguration,
                                        ITabPanelEntity {
}

/**
 * @stable [11.08.2018]
 */
export interface ITabPanelState extends IActiveValueWrapper {
}

/**
 * @stable [15.08.2018]
 */
export interface ITabPanel extends IComponent<ITabPanelProps, ITabPanelState> {
  onForward(): void;
  onBackward(): void;
}
