import {
  IFilterConfiguration,
  IUniversalComponentConfiguration,
  IUniversalContainerConfiguration,
  IFilterConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IQueryFilterEntity,
  IUniversalContainerEntity,
  IQueryFilterWrapperEntity,
} from '../../../entities-definitions.interface';
import { IComponentProps } from '../../../props-definitions.interface';
import {
  IOnApplyWrapper,
  IOnActivateWrapper,
  IOnChangeWrapper,
  IOnOpenWrapper,
} from '../../../definitions.interface';

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarConfiguration extends IUniversalComponentConfiguration,
                                                              IOnActivateWrapper,
                                                              IOnOpenWrapper,
                                                              IOnApplyWrapper,
                                                              IOnChangeWrapper<string> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarProps extends IUniversalSearchToolbarConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerEntity extends IUniversalContainerEntity,
                                                                IQueryFilterWrapperEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerConfiguration extends IUniversalContainerConfiguration,
                                                                       IFilterConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerProps extends IUniversalSearchToolbarContainerEntity,
                                                               IUniversalSearchToolbarContainerConfiguration {
}

export interface ISearchToolbarProps extends IComponentProps,
                                             IQueryFilterEntity,
                                             IFilterConfiguration {
  onActivate?(): void;
  onChange?(value: string): void;
  onOpen?(): void;
  onApply?(): void;
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerEntity extends IUniversalSearchToolbarContainerEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerConfiguration extends IUniversalSearchToolbarContainerConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface ISearchToolbarContainerProps extends ISearchToolbarContainerEntity,
                                                      ISearchToolbarContainerConfiguration {
}
