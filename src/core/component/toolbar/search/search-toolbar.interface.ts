import {
  IFilterConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IGenericContainerProps,
  IQueryFilterEntity,
  IUniversalContainerEntity,
} from '../../../definition';

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerEntity extends IUniversalContainerEntity,
                                                                IQueryFilterEntity {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalSearchToolbarContainerConfiguration extends IUniversalContainerEntity,
                                                                       IFilterConfigurationWrapper {
}

/**
 * @props
 * @stable [18.05.2018]
 */
export interface IGenericSearchToolbarContainerProps
  extends IGenericContainerProps,
    IUniversalSearchToolbarContainerEntity,
    IUniversalSearchToolbarContainerConfiguration {
}
