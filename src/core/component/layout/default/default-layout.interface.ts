import {
  IContainerProps,
  IQueryFilterWrapperEntity,
} from '../../../definition';
import {
  IHeaderConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IFooterRenderedWrapper,
  IFooterWrapper,
  IProgressWrapper,
  ISubHeaderRenderedWrapper,
} from '../../../definitions.interface';
/**
 * @stable [13.08.2018]
 */
export interface IDefaultLayoutContainerEntity extends IContainerProps,
                                                       IQueryFilterWrapperEntity,
                                                       IProgressWrapper {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerConfiguration
  extends IContainerProps,
    IFooterWrapper,
    ISubHeaderRenderedWrapper,
    IFooterRenderedWrapper,
    IHeaderConfigurationWrapper {
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
