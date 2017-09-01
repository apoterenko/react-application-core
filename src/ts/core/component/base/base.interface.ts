import { Component, SyntheticEvent } from 'react';
import * as URLSearchParams from 'url-search-params';

import { AnyT, IKeyValue } from 'core/definition.interface';

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
}

export interface IBaseComponentInternalState {
}

export interface IBaseComponentInternalProps {
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}
