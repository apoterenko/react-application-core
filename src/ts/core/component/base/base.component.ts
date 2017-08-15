import * as React from 'react';

import { lazyInject } from '../../di/di.module';
import { I18nService } from '../../i18n/i18n.interface';
import { DI_TYPES } from '../../di/di.interface';
import {
  IComponentPlugin,
  IComponentPluginCtor,
  IPluginableComponent
} from '../plugin/component-plugin.interface';
import { IBaseComponent } from './base.interface';

export class BaseComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                           TInternalProps,
                           TInternalState>
    extends React.Component<TInternalProps, TInternalState>
    implements IBaseComponent<TInternalProps, TInternalState>,
               IPluginableComponent<TComponent, TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.I18n) protected i18n: I18nService;

  private plugins: IComponentPlugin<TComponent, TInternalProps, TInternalState>[] = [];

  componentDidMount(): void {
    this.plugins.forEach(plugin => plugin.componentDidMount && plugin.componentDidMount());
  }

  componentWillMount(): void {
    this.plugins.forEach(plugin => plugin.componentWillMount && plugin.componentWillMount());
  }

  componentWillUnmount(): void {
    this.plugins.forEach(plugin => plugin.componentWillUnmount && plugin.componentWillUnmount());
  }

  componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: any): void {
    this.plugins.forEach(plugin =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  componentDidUpdate(prevProps: Readonly<TInternalProps>, prevState: Readonly<TInternalState>, prevContext: any): void {
    this.plugins.forEach(plugin =>
        plugin.componentDidUpdate && plugin.componentDidUpdate(prevProps, prevState, prevContext));
  }

  componentWillUpdate(nextProps: Readonly<TInternalProps>, nextState: Readonly<TInternalState>, nextContext: any): void {
    this.plugins.forEach(plugin =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  registerPlugin(componentPlugin: IComponentPluginCtor<TComponent, TInternalProps, TInternalState>): IComponentPlugin<TComponent, TInternalProps, TInternalState> {
    const plugin = Reflect.construct(componentPlugin, [this]);
    this.plugins.push(plugin);
    return plugin;
  }
}
