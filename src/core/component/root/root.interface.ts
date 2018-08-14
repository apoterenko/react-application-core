import {
  IChangesWrapper,
  IStateInitialChangesWrapper,
  IKeyValue,
  IStringPathWrapper,
  ISectionWrapper,
} from '../../definitions.interface';
import {
  IContainerClassEntity,
  IRootEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';
import {
  IRouteConfiguration,
  IAccessConfiguration,
  IAccessConfigurationWrapper,
} from '../../configurations-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                ISectionWrapper,
                                                IStringPathWrapper {
}

export interface IRootContainerProps extends IContainerProps,
                                             IRouteConfiguration,
                                             ISectionWrapper,
                                             IStateInitialChangesWrapper<IApplicationStoreEntity>,
                                             IAccessConfigurationWrapper<IAccessConfiguration> {
  container?: IContainerClassEntity;
}

export const INITIAL_APPLICATION_ROOT_STATE: IRootEntity = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
