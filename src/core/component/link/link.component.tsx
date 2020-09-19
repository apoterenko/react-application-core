import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { GenericComponent } from '../base/generic.component';
import { ILinkProps } from '../../definition';

/**
 * @component-impl
 * @stable [24.05.2020]
 */
export class Link extends GenericComponent<ILinkProps> {

  /**
   * @stable [24.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <RouterLink {...this.props} />;
  }
}
