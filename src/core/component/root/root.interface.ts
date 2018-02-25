import { IRouteOptions } from '../../router';
import { IContainerWrapperCtor } from '../application';
import { IBaseContainerInternalProps } from '../base';
import { IApplicationAccessConfig } from '../../permissions';
import {
  IChangesWrapper,
  IInitialChangesable,
  IKeyValue,
  IPathWrapper,
  ISectionWrapper,
} from '../../definition.interface';
import { ApplicationStateT } from '../../store';

export interface IRootUpdatePathPayload extends IChangesWrapper<IKeyValue>,
                                                ISectionWrapper,
                                                IPathWrapper {
}

export interface IRootContainerInternalProps extends IBaseContainerInternalProps,
                                                     IRouteOptions,
                                                     ISectionWrapper,
                                                     IInitialChangesable<ApplicationStateT> {
  container?: IContainerWrapperCtor;
  accessConfig?: IApplicationAccessConfig;
}

export interface IApplicationRootState extends IPathWrapper {
}

export interface IApplicationRootWrapperState {
  root: IApplicationRootState;
}

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
