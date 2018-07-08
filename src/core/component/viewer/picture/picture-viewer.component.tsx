import * as React from 'react';

import { toClassName } from '../../../util';
import { Viewer } from '../viewer.component';
import { IPictureViewerProps, IPictureViewerState } from './picture-viewer.interface';

export class PictureViewer extends Viewer<PictureViewer, IPictureViewerProps, IPictureViewerState> {

  public static defaultProps: IPictureViewerProps = {
    defaultScr: 'media/no_picture.jpg',
    usePreview: true,
  };

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected getRenderAreaElement(): JSX.Element {
    const props = this.props;
    return (
      <img className={toClassName(props.src ? 'rac-picture' : 'rac-picture-empty', props.className)}
           style={props.style}
           src={props.src || props.defaultScr}/>
    );
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected gePreviewElement(): JSX.Element {
    const props = this.props;
    return (
      <PictureViewer src={props.src}
                     usePreview={false}/>
    );
  }
}
