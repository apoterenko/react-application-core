import { ComponentLifecycle } from 'react';

import { IBaseComponent } from '../base/base.interface';

export interface IComponentPluginCtor<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
										TInternalProps,
										TInternalState> {
	new(component: TComponent): IComponentPlugin<TComponent, TInternalProps, TInternalState>;
}

export interface IComponentPlugin<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
									TInternalProps,
									TInternalState>
	extends ComponentLifecycle<TInternalProps, TInternalState> {
	template?: JSX.Element;
}

export interface IPluginableComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
										TInternalProps,
										TInternalState> {
	registerPlugin(componentPlugin: IComponentPluginCtor<TComponent, TInternalProps, TInternalState>)
		: IComponentPlugin<TComponent, TInternalProps, TInternalState>;
}
