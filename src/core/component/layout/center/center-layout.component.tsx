import * as React from 'react';

import { BaseComponent, IBaseComponentInternalProps } from '../../../component/base';

export class CenterLayout extends BaseComponent<CenterLayout, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    return (
        <div className='rac-flex rac-flex-center rac-flex-full'>
          {this.props.children || this.t(this.props.emptyMessage)}
        </div>
    );
  }
}
