import { IKeyValue, AnyT } from '../../../definitions.interface';
import { isDef } from '../../../util';
import {
  IUniversalLayoutBuilderConfiguration,
  UniversalLayoutBuilderElementT,
} from '../../../configurations-definitions.interface';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export class DefaultLayoutViewBuilder<TNode> extends UniversalLayoutViewBuilder<TNode> {

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderElementT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {AnyT}
   */
  public buildRowView(props: IKeyValue,
                      children: Array<UniversalLayoutBuilderElementT<TNode>>,
                      layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      columns: children,
    };
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderElementT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfiguration<TNode>} layoutConfig
   * @returns {AnyT}
   */
  public buildColumnView(props: IKeyValue,
                         children: Array<UniversalLayoutBuilderElementT<TNode>>,
                         layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      rows: children,
    };
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @returns {AnyT}
   */
  public buildSeparatorView(props: IKeyValue): AnyT {
    return {
      separator: null,
    };
  }

  /**
   * @stable [22.10.2018]
   * @param {UniversalLayoutBuilderElementT<TNode>} item
   * @returns {boolean}
   */
  public isClonedItem(item: UniversalLayoutBuilderElementT<TNode>): boolean {
    return isDef((item as {props: IKeyValue}).props);
  }
}
