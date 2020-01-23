import * as React from 'react';

import { LayoutViewBuilder } from './layout-view.builder';
import { UniversalLayoutBuilder } from './universal-layout.builder';
import {
  ILayoutViewBuilder,
  LayoutBuilderChildrenT,
} from '../../../definition';
import { StringNumberT } from '../../../definitions.interface';

export class LayoutBuilder extends UniversalLayoutBuilder<React.ReactNode> {

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
  protected getClonedItemKey(item: LayoutBuilderChildrenT): StringNumberT {
    return (item as React.ReactElement<React.Attributes>).props.key || super.getClonedItemKey(item);
  }
}
