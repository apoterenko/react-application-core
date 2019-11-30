import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base/base.component';
import { FlexLayout } from '../layout/flex';

export class Header extends BaseComponent {

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <FlexLayout full={false}
                  row={true}
                  justifyContentEnd={true}
                  alignItemsCenter={true}
                  className={toClassName('rac-header', props.className)}>
        {props.children}
      </FlexLayout>
    );
  }
}
