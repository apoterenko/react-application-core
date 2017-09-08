import { PureComponent } from 'react';
import * as ramda from 'ramda';

import { BasicEventT } from 'core/definition.interface';
import { lazyInject, DI_TYPES } from 'core/di';
import { IComponentPlugin, IComponentPluginCtor } from 'core/component/plugin';

import { IBaseComponent, IBaseComponentInternalProps } from './base.interface';

export class BaseComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                           TInternalProps extends IBaseComponentInternalProps,
                           TInternalState>
    extends PureComponent<TInternalProps, TInternalState>
    implements IBaseComponent<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Translate) protected t: (k: string) => string;

  private plugins: Array<IComponentPlugin<TComponent, TInternalProps, TInternalState>> = [];

  constructor(props: TInternalProps) {
    super(props);
    if (!ramda.isNil(this.props.plugins)) {
      [].concat(this.props.plugins).forEach((plugin) => this.registerPlugin(plugin));
    }
  }

  public componentDidMount(): void {
    this.plugins.forEach((plugin) => plugin.componentDidMount && plugin.componentDidMount());
  }

  public componentWillMount(): void {
    this.plugins.forEach((plugin) => plugin.componentWillMount && plugin.componentWillMount());
  }

  public componentWillUnmount(): void {
    this.plugins.forEach((plugin) => plugin.componentWillUnmount && plugin.componentWillUnmount());
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: any): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  public componentDidUpdate(prevProps: Readonly<TInternalProps>, prevState: Readonly<TInternalState>, prevContext: any): void {
    this.plugins.forEach((plugin) =>
        plugin.componentDidUpdate && plugin.componentDidUpdate(prevProps, prevState, prevContext));
  }

  public componentWillUpdate(nextProps: Readonly<TInternalProps>, nextState: Readonly<TInternalState>, nextContext: any): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  public registerPlugin(componentPlugin: IComponentPluginCtor<TComponent, TInternalProps, TInternalState>): IComponentPlugin<TComponent, TInternalProps, TInternalState> {
    const plugin = Reflect.construct(componentPlugin, [this]);
    this.plugins.push(plugin);
    return plugin;
  }

  public stopEvent(event: BasicEventT): void {
    event.nativeEvent.stopImmediatePropagation();
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
  }
}
