import * as React from 'react';

import { toClassName } from '../../util';
import { ISubHeaderProps } from './header.interface';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';

export class Header extends BaseComponent<Header> {

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
