import * as React from 'react';

import { toClassName, isFn } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum, LayoutBuilderElementT } from '../../../configurations-definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';

export class LayoutViewBuilder implements ILayoutViewBuilder {

  /**
   * @stable - 16.04.2018
   * @param {IKeyValue} props
   * @param {JSX.Element[]} children
   * @param {LayoutBuilderFactorEnum} factor
   * @returns {JSX.Element}
   */
  public buildRowView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element {
    return (
      <div className={toClassName(
             'rac-flex',
             'rac-flex-row',
             this.toFactorClassName(factor)
           )}
           {...props}>
        {children}
      </div>
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
      <div className={toClassName(
              'rac-flex',
              'rac-flex-column',
              this.toFactorClassName(factor)
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
   * @param {TProps} props
   * @returns {TProps}
   */
  public toClonedElementProps<TProps>(item: LayoutBuilderElementT, props: TProps): TProps {
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
