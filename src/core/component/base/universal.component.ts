import * as React from 'react';
import * as R from 'ramda';

import { DelayedTask, isFn, isDef, nvl } from '../../util';
import {
  DI_TYPES,
  getUiFactory,
  staticInjector,
  getSettings,
  getDatabaseStorage,
} from '../../di';
import { TranslatorT } from '../../translation';
import { ISettings } from '../../settings';
import { IDateConverter, INumberConverter } from '../../converter';
import {
  IUniversalComponentClassEntity,
  IUniversalComponentPlugin,
  IUniversalComponent,
  UniversalComponentPluginFactoryT,
  IUniversalComponentPluginClassEntity,
} from '../../entities-definitions.interface';
import { AnyT } from '../../definitions.interface';
import { IUniversalComponentProps } from '../../props-definitions.interface';
import { IUIFactory } from '../factory/factory.interface';
import { IDomAccessor } from '../dom-accessor/dom-accessor.interface';
import { IStorage } from '../../storage';
import {
  getTransport,
  getUiPlugins,
} from '../../di';
import { ITransport } from '../../definition';

export class UniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {}>
  extends React.PureComponent<TProps, TState>
  implements IUniversalComponent<TProps, TState> {

  protected readonly plugins: IUniversalComponentPlugin[] = [];
  protected scrollTask: DelayedTask;
  protected readonly selfRef = React.createRef<AnyT>();
  private readonly defaultUiFactory: IUIFactory = { makeIcon: () => null };

  /**
   * @stable [23.04.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onNativeScroll = this.onNativeScroll.bind(this);

    this.initPlugins();

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
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return staticInjector(DI_TYPES.Translate);
  }

  /**
   * @reactNativeCompatible
   * @stable [29.07.2019]
   * @returns {ISettings}
   */
  protected get settings(): ISettings {
    return getSettings();
  }

  /**
   * @reactNativeCompatible
   * @stable [29.07.2019]
   * @returns {IStorage}
   */
  protected get databaseStorage(): IStorage {
    return getDatabaseStorage();
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
    return nvl(getUiFactory(), this.defaultUiFactory);
  }

  /**
   * @stable [01.12.2018]
   * @returns {IDomAccessor}
   */
  protected get domAccessor(): IDomAccessor {
    return staticInjector(DI_TYPES.DomAccessor);
  }

  /**
   * @reactNativeCompatible
   * @stable [15.09.2019]
   * @returns {ITransport}
   */
  protected get transport(): ITransport {
    return getTransport();
  }

  /**
   * @stable [18.06.2019]
   * @param {IUniversalComponentPluginClassEntity | IUniversalComponentPlugin} pluginObject
   */
  protected registerPlugin(pluginObject: IUniversalComponentPluginClassEntity | IUniversalComponentPlugin): void {
    if (R.isNil(pluginObject)) {
      return;
    }
    this.plugins.push(
      isFn(pluginObject)
        ? Reflect.construct(pluginObject as IUniversalComponentPluginClassEntity, [this])
        : pluginObject
    );
  }

  /**
   * @stable [18.06.2019]
   */
  private initPlugins(): void {
    const plugins = this.uiPlugins;
    if (R.isNil(plugins)) {
      return;
    }
    const dynamicPluginFactory = plugins.get(this.constructor as IUniversalComponentClassEntity);
    if (dynamicPluginFactory) {
      this.registerPlugin(dynamicPluginFactory(this));
    }
    [].concat(this.props.plugins || []).forEach((plugin) => this.registerPlugin(plugin));
  }

  /**
   * @reactNativeCompatible
   * @stable [21.08.2019]
   * @returns {Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT>}
   */
  private get uiPlugins(): Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT> {
    return getUiPlugins();
  }
}
