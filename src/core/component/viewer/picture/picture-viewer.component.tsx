import * as React from 'react';

import { joinClassName } from '../../../util';
import { Viewer } from '../viewer.component';
import {
  IPictureViewerProps,
  ViewerClassesEnum,
} from '../../../definition';

export class PictureViewer extends Viewer<IPictureViewerProps> {

  public static defaultProps: IPictureViewerProps = {
    defaultScr: 'media/no_picture.jpg',
    usePreview: false,
  };

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected getPreviewExtraActionsElement(): JSX.Element {
    // You may implement this later..
    return null;
  }

  /**
   * @stable [18.03.2020]
   * @returns {string}
   */
  protected getClassName(): string {
    return joinClassName(super.getClassName(), ViewerClassesEnum.PICTURE_VIEWER);
  }

  /**
   * @stable [11.01.2019]
   * @returns {JSX.Element}
   */
  protected getContentElement(): JSX.Element {
    return (
      <img
        className={ViewerClassesEnum.VIEWER_CONTENT}
        src={this.actualSrc}/>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected gePreviewElement(): JSX.Element {
    return <PictureViewer src={this.actualSrc}/>;
  }
}
