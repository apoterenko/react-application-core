import * as React from 'react';
import * as R from 'ramda';

import { uuid } from '../../../util';
import {
  ILayoutBuilderConfiguration,
  LayoutBuilderElementT,
  LayoutBuilderTypeEnum,
} from '../../../configurations-definitions.interface';
import { LayoutViewBuilder } from './layout-view.builder';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class LayoutBuilder {

  private index: number;
  private layoutId = uuid();

  /**
   * @stable - 16.04.2018
   * @param {ILayoutViewBuilder} layoutViewBuilder
   */
  constructor(private layoutViewBuilder: ILayoutViewBuilder = new LayoutViewBuilder()) {
  }

  /**
   * @stable - 16.04.2018
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  public build(layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    this.index = 0;   // React keys magic
    return this.buildLayout(layoutConfig);
  }

  /**
   * @stable - 16.04.2018
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  private buildLayout(layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    if (layoutConfig.layout === LayoutBuilderTypeEnum.HORIZONTAL) {
      return this.buildHorizontalLayout(layoutConfig);
    }
    return this.buildVerticalLayout(layoutConfig);
  }

  /**
   * @stable - 19.04.2018
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  private buildHorizontalLayout(layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    const children = [];
    const filteredItems = layoutConfig.children.filter((item) => !R.isNil(item));

    filteredItems.forEach((item, index) => {
      children.push(this.clone(item));
      if (index < filteredItems.length - 1) {
        children.push(
          this.layoutViewBuilder.buildSeparatorView({ key: uuid() })
        );
      }
    });
    return this.layoutViewBuilder.buildRowView(this.key, children, layoutConfig);
  }

  /**
   * @stable - 19.04.2018
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  private buildVerticalLayout(layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    return this.layoutViewBuilder.buildColumnView(
      this.key,
      layoutConfig.children
        .filter((item) => !R.isNil(item))
        .map((item): JSX.Element => this.clone(item)),
      layoutConfig
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {JSX.Element}
   */
  private clone(item: LayoutBuilderElementT): JSX.Element {
    const itemEl = item as JSX.Element;
    const itemCfg = item as ILayoutBuilderConfiguration;

    return this.layoutViewBuilder.isReactElement(item)
      ? React.cloneElement<React.ClassAttributes<{}>>(
          itemEl,
          this.layoutViewBuilder.toClonedElementProps<React.ClassAttributes<{}>>(item, {
            key: itemEl.props.key || this.newKey,
          })
        )
      : this.buildLayout(itemCfg);
  }

  /**
   * @stable - 16.04.2018
   * @returns {{key: string}}
   */
  private get key(): { key: string } {
    return { key: this.newKey };
  }

  /**
   * @stable - 16.04.2018
   * @returns {string}
   */
  private get newKey(): string {
    return `${this.layoutId}-${this.index++}`;
  }
}
