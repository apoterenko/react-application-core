import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import {
  IEventManager,
  IGenericComponentEntity,
  IPhoneConverter,
  IUiFactory,
  TranslatorT,
} from '../../definition';
import {
  getDateConverter,
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

export class GenericBaseComponent<TProps extends IGenericComponentEntity = IGenericComponentEntity,
  TState = {},
  TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState> {

  protected readonly selfRef = React.createRef<TSelfRef>();

  /**
   * @stable [18.03.2020]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return getSettings();
  }

  /**
   * @stable [30.03.2020]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return getNumberConverter();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IPhoneConverter}
   */
  protected get pc(): IPhoneConverter {
    return getPhoneConverter();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return getDateConverter();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IEventManager}
   */
  protected get eventManager(): IEventManager {
    return getEventManager();
  }

  /**
   * @stable [18.03.2020]
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return getTranslator();
  }

  /**
   * @stable [18.03.2020]
   * @returns {IUiFactory}
   */
  protected get uiFactory(): IUiFactory {
    return getUiFactory();
  }
}
