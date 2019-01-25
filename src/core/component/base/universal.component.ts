import * as React from 'react';

import { DelayedTask, isFn, isDef } from '../../util';
import { DI_TYPES, staticInjector } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IApplicationSettings } from '../../settings';
import { IDateConverter, INumberConverter } from '../../converter';
import {
  IUniversalComponentClassEntity,
  IUniversalComponentPlugin,
  IUniversalComponent,
  UniversalComponentPluginFactoryT,
  IUniversalComponentPluginClassEntity,
} from '../../entities-definitions.interface';
import { IUniversalComponentProps } from '../../props-definitions.interface';
import { IUIFactory } from '../factory/factory.interface';
import { IApplicationDomAccessor } from '../dom-accessor/dom-accessor.interface';

export class UniversalComponent<TComponent extends IUniversalComponent<TProps, TState>,
                                TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {}>
  extends React.Component<TProps, TState>
  implements IUniversalComponent<TProps, TState> {

  protected plugins: IUniversalComponentPlugin[] = [];
  protected scrollTask: DelayedTask;
  protected selfRef = React.createRef<Element>();

  /**
   * @stable [23.04.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onNativeScroll = this.onNativeScroll.bind(this);

    const dynamicPluginFactory = this.uiPlugins.get(this.constructor as IUniversalComponentClassEntity);
    if (dynamicPluginFactory) {
      this.plugins.push(dynamicPluginFactory(this));
    }
    [].concat(props.plugins || []).forEach((plugin) => this.registerPlugin(plugin));

    if (isFn(props.onScroll)) {
      this.scrollTask = new DelayedTask(this.doScroll.bind(this), 200);
    }
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
   * @stable [18.12.2018]
   * @param {Readonly<TProps extends IUniversalComponentProps>} prevProps
   * @param {Readonly<TState>} prevState
   */
  public getSnapshotBeforeUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    this.plugins.forEach((plugin) =>
      isFn(plugin.getSnapshotBeforeUpdate) && plugin.getSnapshotBeforeUpdate(prevProps, prevState));
    return null;
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
    if (isDef(this.scrollTask)) {
      this.scrollTask.stop();
    }
  }

  /**
   * @stable [23.04.2018]
   * @param {Readonly<TProps>} prevProps
   * @param {Readonly<TState>} prevState
   * @param {never} prevContext
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, prevContext?: never): void {
    this.plugins.forEach((plugin) =>
      plugin.componentDidUpdate && plugin.componentDidUpdate(prevProps, prevState, prevContext));
  }

  /**
   * @stable [01.12.2018]
   * @returns {Element}
   */
  public getSelf(): Element {
    return this.selfRef.current || this.refs.self as any; // TODO any
  }

  /**
   * @stable [01.12.2018]
   */
  protected onNativeScroll(): void {
    if (isDef(this.scrollTask)) {
      this.scrollTask.start();
    }
  }

  /**
   * @stable [01.12.2018]
   */
  protected doScroll(): void {
    this.props.onScroll(this.domAccessor.getScrollInfo(this.getSelf()));
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
   * @stable [01.12.2018]
   * @returns {IApplicationDomAccessor}
   */
  protected get domAccessor(): IApplicationDomAccessor {
    return staticInjector(DI_TYPES.DomAccessor);
  }

  /**
   * @stable [01.12.2018]
   * @returns {React.RefObject<TElement extends Element>}
   */
  protected getSelfRef<TElement extends Element>(): React.RefObject<TElement> {
    return this.selfRef as React.RefObject<TElement>;
  }

  /**
   * @stable [23.04.2018]
   * @param {IUniversalComponentPluginClassEntity} pluginClassEntity
   * @returns {IUniversalComponentPlugin}
   */
  protected registerPlugin(pluginClassEntity: IUniversalComponentPluginClassEntity): IUniversalComponentPlugin {
    const plugin = Reflect.construct(pluginClassEntity, [this]);
    this.plugins.push(plugin);
    return plugin;
  }
}
