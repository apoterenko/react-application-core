import * as React from 'react';

import { LayoutViewBuilder } from './layout-view.builder';
import { UniversalLayoutBuilder } from './universal-layout.builder';
import {
  ILayoutViewBuilder,
  LayoutBuilderChildrenNodeT,
  LayoutBuilderChildrenT,
} from '../../../definition';
import { StringNumberT } from '../../../definitions.interface';

export class LayoutBuilder extends UniversalLayoutBuilder<LayoutBuilderChildrenNodeT> {

  /**
   * @stable [23.01.2020]
   * @param {ILayoutViewBuilder} layoutViewBuilder
   */
  constructor(layoutViewBuilder: ILayoutViewBuilder = new LayoutViewBuilder()) {
    super(layoutViewBuilder);
  }

  /**
   * @stable [23.01.2020]
   * @param {LayoutBuilderChildrenT} item
   * @returns {StringNumberT}
   */
  protected asClonedItemKey(item: LayoutBuilderChildrenT): StringNumberT {
    const element = item as React.ReactElement<React.Attributes>;
    return element.props.key || super.asClonedItemKey(item);
  }
}
