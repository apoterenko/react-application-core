import {
  IContainerProps,
  IHeaderConfigurationEntity,
  IQueryFilterEntity,
} from '../../../definition';
import {
  IFooterWrapper,
  IProgressWrapper,
  ISubHeaderConfigurationWrapper,
  ISubHeaderRenderedWrapper,
} from '../../../definitions.interface';
import { ISubHeaderConfiguration } from '../../../configurations-definitions.interface';  // TODO

/**
 * @stable [13.08.2018]
 */
export interface IDefaultLayoutContainerEntity extends IContainerProps,
                                                       IQueryFilterEntity,
                                                       IProgressWrapper {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerConfiguration
  extends IContainerProps,
    IFooterWrapper,
    IHeaderConfigurationEntity,
    ISubHeaderRenderedWrapper,
    ISubHeaderConfigurationWrapper<ISubHeaderConfiguration> {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerProps extends IDefaultLayoutContainerEntity,
                                                      IDefaultLayoutContainerConfiguration {
}

/**
 * @stable [11.02.2019]
 */
export interface IDefaultLayoutContainerState {
  notifications?: boolean;
}
