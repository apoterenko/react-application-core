import { IBaseComponentInternalProps } from '../base';
import { IListConfiguration, IListConfigurationWrapper } from '../../configurations-definitions.interface';
import { IListEntity, IListWrapperEntity, IContainerEntity } from '../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export interface IListInternalProps extends IBaseComponentInternalProps,
                                            IListConfiguration,
                                            IListEntity {
}

/* @stable - 31.03.2018 */
export interface IListContainerProps extends IContainerEntity,
                                             IListConfigurationWrapper,
                                             IListWrapperEntity {
}

/* @stable - 31.03.2018 */
export type ListWrapperEntityResolverT <TApplicationState> = (state: TApplicationState) => IListWrapperEntity;
