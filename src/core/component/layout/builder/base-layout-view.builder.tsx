import * as React from 'react';
import * as R from 'ramda';

import { isFn, isString } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import {
  LayoutBuilderElementT,
  ILayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export abstract class BaseLayoutViewBuilder implements ILayoutViewBuilder {

  /**
   * @stable [20.04.2018]
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @param {boolean} root
   * @returns {React.ReactNode}
   */
  public abstract buildRowView(props: IKeyValue,
                               children: React.ReactNode[],
                               layoutConfig: ILayoutBuilderConfiguration,
                               root: boolean): React.ReactNode;

  /**
   * @stable [20.04.2018]
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @param {boolean} root
   * @returns {React.ReactNode}
   */
  public abstract buildColumnView(props: IKeyValue,
                                  children: React.ReactNode[],
                                  layoutConfig: ILayoutBuilderConfiguration,
                                  root: boolean): React.ReactNode;

  /**
   * @stable - 20.04.2018
   * @param {IKeyValue} props
   * @returns {React.ReactNode}
   */
  public abstract buildSeparatorView(props: IKeyValue): React.ReactNode;

  /**
   * @stable [23.06.2018]
   * @param {LayoutBuilderElementT} item
   * @returns {boolean}
   */
  public isReactElement(item: LayoutBuilderElementT): boolean {
    const itemEl = item as JSX.Element;
    const type = itemEl.type;
    return isFn(type)
      || (isString(type) && !R.isEmpty(type));  // type = {'div', 'span', ...}
  }

  /**
   * @stable - 20.04.2018
   * @param {LayoutBuilderElementT} item
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @param {IKeyValue} props
   * @returns {IKeyValue}
   */
  public toClonedElementProps(item: LayoutBuilderElementT,
                              layoutConfig: ILayoutBuilderConfiguration,
                              props: IKeyValue): IKeyValue {
    return props;
  }

  /**
   * @stable - 20.04.2018
   * @param {JSX.Element} item
   * @param {React.ClassAttributes<{}>} props
   * @returns {JSX.Element}
   */
  public cloneReactElement(item: JSX.Element, props: React.ClassAttributes<{}>): JSX.Element {
    return React.cloneElement<React.ClassAttributes<{}>>(item, props);
  }
}
