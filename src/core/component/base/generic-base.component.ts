import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import {
  IAsyncLibManager,
  IDomAccessor,
  IEnvironment,
  IEventManager,
  IFieldConverter,
  IGenericBaseComponentProps,
  IGenericComponent,
  IPhoneConverter,
  IPlaceApi,
  IStorage,
  ITransport,
  IUiFactory,
  TranslatorT,
} from '../../definition';
import {
  getAsyncLibManager,
  getDatabaseStorage,
  getDateConverter,
  getDomAccessor,
  getEnvironment,
  getEventManager,
  getFieldConverter,
  getNumberConverter,
  getPhoneConverter,
  getPlaceApi,
  getSettings,
  getTranslator,
  getTransport,
  getUiFactory,
} from '../../di';
import { ISettingsEntity } from '../../settings';
import {
  IDateConverter,
  INumberConverter,
} from '../../converter';

export class GenericBaseComponent<TProps extends IGenericBaseComponentProps = IGenericBaseComponentProps,
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
  private $eventManager: IEventManager;
  private $fieldConverter: IFieldConverter;
  private $nc: INumberConverter;
  private $pc: IPhoneConverter;
  private $placeApi: IPlaceApi;
  private $settings: ISettingsEntity;
  private $t: TranslatorT;
  private $transport: ITransport;
  private $uiFactory: IUiFactory;

  /**
   * @stable [04.05.2020]
   * @returns {React.RefObject<TSelfRef>}
   */
  public get actualRef(): React.RefObject<TSelfRef> {
    return this.props.forwardedRef || this.selfRef;
  }

  /**
   * @stable [18.03.2020]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return this.$settings = this.$settings || getSettings();
  }

  /**
   * @stable [21.04.2020]
   * @returns {IStorage}
   */
  protected get databaseStorage(): IStorage {
    return this.$databaseStorage = this.$databaseStorage || getDatabaseStorage();
  }

  /**
   * @stable [18.05.2020]
   * @returns {IAsyncLibManager}
   */
  protected get asyncLibManager(): IAsyncLibManager {
    return this.$asyncLibManager = this.$asyncLibManager || getAsyncLibManager();
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
   * @stable [21.04.2020]
   * @returns {IFieldConverter}
   */
  protected get fieldConverter(): IFieldConverter {
    return this.$fieldConverter = this.$fieldConverter || getFieldConverter();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IPhoneConverter}
   */
  protected get pc(): IPhoneConverter {
    return this.$pc = this.$pc || getPhoneConverter();
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
   * @stable [18.03.2020]
   * @returns {IUiFactory}
   */
  protected get uiFactory(): IUiFactory {
    return this.$uiFactory = this.$uiFactory || getUiFactory();
  }

  /**
   * @stable [05.04.2020]
   * @returns {IDomAccessor}
   */
  protected get domAccessor(): IDomAccessor {
    return this.$domAccessor = this.$domAccessor || getDomAccessor();
  }
}
