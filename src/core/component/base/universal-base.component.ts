import { Component } from 'react';

import { DI_TYPES, staticInjector } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IApplicationSettings } from '../../settings';
import { IUniversalBaseComponent } from './universal-base.interface';
import { IUniversalComponentEntity } from '../../entities-definitions.interface';

export class UniversalBaseComponent<TComponent extends IUniversalBaseComponent<TProps, TState>,
                                    TProps extends IUniversalComponentEntity = IUniversalComponentEntity,
                                    TState = {}>
  extends Component<TProps, TState>
  implements IUniversalBaseComponent<TProps, TState> {

  /**
   * @stable - 19.04.2018
   * @returns {ApplicationTranslatorT}
   */
  protected get t(): ApplicationTranslatorT {
    return staticInjector(DI_TYPES.Translate);
  }

  /**
   * @stable - 19.04.2018
   * @returns {IApplicationSettings}
   */
  protected get settings(): IApplicationSettings {
    return staticInjector(DI_TYPES.Settings);
  }
}
