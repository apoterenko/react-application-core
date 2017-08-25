import { Component } from 'react';

import { IKeyValue } from 'core/definition.interface';

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
}

export interface IBaseComponentInternalState {
}

export interface IBaseContainer<TInternalProps extends IBaseContainerInternalProps,
                                TInternalState extends IBaseContainerInternalState>
    extends Component<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}
