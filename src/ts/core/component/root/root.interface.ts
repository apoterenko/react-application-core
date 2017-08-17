import { PureComponent } from 'react';

import { IBaseContainerInternalProps, IBaseContainerInternalState } from '../base/base.interface';
import { IRouterComputedMatch } from '../../router/router.interface';
import { IContainerWrapperCtor } from '../application/application.interface';

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
