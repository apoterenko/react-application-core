import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import {
  IAsyncLibManager,
  IComponentsSettingsEntity,
  IDomAccessor,
  IEnvironment,
  IEventEmitter,
  IEventManager,
  IFieldConverter,
  IGenericComponent,
  IGenericComponentProps,
  IPhoneConverter,
  IPlaceApi,
  IStorage,
  ITransport,
  IUiFactory,
  IViewerLocator,
  TranslatorT,
} from '../../definition';
import {
  DiServices,
  getDatabaseStorage,
  getDateConverter,
  getDomAccessor,
  getEnvironment,
  getEventEmitter,
  getEventManager,
  getNumberConverter,
  getPlaceApi,
  getSettings,
  getTranslator,
  getTransport,
} from '../../di';
import { ISettingsEntity } from '../../settings';
import {
  IDateConverter,
  INumberConverter,
} from '../../converter';
import {
  CalcUtils,
  PropsUtils,
} from '../../util';

export class GenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState>
  implements IGenericComponent<TProps, TState, TSelfRef> {

  public readonly selfRef = React.createRef<TSelfRef>();

  private $asyncLibManager: IAsyncLibManager;
  private $databaseStorage: IStorage;
  private $dc: IDateConverter;
  private $domAccessor: IDomAccessor;
  private $environment: IEnvironment;
  private $eventEmitter: IEventEmitter;
  private $eventManager: IEventManager;
  private $fieldConverter: IFieldConverter;
  private $nc: INumberConverter;
  private $pc: IPhoneConverter;
  private $placeApi: IPlaceApi;
  private $settings: ISettingsEntity;
  private $t: TranslatorT;
  private $transport: ITransport;
  private $uiFactory: IUiFactory;
  private $viewerLocator: IViewerLocator;

  /**
   * @stable [19.09.2020]
   */
  public get actualRef(): React.RefObject<TSelfRef> {
    return this.props.forwardedRef || this.selfRef;
  }


  /**
   * @stable [01.07.2021]
   */
  public get isRendered(): boolean {
    return !R.isNil(this.actualRef?.current);
  }

  /**
   * @stable [19.09.2020]
   */
  public get settings(): ISettingsEntity {
    return this.$settings = this.$settings || getSettings();
  }

  /**
   * @stable [01.07.2021]
   */
  public get originalProps(): Readonly<TProps> {
    return this.props;
  }

  /**
   * @stable [01.07.2021]
   * @param componentProps
   */
  protected getOriginalClassName(componentProps: Readonly<TProps>): string {
    return CalcUtils.calc(componentProps.className, componentProps);
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<TProps> {
    return null;
  }

  /**
   * @stable [01.07.2021]
   */
  protected get originalChildren(): React.ReactNode {
    return this.props.children;
  }

  /**
   * @stable [01.07.2021]
   */
  protected get mergedProps(): Readonly<TProps> {
    const originalProps = this.originalProps;
    const {
      noMergedProps,
    } = originalProps;

    return noMergedProps
      ? originalProps
      : PropsUtils.extendProps(originalProps, this.getComponentSettingsProps());
  }

  /**
   * @stable [01.07.2021]
   */
  protected get componentsSettings(): IComponentsSettingsEntity {
    return this.settings.components;
  }

  /**
   * @stable [01.06.2020]
   * @returns {IEventEmitter}
   */
  protected get eventEmitter(): IEventEmitter {
    return this.$eventEmitter = this.$eventEmitter || getEventEmitter();
  }

  /**
   * @stable [21.04.2020]
   * @returns {IStorage}
   */
  protected get databaseStorage(): IStorage {
    return this.$databaseStorage = this.$databaseStorage || getDatabaseStorage();
  }

  /**
   * @stable [26.03.2021]
   */
  protected get asyncLibManager(): IAsyncLibManager {
    return this.$asyncLibManager = this.$asyncLibManager || DiServices.getAsyncLibManager();
  }

  /**
   * @stable [21.04.2020]
   * @returns {ITransport}
   */
  protected get transport(): ITransport {
    return this.$transport = this.$transport || getTransport();
  }

  /**
   * @stable [30.03.2020]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return this.$nc = this.$nc || getNumberConverter();
  }

  /**
   * @stable [27.09.2020]
   */
  protected get fieldConverter(): IFieldConverter {
    return this.$fieldConverter = this.$fieldConverter || DiServices.fieldConverter();
  }

  /**
   * @stable [30.11.2020]
   * @protected
   */
  protected get pc(): IPhoneConverter {
    return this.$pc = this.$pc || DiServices.phoneConverter();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return this.$dc = this.$dc || getDateConverter();
  }

  /**
   * @stable [21.04.2020]
   * @returns {IPlaceApi}
   */
  protected get placeApi(): IPlaceApi {
    return this.$placeApi = this.$placeApi || getPlaceApi();
  }

  /**
   * @stable [21.04.2020]
   * @returns {IEnvironment}
   */
  protected get environment(): IEnvironment {
    return this.$environment = this.$environment || getEnvironment();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IEventManager}
   */
  protected get eventManager(): IEventManager {
    return this.$eventManager = this.$eventManager || getEventManager();
  }

  /**
   * @stable [18.03.2020]
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return this.$t = this.$t || getTranslator();
  }

  /**
   * @stable [19.06.2020]
   * @returns {IUiFactory}
   */
  protected get uiFactory(): IUiFactory {
    return this.$uiFactory = this.$uiFactory || DiServices.uiFactory();
  }

  /**
   * @stable [05.04.2020]
   * @returns {IDomAccessor}
   */
  protected get domAccessor(): IDomAccessor {
    return this.$domAccessor = this.$domAccessor || getDomAccessor();
  }

  /**
   * @stable [19.06.2020]
   * @returns {IViewerLocator}
   */
  protected get viewerLocator(): IViewerLocator {
    return this.$viewerLocator = this.$viewerLocator || DiServices.viewerLocator();
  }
}
