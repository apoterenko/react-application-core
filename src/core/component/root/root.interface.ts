import {
  ISectionWrapper,
} from '../../definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import {
  IRouteConfiguration,
  IAccessConfiguration,
  IAccessConfigurationWrapper,
} from '../../configurations-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfiguration,
                                             ISectionWrapper,
                                             IAccessConfigurationWrapper<IAccessConfiguration> {
  container?: IContainerClassEntity;
}

export const ROOT_SECTION = 'root';
