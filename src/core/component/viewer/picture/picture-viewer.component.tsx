import * as React from 'react';

import {
  DefaultEntities,
  IPictureViewerProps,
  ViewerClassesEnum,
} from '../../../definition';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { Viewer } from '../viewer.component';

export class PictureViewer extends Viewer<IPictureViewerProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IPictureViewerProps>({
    defaultScr: DefaultEntities.MEDIA_NO_PICTURE_URL,
    usePreview: false,
  }, Viewer);

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected getClassName(): string {
    return ClsUtils.joinClassName(
      super.getClassName(),
      ViewerClassesEnum.PICTURE_VIEWER
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected getContentElement(): JSX.Element {
    return (
      <img
        className={ViewerClassesEnum.VIEWER_CONTENT}
        src={this.actualSrc}
        style={{transform: `scale(${this.actualOrDefaultScale})`}}
        alt=''/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected getPreviewElement(): JSX.Element {
    return (
      <PictureViewer
        src={this.actualSrc}
        scale={this.actualOrDefaultPreviewScale}/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get previewForwardActionElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get previewBackActionElement(): JSX.Element {
    return null;
  }
}
