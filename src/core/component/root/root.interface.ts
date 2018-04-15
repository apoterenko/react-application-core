import { IApplicationAccessConfig } from '../../permissions';
import {
  IChangesWrapper,
  IStateInitialChangesWrapper,
  IKeyValue,
  IStringPathWrapper,
  IStringSectionWrapper,
} from '../../definitions.interface';
import { IContainerClassEntity, IContainerEntity, IRootEntity } from '../../entities-definitions.interface';
import { IDefaultApplicationState } from '../../store';
import { IRouteConfiguration } from '../../configurations-definitions.interface';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                IStringSectionWrapper,
                                                IStringPathWrapper {
}

export interface IRootContainerInternalProps extends IContainerEntity,
                                                     IRouteConfiguration,
                                                     IStringSectionWrapper,
                                                     IStateInitialChangesWrapper<IDefaultApplicationState> {
  container?: IContainerClassEntity;
  accessConfig?: IApplicationAccessConfig;
}

export const INITIAL_APPLICATION_ROOT_STATE: IRootEntity = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
