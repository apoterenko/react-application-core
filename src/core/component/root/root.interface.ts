import { IBaseContainerInternalProps } from '../base';
import { IApplicationAccessConfig } from '../../permissions';
import {
  IChangesWrapper,
  IStateInitialChangesWrapper,
  IKeyValue,
  IStringPathWrapper,
  IStringSectionWrapper,
} from '../../definitions.interface';
import { IComponentClassEntity } from '../../entities-definitions.interface';
import { IDefaultApplicationState } from '../../store';
import { IRouteConfiguration } from '../../configurations-definitions.interface';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                IStringSectionWrapper,
                                                IStringPathWrapper {
}

export interface IRootContainerInternalProps extends IBaseContainerInternalProps,
                                                     IRouteConfiguration,
                                                     IStringSectionWrapper,
                                                     IStateInitialChangesWrapper<IDefaultApplicationState> {
  container?: IComponentClassEntity;
  accessConfig?: IApplicationAccessConfig;
}

export interface IApplicationRootState extends IStringPathWrapper {
}

export interface IApplicationRootWrapperState {
  root: IApplicationRootState;
}

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
