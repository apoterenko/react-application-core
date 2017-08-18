import { Component } from 'react';

export interface IBaseContainerInternalProps {
  location?: Location;
  routeParams?: any;
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
    extends IBaseComponent<TInternalProps, TInternalState> {
  sectionName: string;
  dispatch(type: string, data?: any): void;
}
