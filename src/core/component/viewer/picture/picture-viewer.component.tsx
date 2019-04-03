import * as React from 'react';

import { toClassName } from '../../../util';
import { Viewer } from '../viewer.component';
import { IPictureViewerProps, IPictureViewerState } from './picture-viewer.interface';

export class PictureViewer extends Viewer<IPictureViewerProps, IPictureViewerState> {

  public static defaultProps: IPictureViewerProps = {
    defaultScr: 'media/no_picture.jpg',
    usePreview: false,
  };

  /**
   * @stable [10.01.2019]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName(super.getClassName(), 'rac-picture-viewer');
  }

  /**
   * @stable [11.01.2019]
   * @returns {JSX.Element}
   */
  protected getContentElement(): JSX.Element {
    const props = this.props;
    return (
      <img
        className={toClassName('rac-viewer-content', !props.src && 'rac-viewer-empty-content')}
        src={props.src || props.defaultScr}/>
    );
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected gePreviewElement(): JSX.Element {
    return (
      <PictureViewer src={this.props.src}/>
    );
  }
}
