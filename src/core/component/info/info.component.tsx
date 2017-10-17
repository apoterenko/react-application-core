import * as React from 'react';

import { BaseComponent, IBaseComponentInternalProps } from '../../component/base';

export class Info extends BaseComponent<Info, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    return (
        <div className='app-center-layout app-full-layout'>
          {this.t(this.props.emptyMessage)}
        </div>
    );
  }
}
