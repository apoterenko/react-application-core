import {
  IContainerEntity,
  IQueryFilterWrapperEntity,
} from '../../../entities-definitions.interface';
import {
  IContainerConfiguration,
  IHeaderConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import { IFooterWrapper } from '../../../definitions.interface';

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerEntity extends IContainerEntity,
                                                       IQueryFilterWrapperEntity {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerConfiguration extends IContainerConfiguration,
                                                              IFooterWrapper,
                                                              IHeaderConfigurationWrapper {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerProps extends IDefaultLayoutContainerEntity,
                                                      IDefaultLayoutContainerConfiguration {
}
