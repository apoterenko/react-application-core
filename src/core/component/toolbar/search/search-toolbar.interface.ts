import {
  IFilterConfiguration,
  IFilterConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IGenericActiveQueryEntity,
  IQueryFilterEntity,
  IUniversalComponentEntity,
  IUniversalContainerEntity,
  ToolbarToolsEnum,
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
export interface IUniversalSearchToolbarConfiguration extends IUniversalComponentEntity,
                                                              IFilterConfiguration,
                                                              IOnActivateWrapper,
                                                              IOnDeactivateWrapper,
                                                              IOnOpenWrapper,
                                                              IOnApplyWrapper,
                                                              IFullWrapper,
                                                              IOnRefreshWrapper,
                                                              IOnActionClickWrapper<ToolbarToolsEnum>,
                                                              IOnChangeWrapper<string> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarEntity extends IGenericActiveQueryEntity {
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
                                                                IQueryFilterEntity {
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
