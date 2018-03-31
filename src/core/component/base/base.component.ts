import { PureComponent } from 'react';

import { BasicEventT } from '../../definitions.interface';
import { lazyInject, DI_TYPES } from '../../di';
import { IUIFactory } from '../factory';
import {
  ComponentPluginFactoryT,
  IComponentPlugin,
  IComponentPluginCtor,
} from '../plugin';
import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseComponentCtor,
} from './base.interface';
import { ApplicationTranslatorT } from '../../translation';
import { IApplicationSettings } from '../../settings';

export class BaseComponent<TComponent extends IBaseComponent<TInternalProps, TInternalState>,
                           TInternalProps extends IBaseComponentInternalProps,
                           TInternalState>
    extends PureComponent<TInternalProps, TInternalState>
    implements IBaseComponent<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;
  @lazyInject(DI_TYPES.Settings) protected applicationSettings: IApplicationSettings;
  @lazyInject(DI_TYPES.UIPlugins) private uiPlugins: Map<IBaseComponentCtor, ComponentPluginFactoryT>;

  private plugins: Array<IComponentPlugin<TComponent, TInternalProps, TInternalState>> = [];

  constructor(props: TInternalProps) {
    super(props);

    const dynamicPluginFactory = this.uiPlugins.get(this.constructor as IBaseComponentCtor);
    if (dynamicPluginFactory) {
      this.plugins.push(dynamicPluginFactory(this));
    }

    [].concat(this.props.plugins || []).forEach((plugin) => this.registerPlugin(plugin));
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

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillReceiveProps && plugin.componentWillReceiveProps(nextProps, nextContext));
  }

  public componentDidUpdate(prevProps: Readonly<TInternalProps>, prevState: Readonly<TInternalState>, prevContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentDidUpdate && plugin.componentDidUpdate(prevProps, prevState, prevContext));
  }

  public componentWillUpdate(nextProps: Readonly<TInternalProps>, nextState: Readonly<TInternalState>, nextContext: {}): void {
    this.plugins.forEach((plugin) =>
        plugin.componentWillUpdate && plugin.componentWillUpdate(nextProps, nextState, nextContext));
  }

  public registerPlugin(componentPlugin: IComponentPluginCtor<TComponent, TInternalProps, TInternalState>): IComponentPlugin<TComponent, TInternalProps, TInternalState> {
    const plugin = Reflect.construct(componentPlugin, [this]);
    this.plugins.push(plugin);
    return plugin;
  }

  public stopEvent(event: BasicEventT): void {
    if (event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.stopPropagation();
      event.nativeEvent.preventDefault();
    }
    event.stopPropagation();
    event.preventDefault();
  }

  public get self(): HTMLElement {
    return this.refs.self as HTMLElement;
  }
}
