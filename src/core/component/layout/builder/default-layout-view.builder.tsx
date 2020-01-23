import { IKeyValue, AnyT } from '../../../definitions.interface';
import { isDef } from '../../../util';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';
import {
  IUniversalLayoutBuilderConfigEntity,
  UniversalLayoutBuilderChildrenT,
} from '../../../definition';

export class DefaultLayoutViewBuilder extends UniversalLayoutViewBuilder<JSX.Element> {

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderChildrenT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {AnyT}
   */
  public buildRowView(props: IKeyValue,
                      children: Array<UniversalLayoutBuilderChildrenT<JSX.Element>>,
                      layoutConfig: IUniversalLayoutBuilderConfigEntity<JSX.Element>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      columns: children,
    };
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {Array<UniversalLayoutBuilderChildrenT<TNode>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<TNode>} layoutConfig
   * @returns {AnyT}
   */
  public buildColumnView(props: IKeyValue,
                         children: Array<UniversalLayoutBuilderChildrenT<JSX.Element>>,
                         layoutConfig: IUniversalLayoutBuilderConfigEntity<JSX.Element>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      rows: children,
    };
  }

  /**
   * @stable [23.01.2020]
   * @param {JSX.Element} props
   * @returns {AnyT}
   */
  public buildSeparatorView(props: JSX.Element): AnyT {
    return {
      separator: null,
    };
  }

  /**
   * @stable [23.01.2020]
   * @param {UniversalLayoutBuilderChildrenT<JSX.Element>} item
   * @returns {boolean}
   */
  public isClonedItem(item: UniversalLayoutBuilderChildrenT<JSX.Element>): boolean {
    return isDef((item as JSX.Element).props);
  }
}
