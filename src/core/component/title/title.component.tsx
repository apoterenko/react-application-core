import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base';

export class Title extends BaseComponent<Title> {

  /**
   * @stable [03.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName('rac-title', props.className)}>
        {this.t(props.children as string)}
      </div>
    );
  }
}
