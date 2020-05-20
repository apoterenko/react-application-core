import {
  IGenericContainerProps,
  IHeaderConfigurationEntity,
  IQueryFilterEntity,
  ISubHeaderConfigurationEntity,
} from '../../../definition';
import {
  IFooterWrapper,
  IProgressWrapper,
  ISubHeaderRenderedWrapper,
} from '../../../definitions.interface';

/**
 * @stable [13.08.2018]
 */
export interface IDefaultLayoutContainerEntity extends IGenericContainerProps,
                                                       IQueryFilterEntity,
                                                       IProgressWrapper {
}

/**
 * @stable [31.05.2018]
 */
export interface IDefaultLayoutContainerProps
  extends IDefaultLayoutContainerEntity,
    IFooterWrapper,
    IHeaderConfigurationEntity,
    ISubHeaderRenderedWrapper,
    ISubHeaderConfigurationEntity {
}

/**
 * @stable [11.02.2019]
 */
export interface IDefaultLayoutContainerState {
  notifications?: boolean;
}
