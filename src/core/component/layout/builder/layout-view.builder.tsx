import * as React from 'react';

import { toClassName, isFn } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import {
  LayoutBuilderFactorEnum,
  LayoutBuilderElementT,
  ILayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class LayoutViewBuilder implements ILayoutViewBuilder {

  /**
   * @stable - 19.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  public buildRowView(props: IKeyValue,
                      children: JSX.Element[],
                      layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    return (
      <div className={toClassName(
             'rac-flex',
             'rac-flex-row',
             this.toFactorClassName(layoutConfig.factor)
           )}
           {...props}>
        {children}
      </div>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {JSX.Element}
   */
  public buildColumnView(props: IKeyValue,
                         children: JSX.Element[],
                         layoutConfig: ILayoutBuilderConfiguration): JSX.Element {
    return (
      <div className={toClassName(
              'rac-flex',
              'rac-flex-column',
              this.toFactorClassName(layoutConfig.factor)
           )}
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
      <div {...props} className='rac-flex-separator'/>
    );
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @returns {boolean}
   */
  public isReactElement(item: LayoutBuilderElementT): boolean {
    const itemEl = item as JSX.Element;
    return isFn(itemEl.type);
  }

  /**
   * @stable - 19.04.2018
   * @param {LayoutBuilderElementT} item
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @param {TProps} props
   * @returns {TProps}
   */
  public toClonedElementProps<TProps>(item: LayoutBuilderElementT,
                                      layoutConfig: ILayoutBuilderConfiguration,
                                      props: TProps): TProps {
    return props;
  }

  /**
   * @stable - 16.04.2018
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {string}
   */
  private toFactorClassName(factor: LayoutBuilderFactorEnum): string {
    switch (factor) {
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
