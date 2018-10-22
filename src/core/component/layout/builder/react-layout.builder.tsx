import * as React from 'react';

import { ReactLayoutViewBuilder } from './react-layout-view.builder';
import { UniversalLayoutBuilder } from './universal-layout.builder';
import { ILayoutViewBuilder } from './layout-builder.interface';
import { ReactLayoutBuilderElementT } from '../../../react-configurations-definitions.interface';

export class ReactLayoutBuilder extends UniversalLayoutBuilder<React.ReactNode> {

  /**
   * @stable [22.10.2018]
   * @param {ILayoutViewBuilder<React.ReactNode>} layoutViewBuilder
   */
  constructor(layoutViewBuilder: ILayoutViewBuilder<React.ReactNode> = new ReactLayoutViewBuilder()) {
    super(layoutViewBuilder);
  }

  /**
   * @stable [22.10.2018]
   * @param {ReactLayoutBuilderElementT} item
   * @returns {string}
   */
  protected getClonedItemKey(item: ReactLayoutBuilderElementT): string {
    return (item as JSX.Element).props.key || super.getClonedItemKey(item);
  }
}
