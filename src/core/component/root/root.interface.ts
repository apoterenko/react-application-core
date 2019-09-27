import {
  ISectionWrapper,
  IAccessConfigurationWrapper,
} from '../../definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import {
  IRouteConfigEntity,
} from '../../configurations-definitions.interface';
import { IContainerProps } from '../../definition';

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfigEntity,
                                             ISectionWrapper,
                                             IAccessConfigurationWrapper<{}> {
  container?: IContainerClassEntity;
}

export const ROOT_SECTION = 'root';
