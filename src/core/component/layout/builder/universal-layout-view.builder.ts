import * as R from 'ramda';

import {
  isFn,
  isString,
} from '../../../util';
import {
  IUniversalLayoutBuilderConfigEntity,
  IUniversalLayoutProps,
  IUniversalLayoutViewBuilder,
  UniversalLayoutBuilderChildrenT,
} from '../../../definition';

export abstract class UniversalLayoutViewBuilder<TNode, TProps extends IUniversalLayoutProps = IUniversalLayoutProps>
  implements IUniversalLayoutViewBuilder<TNode, TProps> {

  /**
   * @stable [23.01.2020]
   * @param {TProps} props
   * @param {Array<UniversalLayoutBuilderChildrenT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  public abstract buildRowView(props: TProps,
                               children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
                               layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode;

  /**
   * @stable [23.01.2020]
   * @param {TProps} props
   * @param {Array<UniversalLayoutBuilderChildrenT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {TNode}
   */
  public abstract buildColumnView(props: TProps,
                                  children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
                                  layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode;

  /**
   * @stable [23.01.2020]
   * @param {UniversalLayoutBuilderChildrenT<TNode>} item
   * @returns {boolean}
   */
  public isClonedItem(item: UniversalLayoutBuilderChildrenT<TNode>): boolean {
    const itemEl = item as JSX.Element;
    const type = itemEl.type;
    return isFn(type)
      || (isString(type) && !R.isEmpty(type));  // type = {'div', 'span', ...}
  }

  /**
   * @stable [23.01.2020]
   * @param {TNode} item
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @param {TProps} props
   * @returns {TProps}
   */
  public getClonedItemProps(item: TNode,
                            layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>,
                            props: TProps): TProps {
    return props;
  }

  /**
   * @stable [23.01.2020]
   * @param {TNode} item
   * @param {TProps} props
   * @returns {TNode}
   */
  public cloneItem(item: TNode, props: TProps): TNode {
    return item;
  }
}
