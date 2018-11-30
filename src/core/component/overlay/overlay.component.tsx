import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseComponent } from '../base';
import { IOverlayProps } from './overlay.interface';

export class Overlay extends BaseComponent<Overlay, IOverlayProps> {

  /**
   * @stable [29.11.2018]
   * @returns {JSX.Element}
   */
  public render(): any {
    const props = this.props;
    return ReactDOM.createPortal(
      <div ref='self' className='rac-overlay rac-absolute-full'
           onClick={props.onClick}>
        &nbsp;
      </div>,
      document.body
    );
  }
}
