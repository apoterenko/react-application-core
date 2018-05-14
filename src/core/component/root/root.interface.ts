import {
  IChangesWrapper,
  IStateInitialChangesWrapper,
  IKeyValue,
  IStringPathWrapper,
  IStringSectionWrapper,
} from '../../definitions.interface';
import {
  IContainerClassEntity,
  IRootEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';
import { IRouteConfiguration, IAccessConfiguration } from '../../configurations-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                IStringSectionWrapper,
                                                IStringPathWrapper {
}

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfiguration,
                                             IStringSectionWrapper,
                                             IStateInitialChangesWrapper<IApplicationStoreEntity> {
  container?: IContainerClassEntity;
  accessConfig?: IAccessConfiguration;
}

export const INITIAL_APPLICATION_ROOT_STATE: IRootEntity = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
