import { ComponentLifecycle } from 'react';

import { BaseComponentT, IBaseComponent } from '../../component/base';

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

export type ComponentPluginT = IComponentPlugin<BaseComponentT, {}, {}>;
export type ComponentPluginFactoryT = (component: BaseComponentT) => ComponentPluginT;
