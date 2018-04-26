import { IAccessConfig } from '../../permissions';
import {
  IChangesWrapper,
  IStateInitialChangesWrapper,
  IKeyValue,
  IStringPathWrapper,
  IStringSectionWrapper,
} from '../../definitions.interface';
import {
  IContainerClassEntity,
  IContainerEntity,
  IRootEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';
import { IRouteConfiguration } from '../../configurations-definitions.interface';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                IStringSectionWrapper,
                                                IStringPathWrapper {
}

export interface IRootContainerInternalProps extends IContainerEntity,
                                                     IRouteConfiguration,
                                                     IStringSectionWrapper,
                                                     IStateInitialChangesWrapper<IApplicationStoreEntity> {
  container?: IContainerClassEntity;
  accessConfig?: IAccessConfig;
}

export const INITIAL_APPLICATION_ROOT_STATE: IRootEntity = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
