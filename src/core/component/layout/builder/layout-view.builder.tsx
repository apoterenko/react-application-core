import * as React from 'react';

import { joinClassName } from '../../../util';
import {
  ILayoutBuilderConfigEntity,
  LayoutBuilderChildrenNodeT,
  LayoutBuilderChildrenT,
  LayoutFactorsEnum,
} from '../../../definition';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export class LayoutViewBuilder
  extends UniversalLayoutViewBuilder<LayoutBuilderChildrenNodeT, React.DetailedHTMLProps<React.HTMLAttributes<{}>, {}>> {

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {LayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfigEntity} layoutConfig
   * @returns {LayoutBuilderChildrenNodeT}
   */
  public buildRowView(props: React.HTMLAttributes<{}>,
                      children: LayoutBuilderChildrenT[],
                      layoutConfig: ILayoutBuilderConfigEntity): LayoutBuilderChildrenNodeT {
    return (
      <div
        {...props}
        className={
          joinClassName(
            'rac-layout-builder-row-view',
            layoutConfig.className,
            this.asFactorClassName(layoutConfig),
          )}
      >
        {children}
      </div>
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {LayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfigEntity} layoutConfig
   * @returns {LayoutBuilderChildrenNodeT}
   */
  public buildColumnView(props: React.HTMLAttributes<{}>,
                         children: LayoutBuilderChildrenT[],
                         layoutConfig: ILayoutBuilderConfigEntity): LayoutBuilderChildrenNodeT {
    return (
      <div
        {...props}
        className={
          joinClassName(
            'rac-layout-builder-column-view',
            layoutConfig.className,
            this.asFactorClassName(layoutConfig),
          )}
      >
        {children}
      </div>
    );
  }

  /**
   * @stable [06.04.2020]
   * @param {React.ReactElement<React.Attributes>} item
   * @param {React.ClassAttributes<{}>} props
   * @returns {LayoutBuilderChildrenNodeT}
   */
  public cloneItem(item: React.ReactElement<React.Attributes>, props: React.ClassAttributes<{}>): LayoutBuilderChildrenNodeT {
    return React.cloneElement(item, props);
  }

  /**
   * @stable [23.01.2020]
   * @param {ILayoutBuilderConfigEntity} config
   * @returns {string}
   */
  private asFactorClassName(config: ILayoutBuilderConfigEntity): string {
    if (config.full === false) {
      return '';
    }
    switch (config.factor) {
      // TODO
      case LayoutFactorsEnum.FACTOR_0_25:
        return 'rac-layout-builder-stretch rac-layout-builder-1-4';
      case LayoutFactorsEnum.FACTOR_0_30:
        return 'rac-layout-builder-stretch rac-layout-builder-0-30';
      case LayoutFactorsEnum.FACTOR_0_5:
        return 'rac-layout-builder-stretch rac-layout-builder-1-2';
      case LayoutFactorsEnum.FACTOR_0_70:
        return 'rac-layout-builder-stretch rac-layout-builder-0-70';
      case LayoutFactorsEnum.FACTOR_0_75:
        return 'rac-layout-builder-stretch rac-layout-builder-3-4';
      case LayoutFactorsEnum.FACTOR_0_85:
        return 'rac-layout-builder-stretch rac-layout-builder-0-85';
      case LayoutFactorsEnum.FACTOR_2:
        return 'rac-layout-builder-stretch rac-layout-builder-x2';
      case LayoutFactorsEnum.FACTOR_4:
        return 'rac-layout-builder-stretch rac-layout-builder-x4';
      case LayoutFactorsEnum.FACTOR_8:
        return 'rac-layout-builder-stretch rac-layout-builder-x8';
      default:
        return 'rac-layout-builder-stretch rac-layout-builder-x1';
    }
  }
}
