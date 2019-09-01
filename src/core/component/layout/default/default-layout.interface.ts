import {
  IContainerEntity,
} from '../../../entities-definitions.interface';
import {
  IQueryFilterWrapperEntity,
} from '../../../definition';
import {
  IContainerConfiguration,
  IHeaderConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IFooterWrapper,
  IProgressWrapper,
  IFooterRenderedWrapper,
} from '../../../definitions.interface';

/**
 * @stable [13.08.2018]
 */
export interface IDefaultLayoutContainerEntity extends IContainerEntity,
                                                       IQueryFilterWrapperEntity,
                                                       IProgressWrapper {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerConfiguration extends IContainerConfiguration,
                                                              IFooterWrapper,
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
