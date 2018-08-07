import { IFooterWrapper, ITopTitleWrapper, ISubTitleWrapper } from '../../../definitions.interface';
import { IContainerConfiguration } from '../../../configurations-definitions.interface';
import { IContainerEntity } from '../../../entities-definitions.interface';

/**
 * @stable [07.08.2018]
 */
export interface IFormLayoutEntity extends IContainerEntity {
}

/**
 * @stable [07.08.2018]
 */
export interface IFormLayoutConfiguration extends IContainerConfiguration,
                                                  IFooterWrapper,
                                                  ITopTitleWrapper,
                                                  ISubTitleWrapper {
}

/**
 * @stable [07.08.2018]
 */
export interface IFormLayoutProps extends IFormLayoutEntity,
                                          IFormLayoutConfiguration {
}
