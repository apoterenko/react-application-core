import { Component, CSSProperties, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import { AnyT, IKeyValue } from 'core/definition.interface';
import { IComponentPlugin, IComponentPluginCtor } from 'core/component/plugin';

export type ComponentPluginCtorT = IComponentPluginCtor<IBaseComponent<IBaseComponentInternalProps, IBaseComponentInternalState>,
                                                        IBaseComponentInternalProps,
                                                        IBaseComponentInternalState>;

export interface IBaseContainerInternalProps {
  location?: Location;
  routeParams?: IKeyValue;
  queryParams?: URLSearchParams;
  sectionName?: string;
}

export interface IBaseContainerInternalState {
}

export interface IBaseComponent<TInternalProps, TInternalState>
    extends Component<TInternalProps, TInternalState> {
  stopEvent(event: SyntheticEvent<AnyT>): void;
  registerPlugin(componentPlugin: IComponentPluginCtor<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>):
      IComponentPlugin<IBaseComponent<TInternalProps, TInternalState>, TInternalProps, TInternalState>;
}

export interface IBaseComponentInternalState {
}

export interface IBaseComponentInternalProps {
  className?: string;
  style?: CSSProperties;
  plugins?: ComponentPluginCtorT|ComponentPluginCtorT[],
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}
