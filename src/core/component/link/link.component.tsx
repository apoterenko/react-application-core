import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { BaseComponent } from '../../component/base';
import { ILinkProps } from './link.interface';

export class Link extends BaseComponent<Link, ILinkProps> {

  /**
   * @stable [11.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <RouterLink {...this.props} />;
  }
}
