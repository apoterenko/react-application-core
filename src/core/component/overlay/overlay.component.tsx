import * as React from 'react';
import * as R from 'ramda';
import * as ReactDOM from 'react-dom';

import { ENV } from '../../env';
import { BaseComponent } from '../base';
import { IOverlayProps } from './overlay.interface';
import { FlexLayout } from '../layout';
import { orDefault } from '../../util';
import { UNI_CODES } from '../../definitions.interface';

export class Overlay extends BaseComponent<Overlay, IOverlayProps> {

  /**
   * @stable [29.11.2018]
   * @returns {React.ReactPortal}
   */
  public render(): React.ReactPortal {
    const props = this.props;
    return ReactDOM.createPortal(
      <FlexLayout row={true}
                  justifyContentCenter={true}
                  alignItemsCenter={true}
                  className='rac-overlay rac-absolute-full'
                  onClick={props.onClick}>
        {
          orDefault<string, JSX.Element>(
            R.isNil(props.imgSrc),
            () => UNI_CODES.noBreakSpace,
            () => (
              <img src={props.imgSrc}/>
            )
          )
        }
      </FlexLayout>,
      ENV.documentBody
    );
  }
}
