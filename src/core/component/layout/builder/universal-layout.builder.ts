import * as R from 'ramda';

import {
  NOT_NIL_VALUE_PREDICATE,
  uuid,
} from '../../../util';
import {
  IUniversalLayoutViewBuilder,
  IUniversalLayoutBuilderConfigEntity,
  IUniversalLayoutProps,
  LayoutTypesEnum,
  UniversalLayoutBuilderChildrenT,
} from '../../../definition';
import { StringNumberT } from '../../../definitions.interface';

export class UniversalLayoutBuilder<TNode, TProps extends IUniversalLayoutProps = IUniversalLayoutProps> {

  private index: number;
  private layoutId = uuid();

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutViewBuilder<TNode>} layoutViewBuilder
   */
  constructor(private layoutViewBuilder: IUniversalLayoutViewBuilder<TNode, TProps>) {
  }

  /**
   * @stable [23.01.2020]
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  public build(layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode {
    this.index = 0; // The keys should be persistent
    return this.buildLayout(layoutConfig);
  }

  /**
   * @stable [23.01.2020]
   * @param {UniversalLayoutBuilderChildrenT<TNode>} _
   * @returns {StringNumberT}
   */
  protected getClonedItemKey(_: UniversalLayoutBuilderChildrenT<TNode>): StringNumberT {
    return this.newKey;
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildLayout(layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode {
    return layoutConfig.layout === LayoutTypesEnum.HORIZONTAL
      ? this.buildHorizontalLayout(layoutConfig)
      : this.buildVerticalLayout(layoutConfig);
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildHorizontalLayout(layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode {
    const children = [];
    const filteredItems = this.filterChildren(layoutConfig);

    filteredItems.forEach((item, index) => {
      children.push(this.asClonedItem(item, layoutConfig));
      if (index < filteredItems.length - 1) {
        children.push(this.layoutViewBuilder.buildSeparatorView(this.key));
      }
    });
    return this.layoutViewBuilder.buildRowView(this.key, children, layoutConfig);
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  private buildVerticalLayout(layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode {
    return this.layoutViewBuilder.buildColumnView(
      this.key,
      R.isNil(layoutConfig.children)
        ? [layoutConfig]
        : this.filterChildren(layoutConfig).map((item) => this.asClonedItem(item, layoutConfig)),
      layoutConfig
    );
  }

  /**
   * @stable [23.01.2020]
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {Array<UniversalLayoutBuilderChildrenT<TNode>>}
   */
  private filterChildren(
    layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): Array<UniversalLayoutBuilderChildrenT<TNode>> {
    return layoutConfig.children.filter(NOT_NIL_VALUE_PREDICATE);
  }

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderChildrenT<TNode>} item
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  private asClonedItem(item: UniversalLayoutBuilderChildrenT<TNode>,
                       layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode {
    const itemAsNode = item as TNode;
    const itemAsCfg = item as IUniversalLayoutBuilderConfigEntity<TNode>;

    return this.layoutViewBuilder.isClonedItem(item)
      ? this.layoutViewBuilder.cloneItem(
        itemAsNode,
        this.layoutViewBuilder.getClonedItemProps(
          itemAsNode,
          layoutConfig,
          {key: this.getClonedItemKey(itemAsNode)} as TProps
        )
      )
      : this.buildLayout(itemAsCfg);
  }

  /**
   * @stable [23.01.2020]
   * @returns {TProps}
   */
  private get key(): TProps {
    return {key: this.newKey} as TProps;
  }

  /**
   * @stable [23.01.2020]
   * @returns {string}
   */
  private get newKey(): string {
    return `${this.layoutId}-${this.index++}`;
  }
}
