import { PureComponent } from 'react';

import { IRouterComputedMatch } from 'core/router';
import { IContainerWrapperCtor } from 'core/component/application';
import { IBaseContainerInternalProps, IBaseContainerInternalState } from 'core/component/base';

export interface IRootContainerInternalProps extends IBaseContainerInternalProps {
  container?: IContainerWrapperCtor<PureComponent<IBaseContainerInternalProps, IBaseContainerInternalState>,
                                    IBaseContainerInternalProps,
                                    IBaseContainerInternalState>;
  exact?: any;
  path?: string;
  computedMatch?: IRouterComputedMatch;
  beforeEnter?: () => void;
  afterEnter?: () => void;
}

export interface IApplicationRootState {
  path: string;
}

export const INITIAL_APPLICATION_ROOT_STATE: IApplicationRootState = {
  path: null
};

export const ROOT_SECTION = 'root';
export const ROOT_PATH_UPDATE_ACTION_TYPE = 'path.update';
