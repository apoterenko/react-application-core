import * as React from 'react';
import { View } from 'react-native';

import { isDef, excludeKeyFieldFilter } from '../../../util';
import { IKeyValue, AnyT } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum, LayoutBuilderElementT } from '../../../configurations-definitions.interface';
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
      <View style={{display: 'flex', flexDirection: 'row', flex: this.toFactorStyle(factor)}}>
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
      <View style={{display: 'flex', flexDirection: 'column', flex: this.toFactorStyle(factor)}}>
        {children}
      </View>
    );
  }

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @returns {JSX.Element}
   */
  public buildSeparatorView(props: IKeyValue): JSX.Element {
    return (
      <View style={{ flex: .1 }}/>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {boolean}
   */
  public isReactElement(item: LayoutBuilderElementT): boolean {
    const itemEl = this.toReactElementType(item);
    return itemEl.type && isDef(itemEl.type.displayName);
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @param {TProps} props
   * @returns {TProps}
   */
  public toClonedElementProps(item: LayoutBuilderElementT, props: { style?: IKeyValue }): AnyT {
    const itemEl = this.toReactElementType(item);
    const props0  = {...props, style: { flex: 1, ...props.style }};
    return itemEl.type && itemEl.type.displayName === 'View'
      ? excludeKeyFieldFilter<{ style?: IKeyValue }, { style?: IKeyValue }>(props0)
      : props0;
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {{type: {displayName?: string}}}
   */
  private toReactElementType(item: LayoutBuilderElementT): { type: { displayName?: string } } {
    return item as { type: { displayName?: string } };
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
