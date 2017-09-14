import { Component, CSSProperties, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import { AnyT, IKeyValue } from 'core/definition.interface';
import { IComponentPlugin, IComponentPluginCtor } from 'core/component/plugin';
import { IApplicationLayoutState } from 'core/component/layout';
import { IApplicationRootState } from 'core/component/root';
import { IApplicationUserState } from 'core/user';
import { IApplicationNotificationState } from 'core/notification';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IBaseInternalProps {
  className?: string;
}

export interface IBaseContainerInternalProps extends IBaseInternalProps {
  location?: Location;
  routeParams?: IKeyValue;
  queryParams?: URLSearchParams;
  sectionName?: string;
  layout?: IApplicationLayoutState;
  root?: IApplicationRootState;
  user?: IApplicationUserState;
  notification?: IApplicationNotificationState;
}

export interface IBaseContainerInternalState {
}

export interface IBaseComponent<TInternalProps, TInternalState>
    extends Component<TInternalProps, TInternalState> {
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalProps extends IBaseInternalProps {
  persistent?: boolean;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[];
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}
