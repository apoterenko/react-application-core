import { IRouteOptions } from '../../router';
import { IContainerWrapperCtor } from '../../component/application';
import { IBaseContainerInternalProps } from '../../component/base';
import { IApplicationAccessConfig } from '../../permission';
import {
  IChangeable,
  IInitialChangesable,
  IKeyValue,
  IPathable,
  ISectionable,
} from '../../definition.interface';

export interface IRootUpdatePathPayload extends IChangeable<IKeyValue>,
                                                ISectionable,
                                                IPathable {
}

export interface IRootContainerInternalProps extends IBaseContainerInternalProps,
                                                     IRouteOptions,
                                                     ISectionable,
                                                     IInitialChangesable {
  container?: IContainerWrapperCtor;
  accessConfig?: IApplicationAccessConfig;
}

export interface IApplicationRootState extends IPathable {
}

export interface IApplicationRootWrapperState {
  root: IApplicationRootState;
}

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
