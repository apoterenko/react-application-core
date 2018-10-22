import * as R from 'ramda';

import { uuid } from '../../../util';
import {
  LayoutBuilderTypeEnum,
  IUniversalLayoutBuilderConfiguration,
  UniversalLayoutBuilderElementT,
} from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class UniversalLayoutBuilder<TNode> {

  private index: number;
  private layoutId = uuid();

  /**
   * @stable [22.10.2018]
   * @param {ILayoutViewBuilder<TNode>} layoutViewBuilder
   */
  constructor(private layoutViewBuilder: ILayoutViewBuilder<TNode>) {
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  public build(layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode {
    this.index = 0;   // Framework keys magic
    return this.buildLayout(layoutConfig);
  }

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderElementT<TNode>} item
   * @returns {string}
   */
  protected getClonedItemKey(item: UniversalLayoutBuilderElementT<TNode>): string {
    return this.newKey;
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildLayout(layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode {
    if (layoutConfig.layout === LayoutBuilderTypeEnum.HORIZONTAL) {
      return this.buildHorizontalLayout(layoutConfig);
    }
    return this.buildVerticalLayout(layoutConfig);
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildHorizontalLayout(layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode {
    const children = [];
    const filteredItems = this.getDefinedChildren(layoutConfig);

    filteredItems.forEach((item, index) => {
      children.push(this.tryCloneItem(item, layoutConfig));
      if (index < filteredItems.length - 1) {
        children.push(this.layoutViewBuilder.buildSeparatorView(this.key));
      }
    });
    return this.layoutViewBuilder.buildRowView(this.key, children, layoutConfig);
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildVerticalLayout(layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode {
    return this.layoutViewBuilder.buildColumnView(
      this.key,
      R.isNil(layoutConfig.children)
        ? [layoutConfig]
        : this.getDefinedChildren(layoutConfig).map((item) => this.tryCloneItem(item, layoutConfig)),
      layoutConfig
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {Array<UniversalLayoutBuilderElementT<TNode>>}
   */
  private getDefinedChildren(
    layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): Array<UniversalLayoutBuilderElementT<TNode>> {
    return layoutConfig.children.filter((item) => !R.isNil(item));
  }

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderElementT<TNode>} item
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  private tryCloneItem(item: UniversalLayoutBuilderElementT<TNode>,
                       layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode {
    const itemAsNode = item as TNode;
    const itemAsCfg = item as IUniversalLayoutBuilderConfiguration<TNode>;

    return this.layoutViewBuilder.isClonedItem(item)
      ? this.layoutViewBuilder.cloneItem(
          itemAsNode,
          this.layoutViewBuilder.getClonedItemProps(item, layoutConfig, {key: this.getClonedItemKey(itemAsNode)})
        )
      : this.buildLayout(itemAsCfg);
  }

  /**
   * @stable [22.10.2018]
   * @returns {{key: string}}
   */
  private get key(): { key: string } {
    return { key: this.newKey };
  }

  /**
   * @stable [22.10.2018]
   * @returns {string}
   */
  private get newKey(): string {
    return `${this.layoutId}-${this.index++}`;
  }
}
