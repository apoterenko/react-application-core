import { IRouterComputedMatch } from 'core/router';
import { IContainerWrapperCtor } from 'core/component/application';
import { IBaseContainerInternalProps } from 'core/component/base';
import { IApplicationAccessConfig } from 'core/permission';

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

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null,
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
