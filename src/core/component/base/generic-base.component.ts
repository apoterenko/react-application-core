import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import {
  IDomAccessor,
  IEventManager,
  IGenericBaseComponentProps,
  IPhoneConverter,
  IUiFactory,
  TranslatorT,
} from '../../definition';
import {
  getDateConverter,
  getDomAccessor,
  getEventManager,
  getNumberConverter,
  getPhoneConverter,
  getSettings,
  getTranslator,
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
  extends React.PureComponent<TProps, TState> {

  protected readonly selfRef = React.createRef<TSelfRef>();

  private $dc: IDateConverter;
  private $domAccessor: IDomAccessor;
  private $eventManager: IEventManager;
  private $nc: INumberConverter;
  private $pc: IPhoneConverter;
  private $settings: ISettingsEntity;
  private $t: TranslatorT;
  private $uiFactory: IUiFactory;

  /**
   * @stable [18.03.2020]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return this.$settings = this.$settings || getSettings();
  }

  /**
   * @stable [30.03.2020]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return this.$nc = this.$nc || getNumberConverter();
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
