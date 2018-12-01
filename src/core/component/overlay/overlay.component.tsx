import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ENV } from '../../env';
import { BaseComponent } from '../base';
import { IOverlayProps } from './overlay.interface';

export class Overlay extends BaseComponent<Overlay, IOverlayProps> {

  /**
   * @stable [29.11.2018]
   * @returns {React.ReactPortal}
   */
  public render(): React.ReactPortal {
    const props = this.props;
    return ReactDOM.createPortal(
      <div ref={this.getSelfRef()}
           className='rac-overlay rac-absolute-full'
           onClick={props.onClick}>
        &nbsp;
      </div>,
      ENV.documentBody
    );
  }
}
