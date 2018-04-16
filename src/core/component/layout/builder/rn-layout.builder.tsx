import * as React from 'react';

import { LayoutBuilder } from './layout.builder';
import { RnLayoutViewBuilder } from './rn-layout-view.builder';

export class RnLayoutBuilder extends LayoutBuilder {

  /**
   * @stable - 16.04.2018
   */
  constructor() {
    super(new RnLayoutViewBuilder());
  }
}
