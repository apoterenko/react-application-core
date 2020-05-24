import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { GenericBaseComponent } from '../base/generic-base.component';
import { ILinkProps } from '../../definition';

/**
 * @component-impl
 * @stable [24.05.2020]
 */
export class Link extends GenericBaseComponent<ILinkProps> {

  /**
   * @stable [24.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <RouterLink {...this.props} />;
  }
}
