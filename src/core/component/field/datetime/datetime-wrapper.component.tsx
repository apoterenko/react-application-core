import * as React from 'react';
import { PureComponent } from 'react';

export class DateTimeWrapper extends PureComponent<{}, {}> {

  public render(): JSX.Element {
    return (
        <div className='rac-flex rac-flex-row'>
          <div className='rac-flex-full'>
            {this.props.children[0]}
          </div>
          <div className='rac-flex-separator'/>
          <div className='rac-flex-full'>
            {this.props.children[1]}
          </div>
        </div>
    );
  }
}
