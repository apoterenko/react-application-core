import { Component, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import {
  AnyT,
  IKeyValue,
  IStringTitleWrapper,
  IClassNameWrapper,
  ICssStyleWrapper,
  IHtmlElementSelfWrapper,
} from '../../definitions.interface';
import { IComponentPlugin, IComponentPluginCtor } from '../../component/plugin';
import { IApplicationLayoutState } from '../../component/layout';
import { IApplicationRootState } from '../../component/root';
import { IApplicationUserState } from '../../user';
import { IApplicationNotificationState } from '../../notification';
import { IApplicationTransportState } from '../../transport';
import { IChannelWrapperEntity } from '../../entities-definitions.interface';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, {}>,
                                                        IBaseComponentInternalProps,
                                                        {}>;

export interface IBaseInternalProps extends IClassNameWrapper,
                                            IStringTitleWrapper {
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
    extends Component<TInternalProps, TInternalState>,
            IHtmlElementSelfWrapper {
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalProps extends IBaseInternalProps,
                                                     ICssStyleWrapper {
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[];
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}

/* @stable - 04.04.2018 */
export interface IDefaultBaseComponent extends IBaseComponent<{}, {}> {
}

/* @stable - 10.04.2018 */
export interface IDefaultBaseContainer extends IBaseContainer<{}, {}> {
}

export interface IBaseComponentCtor { new (...args): IDefaultBaseComponent; }
