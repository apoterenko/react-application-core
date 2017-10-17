import { Component, CSSProperties, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import { AnyT, IKeyValue } from '../../definition.interface';
import { IComponentPlugin, IComponentPluginCtor } from '../../component/plugin';
import { IApplicationLayoutState } from '../../component/layout';
import { IApplicationRootState } from '../../component/root';
import { IApplicationUserState } from '../../user';
import { IApplicationNotificationState } from '../../notification';
import { IApplicationDictionariesState } from '../../dictionary';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IBaseInternalProps {
  className?: string;
  progressMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  notification?: IApplicationNotificationState;
  dictionaries?: IApplicationDictionariesState;
  toClassName?(data: AnyT): string;
}

export interface IContainerInternalProps {
  routeParams?: IKeyValue;
  queryParams?: URLSearchParams;
  location?: Location;
}

export interface IBaseContainerInternalProps extends IContainerInternalProps, IBaseInternalProps {
  sectionName?: string;
  layout?: IApplicationLayoutState;
  root?: IApplicationRootState;
  user?: IApplicationUserState;
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

export type BaseContainerT = IBaseContainer<{}, {}>;
