import * as React from 'react';
import { injectable } from 'inversify';

import {
  IIconConfigEntity,
  IUiIconFactory,
} from '../../../../definition';

@injectable()
export class UiDefaultIconFactory implements IUiIconFactory {

  /**
   * @stable [19.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IIconConfigEntity | string): JSX.Element {
    return null;
  }
}
