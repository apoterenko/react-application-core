import {
  ISectionWrapper,
  IAccessConfigurationWrapper,
} from '../../definitions.interface';
import {
  IRouteConfigEntity,
} from '../../configurations-definitions.interface';
import {
  IContainerCtor,
  IContainerProps,
} from '../../definition';

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfigEntity,
                                             ISectionWrapper,
                                             IAccessConfigurationWrapper<{}> {
  container?: IContainerCtor;
}

export const ROOT_SECTION = 'root';
