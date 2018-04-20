import * as React from 'react';
import { View } from 'react-native';

import { isDef } from '../../../util';
import { IKeyValue, AnyT } from '../../../definitions.interface';
import {
  LayoutBuilderFactorEnum,
  LayoutBuilderElementT,
  ILayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';
import { BaseLayoutViewBuilder } from './base-layout-view.builder';

export class RnLayoutViewBuilder extends BaseLayoutViewBuilder {

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildRowView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return (
      <View {...props}
            style={{
              display: 'flex',
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
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildColumnView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return (
      <View {...props}
            style={{
              display: 'flex',
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
   * @param {LayoutBuilderElementT} item
   * @returns {boolean}
   */
  public isReactElement(item: LayoutBuilderElementT): boolean {
    const itemEl = item as { type: { displayName?: string }};
    return (itemEl.type && isDef(itemEl.type.displayName)) || super.isReactElement(item);
  }

  /**
   * @stable - 20.04.2018
   * @param {LayoutBuilderElementT} item
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @param {{style?: IKeyValue}} props
   * @returns {AnyT}
   */
  public toClonedElementProps(item: LayoutBuilderElementT,
                              layoutConfig: ILayoutBuilderConfiguration,
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
