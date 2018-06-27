import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { IPictureViewerProps } from './picture-viewer.interface';

export class PictureViewer extends BaseComponent<PictureViewer, IPictureViewerProps> {

  public static defaultProps: IPictureViewerProps = {
    defaultScr: 'media/no_picture.jpg',
  };

  /**
   * @stable [27.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <img className={toClassName(props.src ? 'rac-picture' : 'rac-picture-empty', props.className)}
           style={props.style}
           src={props.src || props.defaultScr}/>
    );
  }
}
