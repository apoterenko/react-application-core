import { IListConfiguration, IListConfigurationWrapper } from '../../configurations-definitions.interface';
import { IListEntity, IListWrapperEntity, IContainerEntity } from '../../entities-definitions.interface';

/* @stable [23.04.2018] */
export interface IListProps extends IListConfiguration,
                                    IListEntity {
}

/* @stable - 31.03.2018 */
export interface IListContainerProps extends IContainerEntity,
                                             IListConfigurationWrapper,
                                             IListWrapperEntity {
}
