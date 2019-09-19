import * as React from 'react';

import { LayoutBuilder } from './react-layout.builder';
import { RnLayoutViewBuilder } from './rn-layout-view.builder';

export class RnLayoutBuilder extends LayoutBuilder {

  /**
   * @stable [22.10.2018]
   */
  constructor() {
    super(new RnLayoutViewBuilder());
  }
}
