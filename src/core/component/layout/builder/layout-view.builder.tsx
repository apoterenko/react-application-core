import * as React from 'react';

import { toClassName } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import {
  LayoutBuilderFactorEnum,
  ILayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';
import { BaseLayoutViewBuilder } from './base-layout-view.builder';

export class LayoutViewBuilder extends BaseLayoutViewBuilder {

  /**
   * @stable [16.09.2018]
   * @param {IKeyValue} props
   * @param {React.ReactNode[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildRowView(props: IKeyValue,
                      children: React.ReactNode[],
                      layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return (
      <div className={toClassName(
                       'rac-flex',
                       'rac-flex-row',
                       'rac-layout-view-row',
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
   * @param {React.ReactNode[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildColumnView(props: IKeyValue,
                         children: React.ReactNode[],
                         layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
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
   * @returns {React.ReactNode}
   */
  public buildSeparatorView(props: IKeyValue): React.ReactNode {
    return (
      <div {...props} className='rac-flex-separator'/>
    );
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
