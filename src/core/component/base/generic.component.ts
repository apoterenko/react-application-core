import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import {
  IGenericComponentProps,
  IUiFactory,
  TranslatorT,
} from '../../definition';
import { patchRenderMethod } from '../../util';
import {
  getSettings,
  getTranslator,
  getUiFactory,
} from '../../di';
import { ISettingsEntity } from '../../settings';

export class GenericComponent<TProps extends IGenericComponentProps = IGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState> {

  protected readonly selfRef = React.createRef<TSelfRef>();

  /**
   * @stable [27.02.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    patchRenderMethod(this);
  }

  /**
   * @stable [18.03.2020]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return getSettings();
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
