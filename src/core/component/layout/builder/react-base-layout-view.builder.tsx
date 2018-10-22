import * as React from 'react';

import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export abstract class ReactBaseLayoutViewBuilder extends UniversalLayoutViewBuilder<React.ReactNode> {

  /**
   * @stable [22.10.2018]
   * @param {React.ReactNode} item
   * @param {React.ClassAttributes<{}>} props
   * @returns {React.ReactNode}
   */
  public cloneItem(item: React.ReactNode, props: React.ClassAttributes<{}>): React.ReactNode {
    return React.cloneElement(item as React.ReactElement<{}>, props);
  }
}
