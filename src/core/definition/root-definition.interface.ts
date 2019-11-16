import {
  IRouteEntity,
} from './router-definition.interface';
import {
  IAccessConfigurationWrapper,
  IContainerWrapper,
} from '../definitions.interface';
import { IContainerProps } from './props-definition.interface';
import { IContainerCtor } from './container-definition.interface';

/**
 * @stable [16.11.2019]
 */
export interface IBaseRootContainerProps
  extends IContainerProps,
    IRouteEntity,
    IAccessConfigurationWrapper<{}>,
    IContainerWrapper<IContainerCtor> {
}
