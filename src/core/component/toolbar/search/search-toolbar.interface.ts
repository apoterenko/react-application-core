import {
  IFilterConfiguration,
  IFilterConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IGenericActiveQueryEntity,
  IGenericContainerProps,
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
 * @props
 * @stable [18.05.2018]
 */
export interface IGenericSearchToolbarContainerProps
  extends IGenericContainerProps,
    IUniversalSearchToolbarContainerEntity,
    IUniversalSearchToolbarContainerConfiguration {
}
