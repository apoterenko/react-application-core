import { Component } from 'react';

export interface IBaseContainerProps {
	location?: Location;
	routeParams?: any;
}

export interface IBaseComponent<TInternalProps, TInternalState>
	extends Component<TInternalProps, TInternalState> {
}

export interface IBaseContainer<TInternalProps extends IBaseContainerProps, TInternalState>
	extends IBaseComponent<TInternalProps, TInternalState> {
	sectionName: string;
	dispatch(type: string, data?: any): void;
}
