import * as React from 'react';
import { View } from 'native-base';

import { isDef } from '../../../util';
import { IKeyValue, AnyT } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum } from '../../../configurations-definitions.interface';
import {
  IReactLayoutBuilderConfiguration,
  ReactLayoutBuilderChildrenT,
} from '../../../react-configurations-definitions.interface';
import { ReactBaseLayoutViewBuilder } from './react-base-layout-view.builder';

export class RnLayoutViewBuilder extends ReactBaseLayoutViewBuilder {

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {IReactLayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildRowView(props: IKeyValue,
                      children: ReactLayoutBuilderChildrenT[],
                      layoutConfig: IReactLayoutBuilderConfiguration): React.ReactNode {
    return (
      <View {...props}
            style={{
              flexDirection: 'row',
              flex: this.toFactorStyle(layoutConfig.factor),
              ...layoutConfig.style,
            }}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {IReactLayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildColumnView(props: IKeyValue,
                         children: ReactLayoutBuilderChildrenT[],
                         layoutConfig: IReactLayoutBuilderConfiguration): React.ReactNode {
    return (
      <View {...props}
            style={{
              flexDirection: 'column',
              flex: this.toFactorStyle(layoutConfig.factor),
              ...layoutConfig.style,
            }}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @returns {React.ReactNode}
   */
  public buildSeparatorView(props: IKeyValue): React.ReactNode {
    return (
      <View {...props} style={{ flex: .1 }}/>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {ReactLayoutBuilderChildrenT} item
   * @returns {boolean}
   */
  public isClonedItem(item: ReactLayoutBuilderChildrenT): boolean {
    const itemEl = item as { type: { displayName?: string }};
    return (itemEl.type && isDef(itemEl.type.displayName)) || super.isClonedItem(item);
  }

  /**
   * @stable - 20.04.2018
   * @param {ReactLayoutBuilderChildrenT} item
   * @param {IReactLayoutBuilderConfiguration} layoutConfig
   * @param {{style?: IKeyValue}} props
   * @returns {AnyT}
   */
  public getClonedItemProps(item: ReactLayoutBuilderChildrenT,
                            layoutConfig: IReactLayoutBuilderConfiguration,
                            props: IKeyValue): IKeyValue {
    const itemEl = item as JSX.Element;
    return {
      ...props,
      style: layoutConfig.full === false
        ? itemEl.props.style
        : {flex: 1, ...itemEl.props.style},
    };
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {number}
   */
  private toFactorStyle(factor: LayoutBuilderFactorEnum): number {
    switch (factor) {
      case LayoutBuilderFactorEnum.FACTOR_2:
        return 2;
      case LayoutBuilderFactorEnum.FACTOR_4:
        return 4;
      case LayoutBuilderFactorEnum.FACTOR_8:
        return 8;
      default:
        return 1;
    }
  }
}
