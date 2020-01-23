import { AnyT } from '../../../definitions.interface';
import { isDef } from '../../../util';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';
import {
  IUniversalLayoutBuilderConfigEntity,
  UniversalLayoutBuilderChildrenT,
} from '../../../definition';

export class DefaultLayoutViewBuilder extends UniversalLayoutViewBuilder<JSX.Element> {

  /**
   * @stable [23.01.2020]
   * @param {{}} props
   * @param {Array<UniversalLayoutBuilderChildrenT<JSX.Element>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<JSX.Element>} layoutConfig
   * @returns {AnyT}
   */
  public buildRowView(props: {},
                      children: Array<UniversalLayoutBuilderChildrenT<JSX.Element>>,
                      layoutConfig: IUniversalLayoutBuilderConfigEntity<JSX.Element>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      columns: children,
    };
  }

  /**
   * @stable [23.01.2020]
   * @param {{}} props
   * @param {Array<UniversalLayoutBuilderChildrenT<JSX.Element>>} children
   * @param {IUniversalLayoutBuilderConfigEntity<JSX.Element>} layoutConfig
   * @returns {AnyT}
   */
  public buildColumnView(props: {},
                         children: Array<UniversalLayoutBuilderChildrenT<JSX.Element>>,
                         layoutConfig: IUniversalLayoutBuilderConfigEntity<JSX.Element>): AnyT {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      rows: children,
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
