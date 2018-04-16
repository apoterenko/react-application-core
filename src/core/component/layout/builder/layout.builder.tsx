import * as React from 'react';
import * as R from 'ramda';

import { uuid } from '../../../util';
import {
  ILayoutBuilderConfiguration,
  LayoutBuilderElementT,
  LayoutBuilderFactorEnum,
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
      return this.buildHorizontalLayout(layoutConfig.children, layoutConfig.factor);
    }
    return this.buildVerticalLayout(layoutConfig.children, layoutConfig.factor);
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderElementT[]} items
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  private buildHorizontalLayout(items: LayoutBuilderElementT[], factor: LayoutBuilderFactorEnum): JSX.Element {
    const children = [];
    const filteredItems = items.filter((item) => !R.isNil(item));

    filteredItems.forEach((item, index) => {
      children.push(this.clone(item));
      if (index < filteredItems.length - 1) {
        children.push(
          this.layoutViewBuilder.buildSeparatorView({ key: uuid() })
        );
      }
    });
    return this.layoutViewBuilder.buildRowView(this.key, children, factor);
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderElementT[]} items
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  private buildVerticalLayout(items: LayoutBuilderElementT[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return this.layoutViewBuilder.buildColumnView(
      this.key,
      items
        .filter((item) => !R.isNil(item))
        .map((item): JSX.Element => this.clone(item)),
      factor
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {JSX.Element}
   */
  private clone(item: LayoutBuilderElementT): JSX.Element {
    const itemEl = item as JSX.Element;
    const type = itemEl.type;
    return React.PureComponent.isPrototypeOf(type)
            || React.Component.isPrototypeOf(type)
            || item.hasOwnProperty('propTypes')       // ReactNative
            || item.hasOwnProperty('contextTypes')    // ReactNative
      ? React.cloneElement<{}>(itemEl, { key: itemEl.props.key || this.newKey })
      : this.buildLayout(item as ILayoutBuilderConfiguration);
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
