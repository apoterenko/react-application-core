import * as React from 'react';
import { PureComponent } from 'react';

export class DateTimeWrapper extends PureComponent<{}, {}> {

  public render(): JSX.Element {
    return (
        <div className='app-column-layout'>
          <div>
            {this.props.children[0]}
          </div>
          <div className='separator'/>
          <div>
            {this.props.children[1]}
          </div>
        </div>
    );
  }
}
