import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { BaseComponent } from '../../component/base';

import { ILinkInternalProps } from './link.interface';

export class Link extends BaseComponent<Link, ILinkInternalProps, {}> {

  public render(): JSX.Element {
    return <RouterLink {...this.props} />;
  }
}
