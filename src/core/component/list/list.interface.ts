import { IBaseContainerInternalProps, IBaseComponentInternalProps } from '../base';
import { IListConfiguration, IListConfigurationWrapper } from '../../configurations-definitions.interface';
import { IListEntity, IListWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export interface IListInternalProps extends IBaseComponentInternalProps,
                                            IListConfiguration,
                                            IListEntity {
}

/* @stable - 31.03.2018 */
export interface IListContainerInternalProps extends IBaseContainerInternalProps,
                                                     IListConfigurationWrapper,
                                                     IListWrapperEntity {
}

/* @stable - 31.03.2018 */
export type ListWrapperEntityResolverT <TApplicationState> = (state: TApplicationState) => IListWrapperEntity;
