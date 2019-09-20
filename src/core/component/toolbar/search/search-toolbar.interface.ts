import {
  IFilterConfiguration,
  IReactComponentConfiguration,
  IFilterConfigurationWrapper,
  ToolbarActionEnum,
} from '../../../configurations-definitions.interface';
import {
  IUniversalContainerEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
} from '../../../definition';
import {
  IOnApplyWrapper,
  IOnActivateWrapper,
  IOnDeactivateWrapper,
  IOnChangeWrapper,
  IOnOpenWrapper,
  IOnRefreshWrapper,
  IFullWrapper,
} from '../../../definitions.interface';
import { IOnActionClickWrapper } from '../../../react-definitions.interface';
import { IWebComponentEntity } from '../../../definition';

/**
 * @stable [13.09.2018]
 */
export interface IUniversalSearchToolbarConfiguration extends IReactComponentConfiguration,
                                                              IFilterConfiguration,
                                                              IOnActivateWrapper,
                                                              IOnDeactivateWrapper<() => void>,
                                                              IOnOpenWrapper,
                                                              IOnApplyWrapper,
                                                              IFullWrapper,
                                                              IOnRefreshWrapper,
                                                              IOnActionClickWrapper<ToolbarActionEnum>,
                                                              IOnChangeWrapper<string> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarEntity extends IQueryFilterEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarProps extends IUniversalSearchToolbarEntity,
                                                      IUniversalSearchToolbarConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarConfiguration extends IUniversalSearchToolbarConfiguration,
                                                     IWebComponentEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarEntity extends IUniversalSearchToolbarEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarProps extends ISearchToolbarConfiguration,
                                             ISearchToolbarEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerEntity extends IUniversalContainerEntity,
                                                                IQueryFilterWrapperEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerConfiguration extends IUniversalContainerEntity,
                                                                       IFilterConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerProps extends IUniversalSearchToolbarContainerEntity,
                                                               IUniversalSearchToolbarContainerConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerEntity extends IUniversalSearchToolbarContainerEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerConfiguration extends IUniversalSearchToolbarContainerConfiguration,
                                                              IWebComponentEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerProps extends ISearchToolbarContainerEntity,
                                                      ISearchToolbarContainerConfiguration {
}
