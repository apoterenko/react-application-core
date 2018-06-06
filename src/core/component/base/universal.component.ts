import { Component } from 'react';

import { cancelEvent } from '../../util';
import { DI_TYPES, staticInjector } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IApplicationSettings } from '../../settings';
import { IDateConverter, INumberConverter } from '../../converter';
import {
  IUniversalComponentEntity,
  IUniversalComponentClassEntity,
  IUniversalComponentPlugin,
  IUniversalComponent,
  UniversalComponentPluginFactoryT,
  IUniversalComponentPluginClassEntity,
} from '../../entities-definitions.interface';
import { IBasicEvent } from '../../definitions.interface';
import { IUniversalComponentProps } from '../../props-definitions.interface';
import { IUIFactory } from '../factory/factory.interface';

export class UniversalComponent<TComponent extends IUniversalComponent<TProps, TState>,
                                TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {}>
  extends Component<TProps, TState>
  implements IUniversalComponent<TProps, TState> {

  protected plugins: IUniversalComponentPlugin[] = [];

  /**
   * @stable [23.04.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    const dynamicPluginFactory = this.uiPlugins.get(this.constructor as IUniversalComponentClassEntity);
    if (dynamicPluginFactory) {
      this.plugins.push(dynamicPluginFactory(this));
    }
    [].concat(props.plugins || []).forEach((plugin) => this.registerPlugin(plugin));
  }

  /**
   * @stable [23.04.2018]
   */
  public componentDidMount(): void {
    this.plugins.forEach((plugin) => plugin.componentDidMount && plugin.componentDidMount());

    const props = this.props;
    if (props.register) {
      props.register(this);
    }
  }

  /**
   * @stable [23.04.2018]
   */
  public componentWillUnmount(): void {
    this.plugins.forEach((plugin) => plugin.componentWillUnmount && plugin.componentWillUnmount());

    const props = this.props;
    if (props.unregister) {
      props.unregister(this);
    }
  }

  /**
   * @stable [23.04.2018]
   * @param {Readonly<TProps extends IUniversalComponentEntity>} prevProps
   * @param {Readonly<TState>} prevState
   * @param {never} prevContext
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, prevContext?: never): void {
    this.plugins.forEach((plugin) =>
      plugin.componentDidUpdate && plugin.componentDidUpdate(prevProps, prevState, prevContext));
  }

  /**
   * @stable [23.04.2018]
   * @param {IBasicEvent} event
   */
  public stopEvent(event: IBasicEvent): void {
    cancelEvent(event);
  }

  /**
   * @stable [18.05.2018]
   * @returns {Element}
   */
  public get self(): Element {
    return this.refs.self as Element;
  }

  /**
   * @stable [19.04.2018]
   * @returns {ApplicationTranslatorT}
   */
  protected get t(): ApplicationTranslatorT {
    return staticInjector(DI_TYPES.Translate);
  }

  /**
   * @stable [19.04.2018]
   * @returns {IApplicationSettings}
   */
  protected get settings(): IApplicationSettings {
    return staticInjector(DI_TYPES.Settings);
  }

  /**
   * @stable [23.04.2018]
   * @returns {Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT>}
   */
  private get uiPlugins(): Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT> {
    return staticInjector(DI_TYPES.UIPlugins);
  }

  /**
   * @stable [13.05.2018]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return staticInjector(DI_TYPES.DateConverter);
  }

  /**
   * @stable [13.05.2018]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return staticInjector(DI_TYPES.NumberConverter);
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUIFactory}
   */
  protected get uiFactory(): IUIFactory {
    return staticInjector(DI_TYPES.UIFactory);
  }

  /**
   * @stable [23.04.2018]
   * @param {IUniversalComponentPluginClassEntity} pluginClassEntity
   * @returns {IUniversalComponentPlugin}
   */
  private registerPlugin(pluginClassEntity: IUniversalComponentPluginClassEntity): IUniversalComponentPlugin {
    const plugin = Reflect.construct(pluginClassEntity, [this]);
    this.plugins.push(plugin);
    return plugin;
  }
}
