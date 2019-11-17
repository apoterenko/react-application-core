import { ILifeCycleEntity } from './entity-definition.interface';
import {
  IApplicationWrapper,
  IAuthorizedWrapper,
  IPathWrapper,
  IReadyWrapper,
} from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface IApplicationEntity
  extends ILifeCycleEntity,
    IAuthorizedWrapper,
    IReadyWrapper,
    IPathWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface IApplicationWrapperEntity
  extends IApplicationWrapper<IApplicationEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_APPLICATION_ENTITY = Object.freeze<IApplicationEntity>({
  ready: false,         // By default the application is not ready because an async token
  authorized: false,    // By default the application is not authorized because an async token
  progress: false,
  error: null,
  path: null,
});
