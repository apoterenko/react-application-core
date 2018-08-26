import { IContainerProps } from '../../props-definitions.interface';
import { IFilterFormWrapperEntity, IComponentEntity } from '../../entities-definitions.interface';
import { IFieldsConfigurationsWrapper, IComponentConfiguration } from '../../configurations-definitions.interface';
import { IOnRemoveWrapper } from '../../definitions.interface';

/**
 * @stable [26.08.2018]
 */
export interface IChipsFilterEntity extends IComponentEntity,
                                            IFilterFormWrapperEntity {
}

/**
 * @stable [26.08.2018]
 */
export interface IChipsFilterConfiguration extends IComponentConfiguration,
                                                   IFieldsConfigurationsWrapper,
                                                   IOnRemoveWrapper<string> {
}

/**
 * @stable [26.08.2018]
 */
export interface IChipsFilterProps extends IChipsFilterEntity,
                                           IChipsFilterConfiguration {
}

/**
 * @stable [26.08.2018]
 */
export interface IChipsFilterContainerProps extends IContainerProps,
                                                    IFilterFormWrapperEntity {
}
