import { ComponentLifecycle } from 'react';

import { IBaseComponent } from 'core/component/base';

export interface IComponentPluginCtor<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                                      TInternalProps,
                                      TInternalState> {
  new(component: TComponent): IComponentPlugin<TComponent, TInternalProps, TInternalState>;
}

export interface IComponentPlugin<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                                  TInternalProps,
                                  TInternalState>
    extends ComponentLifecycle<TInternalProps, TInternalState> {
}

export interface IPluginableComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                                      TInternalProps,
                                      TInternalState> {
  registerPlugin(componentPlugin: IComponentPluginCtor<TComponent, TInternalProps, TInternalState>)
      : IComponentPlugin<TComponent, TInternalProps, TInternalState>;
}
