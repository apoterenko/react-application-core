import { IRouterComputedMatch } from '../../router';
import { IContainerWrapperCtor } from '../../component/application';
import { IBaseContainerInternalProps } from '../../component/base';
import { IApplicationAccessConfig } from '../../permission';

export interface IRootContainerAttributes {
  path?: string;
  exact?: boolean;
  computedMatch?: IRouterComputedMatch;
  beforeEnter?: () => void;
  afterEnter?: () => void;
}

export interface IRootContainerInternalProps extends IBaseContainerInternalProps,
                                                     IRootContainerAttributes {
  container?: IContainerWrapperCtor;
  accessConfig?: IApplicationAccessConfig;
}

export interface IApplicationRootState {
  path: string;
}

export interface IApplicationRootWrapperState {
  root: IApplicationRootState;
}

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
