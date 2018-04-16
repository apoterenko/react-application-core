import * as React from 'react';
import { View } from 'react-native';

import { IKeyValue } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum } from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class RnLayoutViewBuilder implements ILayoutViewBuilder {

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  public buildRowView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return (
      <View style={{display: 'flex', flexDirection: 'row', flex: this.toFactorStyle(factor)}}
           {...props}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  public buildColumnView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: this.toFactorStyle(factor)}}
           {...props}>
        {children}
      </div>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @returns {JSX.Element}
   */
  public buildSeparatorView(props: IKeyValue): JSX.Element {
    return (
      <div {...props} style={{ flex: .1 }}/>
    );
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
