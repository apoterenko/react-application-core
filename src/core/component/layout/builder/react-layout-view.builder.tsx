import * as React from 'react';

import { toClassName } from '../../../util';
import {
  ReactLayoutBuilderChildrenT,
  ILayoutBuilderConfiguration,
} from '../../../react-configurations-definitions.interface';
import { ReactBaseLayoutViewBuilder } from './react-base-layout-view.builder';

export class ReactLayoutViewBuilder extends ReactBaseLayoutViewBuilder {

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {ReactLayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildRowView(props: React.HTMLAttributes<{}>,
                      children: ReactLayoutBuilderChildrenT[],
                      layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return (
      <div className={toClassName('rac-flex', 'rac-flex-row', this.toFactorClassName(layoutConfig))}
           {...props}>
        {children}
      </div>
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @param {ReactLayoutBuilderChildrenT[]} children
   * @param {ILayoutBuilderConfiguration} layoutConfig
   * @returns {React.ReactNode}
   */
  public buildColumnView(props: React.HTMLAttributes<{}>,
                         children: ReactLayoutBuilderChildrenT[],
                         layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return (
      <div className={toClassName('rac-flex', 'rac-flex-column', this.toFactorClassName(layoutConfig))}
           {...props}>
        {children}
      </div>
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {React.HTMLAttributes<{}>} props
   * @returns {React.ReactNode}
   */
  public buildSeparatorView(props: React.HTMLAttributes<{}>): React.ReactNode {
    return <div {...props} className='rac-flex-separator'/>;
  }
}
