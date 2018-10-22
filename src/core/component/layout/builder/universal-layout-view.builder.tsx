import * as R from 'ramda';

import { isFn, isString } from '../../../util';
import { IKeyValue, ITypeWrapper } from '../../../definitions.interface';
import {
  UniversalLayoutBuilderElementT,
  LayoutBuilderFactorEnum,
  IUniversalLayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export abstract class UniversalLayoutViewBuilder<TNode> implements ILayoutViewBuilder<TNode> {

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderElementT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  public abstract buildRowView(props: IKeyValue,
                               children: Array<UniversalLayoutBuilderElementT<TNode>>,
                               layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderElementT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {TNode}
   */
  public abstract buildColumnView(props: IKeyValue,
                                  children: Array<UniversalLayoutBuilderElementT<TNode>>,
                                  layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @returns {TNode}
   */
  public abstract buildSeparatorView(props: IKeyValue): TNode;

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderElementT<TNode>} item
   * @returns {boolean}
   */
  public isClonedItem(item: UniversalLayoutBuilderElementT<TNode>): boolean {
    const itemEl = item as ITypeWrapper<() => void | string>;
    const type = itemEl.type;
    return isFn(type)
      || (isString(type) && !R.isEmpty(type));  // type = {'div', 'span', ...}
  }

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderElementT<TNode>} item
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @param {IKeyValue} props
   * @returns {IKeyValue}
   */
  public getClonedItemProps(item: UniversalLayoutBuilderElementT<TNode>,
                            layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>,
                            props: IKeyValue): IKeyValue {
    return props;
  }

  /**
   * @stable [22.10.2018]
   * @param {TNode} item
   * @param {IKeyValue} props
   * @returns {TNode}
   */
  public cloneItem(item: TNode, props: IKeyValue): TNode {
    return item;
  }

  /**
   * @stable [22.10.2018]
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} config
   * @returns {string}
   */
  protected toFactorClassName(config: IUniversalLayoutBuilderConfiguration<TNode>): string {
    if (config.full === false) {
      return '';
    }
    switch (config.factor) {
      case LayoutBuilderFactorEnum.FACTOR_2:
        return 'rac-flex-full-x2';
      case LayoutBuilderFactorEnum.FACTOR_4:
        return 'rac-flex-full-x4';
      case LayoutBuilderFactorEnum.FACTOR_8:
        return 'rac-flex-full-x8';
      default:
        return 'rac-flex-full';
    }
  }
}
