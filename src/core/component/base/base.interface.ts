import { Component, CSSProperties, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import { AnyT, IKeyValue, IProgressWrapper, IStringTitleWrapper } from '../../definition.interface';
import { IComponentPlugin, IComponentPluginCtor } from '../../component/plugin';
import { IApplicationLayoutState } from '../../component/layout';
import { IApplicationRootState } from '../../component/root';
import { IApplicationUserState } from '../../user';
import { IApplicationNotificationState } from '../../notification';
import { IApplicationTransportState } from '../../transport';
import { IChannelWrapperEntity } from '../../entities-definitions.interface';
import { IClassNameWrapper } from '../../definition.interface';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IBaseInternalProps extends IClassNameWrapper,
                                            IStringTitleWrapper,
                                            IProgressWrapper {
  progressMessage?: string;
  emptyMessage?: string;
  emptyDataMessage?: string;
  message?: string;
  errorMessage?: string;
}

export interface IContainerInternalProps {
  routeParams?: IKeyValue;
  queryParams?: URLSearchParams;
  location?: Location;
}

export interface IBaseContainerInternalProps extends IContainerInternalProps,
                                                     IBaseInternalProps,
                                                     IChannelWrapperEntity {
  sectionName?: string;
  notification?: IApplicationNotificationState;
  layout?: IApplicationLayoutState;
  root?: IApplicationRootState;
  user?: IApplicationUserState;
  transport?: IApplicationTransportState;
}

export interface IBaseContainerInternalState {
}

export interface IBaseComponent<TInternalProps, TInternalState>
    extends Component<TInternalProps, TInternalState> {
  self: HTMLElement;
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalProps extends IBaseInternalProps {
  style?: CSSProperties;
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[];
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}

export interface IBaseComponentCtor { new (...args): BaseComponentT; }

export type BaseContainerT = IBaseContainer<{}, {}>;
export type BaseComponentT = IBaseComponent<{}, {}>;
