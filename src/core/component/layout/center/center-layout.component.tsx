import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';

export class CenterLayout extends BaseComponent<CenterLayout> {

  public render(): JSX.Element {
    return (
        <div className={toClassName(
            'rac-flex rac-flex-center rac-flex-full',
            this.props.className,
        )}>
          {this.props.children}
        </div>
    );
  }
}
